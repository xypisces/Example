import { message } from 'antd';

export function initData(type, fields, idNum) {
  if(type == 1){
    fields.push({
      type: 1,
      id: idNum + 1,
      status: 0,
      is_require: 1,
      title: "这是一道单选题",
      placeholder: '请输入填写提示',
      is_look: 1,
      type_extends:[{
        option_name: '选项一',
        is_fill: 0,
        fill_require: 0,
        jump: 0,
      },{
        option_name: '选项二',
        is_fill: 0,
        fill_require: 0,
        jump: 0,
      }]
    })
  }else if (type == 2 ){
    fields.push({
      type: 2,
      id: idNum + 1,
      status: 0,
      is_require: 1,
      title: "这是一道多选题",
      placeholder: '请输入填写提示',
      is_look: 0,
      max_option_num: 0,
      min_option_num: 0,
      type_extends:[{
        option_name: '选项一',
        is_fill: 0,
        fill_require: 0,
      },{
        option_name: '选项二',
        is_fill: 0,
        fill_require: 0,
      }]
    })
  }else if (type == 3){
    fields.push({
      type: 3,
      id: idNum + 1,
      is_require: 1,
      title: '这是一道填空题',
      placeholder: '请输入填写提示',
    })
  }else if (type == 4){
    fields.push({
      type: 4,
      id: idNum + 1,
      is_require: 1,
      title: '这是一道排序题',
      placeholder: '请输入填写提示',
      type_extends: [{
        option_name: '排序1'
      },{
        option_name: '排序2'
      }]
    })
  }else if(type == 5){
    fields.push({
      type: 5,
      id: idNum + 1,
      status: 0,
      is_require: 1,
      title: "这是一道图片单选题(需要上传图片)",
      placeholder: '请输入填写提示',
      is_look: 1,
      type_extends:[]
    })
  }else if (type == 6){
    fields.push({
      type: 6,
      id: idNum + 1,
      content: '富文本内容'
    })
  }else if(type == 7){
    fields.push({
      type: 7,
      id: idNum + 1,
      status: 0,
      is_require: 1,
      title: "这是一道图片多选题(需要上传图片)",
      placeholder: '请输入填写提示',
      max_option_num: 2,
      min_option_num: 1,
      is_look: 1,
      type_extends:[]
    })
  }
  return fields
}

export function testData(type, fields, idNum) {
  if(type == 1){
    fields.push({
      type: 1,
      id: idNum + 1,
      status: 0,
      ratio: 0,
      is_require: 1,
      title: "这是一道单选题",
      placeholder: '请输入填写提示',
      is_look: 1,
      type_extends:[{
        option_name: '选项一',
        is_fill: 0,
        fill_require: 0,
        option_ratio: 0,
      },{
        option_name: '选项二',
        is_fill: 0,
        fill_require: 0,
        option_ratio: 0,
      }]
    })
  }else if (type == 2 ){
    fields.push({
      type: 2,
      id: idNum + 1,
      status: 0,
      ratio: 0,
      is_require: 1,
      title: "这是第一道多选题",
      placeholder: '请输入填写提示',
      is_look: 0,
      max_option_num: 0,
      min_option_num: 0,
      type_extends:[{
        option_name: '选项一',
        is_fill: 0,
        fill_require: 0,
        option_ratio: 0,
      },{
        option_name: '选项二',
        is_fill: 0,
        fill_require: 0,
        option_ratio: 0,
      }]
    })
  }else if (type == 3){
    fields.push({
      type: 3,
      id: idNum + 1,
      ratio: 0,
      is_require: 1,
      title: '这是一道填空题',
      placeholder: '请输入填写提示',
    })
  }else if (type == 6){
    fields.push({
      type: 6,
      id: idNum + 1,
      content: '富文本内容'
    })
  }
  return fields
}


export function voteData(type, fields, idNum) {
  if(type == 1){
    fields.push({
      type: 1,
      id: idNum + 1,
      status: 0,
      is_require: 1,
      title: "这是一道单选题",
      placeholder: '请输入填写提示',
      is_look: 1,
      type_extends:[{
        option_name: '选项一',
      },{
        option_name: '选项二',
      }]
    })
  }else if (type == 2 ){
    fields.push({
      type: 2,
      id: idNum + 1,
      status: 0,
      is_require: 1,
      title: "这是一道多选题",
      placeholder: '请输入填写提示',
      is_look: 0,
      max_option_num: 0,
      min_option_num: 0,
      type_extends:[{
        option_name: '选项一',
      },{
        option_name: '选项二',
      }]
    })
  }else if(type == 5){
    fields.push({
      type: 5,
      id: idNum + 1,
      status: 0,
      is_require: 1,
      title: "这是一道图片单选题(需要上传图片)",
      placeholder: '请输入填写提示',
      is_look: 1,
      type_extends:[]
    })
  }else if (type == 6){
    fields.push({
      type: 6,
      id: idNum + 1,
      content: '富文本内容'
    })
  }else if(type == 7){
    fields.push({
      type: 7,
      id: idNum + 1,
      status: 0,
      is_require: 1,
      title: "这是一道图片多选题(需要上传图片)",
      placeholder: '请输入填写提示',
      max_option_num: 2,
      min_option_num: 1,
      is_look: 1,
      type_extends:[]
    })
  }
  return fields
}