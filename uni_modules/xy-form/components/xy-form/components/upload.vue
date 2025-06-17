<template>
  <view>
    <view class="form-item">
      <view v-if="!disabled">
        <u-upload
          :fileList="list"
          @afterRead="afterRead"
          @delete="deletePic"
          multiple
          :disabled="disabled"
          :maxCount="limit"
          :previewFullImage="true"
        ></u-upload>
      </view>
      <view v-else class="img-list flex align-center justify-start" v-for="(item, index) in list" :key="index">
        <image :src="item.url" style="width: 160rpx;height: 160rpx;margin-right: 10rpx" @click="picload"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "form-upload",
  props: {
    bizType: {
      type: String,
      default: "activity_photo"
    },
    value: {
      type: String,
      default: null
    },
    title: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: ""
    },
    unlined: {
      type: Boolean,
      default: true
    },
    preview: {
      type: Boolean,
      default: true
    },
	required: {
	  type: Boolean,
	  default: false
	},
    limit: {
      type: Number,
      default: 5
    }
  },
  watch: {
    value() {
      this.list = this.render(this.value);
      console.log(this.list)
    }
  },
  data() {
    return {
      list: this.render(this.value)
    }
  },
  methods: {
    picload() {
      let imgList = []
      this.list.map((item) => {
        imgList.push(item.url)
      })
      uni.previewImage({
        urls: imgList,
        longPressActions: {
          // itemList: ['发送给朋友', '保存图片', '收藏'],
          success: function(data) {
            //console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
          },
          fail: function(err) {
            console.log(err.errMsg);
          }
        }
      });
    },
    deletePic: function (event) {
      this.list.splice(event.index, 1)
    },
    transform(list) {
      return list
        .map(item => {
          return `${item.id}&~&${item.name}`;
        })
        .join(",");
    },
    async afterRead(event) {
      let lists = [].concat(event.file)
      let fileListLen = this.list.length
      lists.map((item) => {
        this.list.push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url);
        if(!result){
          this.list.splice(lists.length-1,1)
          return;
        }
        this.$emit("on-success", result)
        let item = this.list[fileListLen]
        this.list.splice(fileListLen, 1, Object.assign(item, {
          status: 'success',
          message: '',
          url: result,
          id: result.id
        }))
        fileListLen++
      }
      this.$emit("change", this.transform(this.list));
    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url:  '/api/file-url/attachment/upload',
          filePath: url,
          name: 'file',
          formData: {
            bizType: this.bizType
          },
          success: (res) => {
            let datas = JSON.parse(res.data)
            setTimeout(() => {
              resolve(datas.data)
            }, 1000)
          }
        })
      })
    },
    getUrl(data) {
      if (["png", "jpg", "jpeg", "gif"].indexOf(data.ext) > -1) {
        let urls = `/api/file-url/attachment/${data.id}.jpg`
        return urls
      }
    },
    onDownload(file) {
      getDownload([file.id]).then(data => {
        const downloadUrl = window.URL.createObjectURL(data);
        const anchor = document.createElement("a");
        anchor.href = downloadUrl;
        anchor.download = file.name;
        anchor.click();
        window.URL.revokeObjectURL(data);
      })
    },
    render(v) {
      if (v) {
        const ll = v.split(",").filter(r => !!r);
        return ll
          .filter(l => !!l && l.indexOf("&~&") > -1)
          .map(item => {
            const t = item.split("&~&");
            const r = t[1].split(".");
            const ext = r[r.length - 1];
            return {
              id: t[0],
              name: t[1],
              url: this.getUrl({ ext, id: t[0], name: t[1] })
            };
          });
      } else {
        return [];
      }
    }
  }
}
</script>

<style>
/deep/ .u-upload__button--disabled {
  display: none;
}
</style>
