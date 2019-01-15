<!--  -->
<template>
  <div id="hotrengion">
    <div class="container">
      <div class="left-phone">
        <!-- <div class="page-img-box">
          <img src="./page.png" alt="">
        </div> -->
        <div class="page-img-box" >
           <canvas id="canvas" @mousedown="canvasClick($event)" @mousemove="dragRect($event)" @mouseup="upmouse()">
            当前浏览器不支持canvas
            如果浏览器支持canvas，则canvas标签里的内容不会显示出来
          </canvas>
          <canvas id="cvs">
            当前浏览器不支持canvas
            如果浏览器支持canvas，则canvas标签里的内容不会显示出来
          </canvas>
        </div>
      </div>
      <ul class="right-box">
        <li v-for="(item, i) in hotDataList" :key="i">
          <img :src="item.img_url" alt="">
          <span class="del"><span @click="deleteRow(i,item)">删除</span></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { mapActions } from "vuex";

export default {
  data() {
    return {
        hotDataList: [],
        rects:[],
        rectIsSelected:false,
        widthStart:'',
        reactWidth:'',
        heightStart:'',
        reactHeight:'',
        canvas:'',
        context:'',
        canmove:false,
        cvs:'',
        ctx:'',
        imgSrc:""
      }
  },
  created() {},
  mounted () {
    let that = this
    this.canvas = document.getElementById("canvas");
    this.context = that.canvas.getContext('2d');
    this.cvs = document.getElementById("cvs");
    this.ctx = this.cvs.getContext('2d');
    let imgObj = new Image();
    imgObj.crossOrigin="*";
    //获取canvas元素
    //创建image对象
    imgObj.src = "https://tbbstatic.oss-cn-beijing.aliyuncs.com/cutImg.png";
    //待图片加载完后，将其显示在canvas上
    imgObj.onload = function(){
      let height = (300/imgObj.naturalWidth)*imgObj.naturalHeight
      that.canvas.width = 300;
      that.cvs.width = 300;
      that.canvas.height = height;
      that.cvs.height = height;
      // cvs = cvsgetContext('2d');
      that.ctx.drawImage(this, 0, 0,300,height);//this即是imgObj,保持图片的原始大小：470*480
      // ctx.drawImage(this, 0, 0,1024,768);//改变图片的大小到1024*768
    }
  },
  methods: {
    deleteRow(index, data) {//删除一行
    let that = this
      if(data.hotspot_id){
        this.delHot({hotspot_id:data.hotspot_id}).then((res)=>{
          that.hotDataList.splice(index,1)
          this.rects.splice(index,1)
          this.drawRect()
        })
      }else{
        this.hotDataList.splice(index,1)
        this.rects.splice(index,1)
        this.drawRect()
      }
    },
    drawRect(x,y,width,height) {
      // 清除画布，准备绘制
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for(var i=this.rects.length-1; i>=0; i--) {
        let rect = this.rects[i];
        this.context.fillStyle = 'rgba(89,187,196,0.5)'
        this.context.fillRect(rect.x,rect.y,rect.width,rect.height);
      }
      this.context.fillStyle = 'rgba(89,187,196,0.5)'
      this.context.fillRect(x,y,width,height);
    },
    toBase64(url,width,height){
      let tempcanvas = document.createElement("canvas")
      let tempctx = tempcanvas.getContext('2d')
      tempcanvas.width = width
      tempcanvas.height = height
      tempctx.putImageData(url,0,0)
      let dataURL = tempcanvas.toDataURL("image/png")
      return dataURL
    },
    upmouse(){
      this.canmove = false;
      let reactWidth = this.reactWidth;
      let reactHeight = this.reactHeight;
      let imgUrl=''
      if(reactWidth && reactHeight){
        let imgData=this.ctx.getImageData(this.widthStart,this.heightStart,reactWidth,reactHeight)
        let dataURL = this.toBase64(imgData,reactWidth,reactHeight)
        imgUrl = dataURL
          this.rects.push({
          x:this.widthStart,
          y:this.heightStart,
          width:reactWidth,
          height:reactHeight,
        })
        this.hotDataList.push({
          subject_type:'1',
          subject_id:'',
          img_url:dataURL,
          imgUrl:imgUrl,
          coordinate:`${this.widthStart},${this.heightStart},${reactWidth},${reactHeight}`
        })
      }
      this.reactWidth = 0
      this.reactHeight = 0
      console.log(this.hotDataList)
    },
    canvasClick(e) {
      // 取得画布上被单击的点
      this.widthStart = e.offsetX;
      this.heightStart = e.offsetY;
      this.canmove = true;
    },
    dragRect (e){
      if(this.canmove){
        this.reactWidth = e.offsetX - this.widthStart;
        this.reactHeight = e.offsetY - this.heightStart;
        this.drawRect(this.widthStart,this.heightStart,this.reactWidth,this.reactHeight)
      }
    }
  },
};
</script>
<style lscoped lang="scss">
#hotrengion{
  box-sizing: border-box;
  width: 100%;
  height: auto;
}
.container{
  margin-top: 20px;
  height: auto;
}
#tempcanvas{
  display: none;
}
.left-phone{
    width: 300px;
    height: 700px;
    box-shadow: 0 0 5px 5px #ccc;
    box-sizing: border-box;
    overflow: hidden;
    background-size: contain;
    float: left;
    .page-img-box{
      position: relative;
      height: 100%;
      overflow: auto;
      #cvs{
        padding: 0;
        margin: 0;
        position: absolute;
        top: 0;
        left:0;
      }
      #canvas{
        padding: 0;
        margin: 0;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
      }
      img{
        height: auto;
        width: 100%;
      }
    }
}
.right-box{
  width: calc(100% - 400px);
  float: right;
  li {
    list-style: none; 
    float: left;
    padding: 10px;
    position: relative;
    img {
      border: 1px solid #5cafaf;
      width: 150px;
      height: 150px;
      box-sizing: border-box;
    }
    .del {
      position: absolute;
      left: 10px;
      top: 10px;
      width: 150px;
      height: 150px;
      text-align: center;
      line-height: 150px;
      display: none;
      color: #fff;
      background: rgba(0, 0, 0, .2);
      span {
        cursor: pointer;
      }
    }
    &:hover .del {
      display: inline-block;
    }
  }
}
.img-hot{
  vertical-align: middle;
  margin-left: 15px;
}
</style>