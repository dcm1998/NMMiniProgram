
业务需要，自己简单封装了一个表单
## 兼容性

App + H5 


## 硬性要求（因为当时就没考虑那么多，后续优化）
- 需引入uview-ui
- 安装lb-picker
- 安装dayjs
- xe-utils
## 感谢
- lb-picker
- uview-ui
- evan-form
## 功能
- uview-ui
- 单选
- 多选
- 下拉框
- 日期
- textarea
- 输入框
- 开关
- slot
- dict-字典查询，模拟后台请求
- 上传


## 引入插件

单独引入，在需要使用的页面上 import 引入即可

```html
<template>
  <view>
    <xy-form :option="opition" ref="form"></xy-form>
  </view>
</template>

<script>
  import XyForm from '@/components/xy-form/index.vue'
  export default {
    components: {
      XyForm
    }
  }
</script>
```

## option 数据格式


```html
opition: {
    hideRequiredAsterisk: true,
    rules: {
        name: {
            type: 'string',
            required: true,
            message: '请填写姓名',
            trigger: ['blur']
        }
    },
    items: [
        {
            name: 'id',
            field: 'id',
            type: 'hidden'
        },
        {
            name: '名称',
            field: 'name'
        },
        {
            name: '邮箱',
            field: 'email',
            show: ({ form }) => {
                return form.status
            } 
        },
        {
            name: '日期',
            field: 'date',
            type: 'date',
            format: 'YYYY-MM-DD'
        },
        {
            name: '状态',
            field: 'status',
            type: 'swtich',
            default: false,
            handle: (e, item,form) => {
                console.log(e, item, form)
            }
        },
        {
            name: '复选框',
            field: 'checkbox',
            get: 'checkbox.key',
            set: 'checkbox.key',
            type: 'checkbox',
            default: ['苹果'],
            items: [
                {
                    name: '苹果',
                    disabled: false
                },
                {
                    name: '香蕉',
                    disabled: false
                },
                {
                    name: '橙子',
                    disabled: true
                }
            ]
        },
        {
            name: '单选框',
            field: 'radio',
            type: 'radio',
            items: [
                {
                    name: '苹果',
                    disabled: false
                },
                {
                    name: '香蕉',
                    disabled: false
                },
                {
                    name: '橙子',
                    disabled: true
                }
            ]
        },
        {
            name: '备注',
            field: 'memo',
            type: 'textarea',
            labelPostion: 'top'
        },
        {
            name: '下拉框',
            field: 'select',
            type: 'select',
            props: {
                label: 'text',
                value: 'id',
                children: 'child'
            },
            items: [
                {
                    text: '选项1',
                    id: '1'
                },
                {
                    text: '选项2',
                    id: '2'
                }
            ]
        },
        {
            name: '联动下拉框',
            field: 'multiSelector',
            type: 'multiSelector',
            items: [
                {
                  label: '选项1',
                  value: '1',
                  children: [
                    {
                      label: '选项11',
                      value: '11',
                      children: [
                        {
                          label: '选项111',
                          value: '111'
                        },
                        {
                          label: '选项112',
                          value: '112'
                        },
                        {
                          label: '选项113',
                          value: '113'
                        }
                      ]
                    },
                    {
                      label: '选项12',
                      value: '12',
                      children: [
                        {
                          label: '选项121',
                          value: '121'
                        },
                        {
                          label: '选项122',
                          value: '122'
                        },
                        {
                          label: '选项123',
                          value: '123'
                        }
                      ]
                    },
                    {
                      label: '选项13',
                      value: '13',
                      children: [
                        {
                          label: '选项131',
                          value: '131'
                        },
                        {
                          label: '选项132',
                          value: '132'
                        },
                        {
                          label: '选项133',
                          value: '133'
                        }
                      ]
                    }
                  ]
                },
                {
                  label: '选项2',
                  value: '2',
                  children: [
                    {
                      label: '选项21',
                      value: '21',
                      children: [
                        {
                          label: '选项211',
                          value: '211'
                        },
                        {
                          label: '选项212',
                          value: '212'
                        },
                        {
                          label: '选项213',
                          value: '213'
                        }
                      ]
                    },
                    {
                      label: '选项22',
                      value: '22',
                      children: [
                        {
                          label: '选项221',
                          value: '221'
                        },
                        {
                          label: '选项222',
                          value: '222'
                        },
                        {
                          label: '选项223',
                          value: '223'
                        }
                      ]
                    },
                    {
                      label: '选项23',
                      value: '23',
                      children: [
                        {
                          label: '选项231',
                          value: '231'
                        },
                        {
                          label: '选项232',
                          value: '232'
                        },
                        {
                          label: '选项233',
                          value: '233'
                        }
                      ]
                    }
                  ]
                },
                {
                  label: '选项3',
                  value: '3',
                  children: [
                    {
                      label: '选项31',
                      value: '31',
                      children: [
                        {
                          label: '选项311',
                          value: '311'
                        },
                        {
                          label: '选项312',
                          value: '312'
                        },
                        {
                          label: '选项313',
                          value: '313'
                        }
                      ]
                    },
                    {
                      label: '选项32',
                      value: '32',
                      children: [
                        {
                          label: '选项321',
                          value: '321'
                        },
                        {
                          label: '选项322',
                          value: '322'
                        },
                        {
                          label: '选项323',
                          value: '323'
                        }
                      ]
                    },
                    {
                      label: '选项33',
                      value: '33',
                      children: [
                        {
                          label: '选项331',
                          value: '331'
                        },
                        {
                          label: '选项332',
                          value: '332'
                        },
                        {
                          label: '选项333',
                          value: '333'
                        }
                      ]
                    }
                  ]
                }
            ]
        },
    ]
}
```


## 参数及事件

###items

| 参数       | 说明                  | 类型               | 可选值                                                                                                                        | 默认值               |
|:---------|:--------------------|:-----------------|:---------------------------------------------------------------------------------------------------------------------------|:------------------|
| name     | 表单名称                | String           | -                                                                                                                          | -                 |
| field    | 表单参数                | String           | -                                                                                                                          | -                 |
| set      | 传给后台的指定参数，默认获取field | String           | -                                                                                                                          | {org: {key: '1'}} |
| get      | 后台返回的指定参数，默认获取field | String           | -                                                                                                                          | {org: {key: '1'}} |
| type     | 表单类型                | String           | slot-插槽<br/>input-输入框<br/>select-下拉框<br/>textarea-文本域<br/>radio-单选<br/>checkbox-多选<br/>upload-上传<br/>dict-字典查询<br/>date-日期 | input             |
| disabled |                     | Boolean/funciton | -                                                                                                                          | -                 |
| readonly |                     | Boolean/function | -                                                                                                                          | -                 |
| show     | 可见                  | Boolean/function | -                                                                                                                          | -                 |
| format   | 日期格式/字典格式           | string           | 日期-YYYY-MM-DD<br/>字典-LOOPHOLE_GRADE                                                                                                      | 可看列子              |
| action   | 事件                  | function         | -                                                                                                                          | -                 |


### Events

| 事件名称       | 说明     | 回调参数                                                                                                                                                                                                                          |
|:-----------|:-------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| validate   | 表单提交   | Object                                                                                                                                                                                                                        |
| setForm    | 插入表单对象 | Object                                                                                                                                                                                                                        |
| updateForm | 更新表单   | Object                                                                                                                                                                                                                        |
| change     | 监听表单事件 | Object                                                                                                                                                                                                                        |
