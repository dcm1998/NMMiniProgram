<!--
 * @Author: YinXuan
 * @Date: 2023-10-18 15:49:50
 * @LastEditTime: 2023-11-22 14:01:06
 * @Description: 包期管理
-->
<script>
export default {
  data() {
    return {
      //菜单信息
      menuList: [
        {
          id: 1,
          name: '全部美食',
          isMultiple: true, //是否多选
          showType: 1 //下拉框类型(1、2、3、4)
        },
        {
          id: 2,
          name: '附近',
          isMultiple: false, //是否多选
          showType: 2 //下拉框类型(1、2、3、4)
        },
        {
          id: 3,
          name: '智能排序',
          isMultiple: false, //是否多选
          showType: 3 //下拉框类型(1、2、3、4)
        },
        {
          id: 4,
          name: '筛选',
          isMultiple: true, //是否多选
          showType: 4 //下拉框类型(1、2、3、4)
        }
      ],
      //下拉框数据源
      dataObj: {
        //类型1数据结构
        itemList1: [
          {
            id: 1,
            name: '热门',
            childs: [
              {
                id: 1,
                name: '烤肉',
                chooseState: true //默认选中
              },
              {
                id: 2,
                name: '西北菜'
              },
              {
                id: 3,
                name: '川湘菜'
              }
            ]
          },
          {
            id: 2,
            name: '火锅',
            childs: [
              {
                id: 1,
                name: '全部火锅'
              },
              {
                id: 2,
                name: '川渝火锅'
              },
              {
                id: 3,
                name: '串串香'
              }
            ]
          }
        ],
        //类型2数据结构
        itemList2: [
          {
            id: 1,
            name: '商圈',
            childs: [
              {
                id: 1,
                name: '大润发'
              },
              {
                id: 2,
                name: '火车站'
              },
              {
                id: 3,
                name: '金牛街'
              }
            ]
          },
          {
            id: 2,
            name: '商场',
            childs: [
              {
                id: 1,
                name: '北京华联'
              },
              {
                id: 2,
                name: '国芳百货'
              },
              {
                id: 3,
                name: '欣大'
              }
            ]
          }
        ],
        //类型3数据结构
        itemList3: [
          {
            id: 1,
            name: '智能排序'
          },
          {
            id: 2,
            name: '距离优先'
          },
          {
            id: 3,
            name: '好评优先'
          },
          {
            id: 4,
            name: '销量优先'
          }
        ],
        //类型4数据结构
        itemList4: [
          {
            id: 1,
            name: '用餐人数',
            childs: [
              {
                id: 1,
                name: '单人餐'
              },
              {
                id: 2,
                name: '双人餐'
              },
              {
                id: 3,
                name: '3～4人餐'
              }
            ]
          },
          {
            id: 2,
            name: '餐厅品质',
            childs: [
              {
                id: 1,
                name: '高分餐厅'
              },
              {
                id: 2,
                name: '连锁餐厅'
              },
              {
                id: 3,
                name: '金冠好店'
              }
            ]
          }
        ]
      },
      curriculum: [
        {
          name: 'uniapp项目开发',
          content: 'uniapp小程序商城系统开发，实战项目...'
        },
        {
          name: '后台管理系统',
          content: 'vue+iview的后台管理系统建设系统开发...'
        },
        {
          name: 'App模板',
          content: '基于uniapp开发的效率类APP，开发至上线...'
        },
        {
          name: 'PC端官网开发',
          content: 'html/css/jQuery建设的PC端官方门户网站...'
        },
        {
          name: 'uniapp多端打包',
          content: 'uniapp开发完成上线的打包流程，上架商店等...'
        }
      ]
    }
  },
  methods: {
    //所选择的信息
    change(e) {
      console.log('当前点击的菜单:' + JSON.stringify(e.chooseMenu))
      console.log('所有选择的条件:' + JSON.stringify(e.chooseInfo))
    }
  },
  mounted() {}
}
</script>

<template>
  <view>
    <!-- <cu-custom bgColor="bg-gradual-blue" :isBack="true">
      <block slot="content">包期管理</block>
    </cu-custom> -->
    <liu-dropdown :menuList="menuList" :dataObj="dataObj" @change="change"></liu-dropdown>
  </view>
</template>
<style lang="scss" scoped></style>
