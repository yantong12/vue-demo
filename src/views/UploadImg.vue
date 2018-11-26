<template>
  <div class="box-container">
    <div class="backgroundImgUploadDiv" id="docPic" v-if="!doctor_picture">
      拖拽上传
    </div>
    <div class="pic-div" v-else>
      <img :src="doctor_picture" alt="">
      <span><em @click="delpic('doctor_picture')">删除</em></span>
    </div>
    <div class="backgroundImgUploadDiv" id="docPic" v-if="!picture_a">
      点击上传
      <input @change="clickPic($event,'picture_a')" type="file" />
    </div>
    <div class="pic-div" v-else>
      <img :src="picture_a" alt="">
      <span><em @click="delpic('picture_a')">删除</em></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadImg',
  data() {
    return {
      doctor_picture: '',
      picture_a: ''
    }
  },
  mounted () {
    document.ondragover = function (e) {
      e.preventDefault()
    }
    document.ondrop = function (e) {
      e.preventDefault()
    }
    this.drag('docPic', 'doctor_picture')
  },
  methods: {
    // 拖拽
    drag (id, pic) {
      let that = this
      let container = document.getElementById(id)
      container.ondragover = function (e) {
        e.preventDefault()
      }
      container.ondrop = function (e) {
        let list = e.dataTransfer.files
        if (list.length !== 1) {
          that.$message.error('请选择一张图片')
          return
        }
        that.changePic(list[0], pic)
      }
    },
    clickPic (e, pic) {
      console.log(e)
      let file = e.target.files[0]
      this.changePic(file, pic)
    },
    delpic (pic) {
      this[pic] = ''
    },
    changePic (file, pic) { // 图片
      let that = this
      var reader = new FileReader()
      // 通过文件流将文件转换成Base64字符串
      reader.readAsDataURL(file)
      // 转换成功后
      reader.onloadend = function () {
        // eslint-disable-next-line spaced-comment
        //将转换结果赋值给img标签
        that[pic] = reader.result
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .box-container {
    .pic-div{
      width: 146px;
      height: 146px;
      position: relative;
      img{
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
      span{
        position: absolute;
        width: 100%;
        transition: all .3s;
        top: 0;
        left: 0;
        opacity: 0;
        text-align: center;
        line-height: 146px;
        color: #fff;
        em {
          cursor: pointer;
        }
      }
      &:hover span{
        background: rgba(0, 0, 0, .2);
        opacity: .8;
      }
    }
    .backgroundImgUploadDiv{
      border: 1px #D8D8D8 solid;
      width: 146px;
      height: 146px;
      position: relative;
      background-color: #FFFFFF;
      text-align: center;
      font-size: 14px;
      line-height: 170px;
      color: #b3b0b0;
      overflow: hidden;
      &>input{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
        opacity: 0;
      }
      &::before{
        content: "";
        width: 3px;
        height: 35px;
        position: absolute;
        left: 0px;
        right: 0px;
        top: -15px;
        bottom: 0px;
        margin: auto;
          background-color: #D8D8D8;
        z-index: 1;
        cursor: pointer;
        pointer-events: none;
      }
      &::after{
        content: "";
        width: 35px;
        height: 3px;
        position: absolute;
        left: 0px;
        right: 0px;
        top: -15px;
        bottom: 0px;
        margin: auto;
        background-color: #D8D8D8;
        z-index: 1;
        cursor: pointer;
        pointer-events: none;
      }
    } 
  }
  
</style>
