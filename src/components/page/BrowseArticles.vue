<template>
<div class="article_main">
    <div class="rich_media_area_primary">
       
        <strong>读完此文章大概需要{{Math.ceil(needtime/1000)}}秒</strong>
         <br>
        <br>
        <div class="rich_media_wrp">
            <h1>{{title}}</h1>
            <br>
            <strong>{{keyword}}</strong>
            <br>
            <br>
            <div class="rich_media_content">
            <div class="txt_box" v-html="data"></div>
            
            
            </div>
        </div>
        <el-button type="primary" @click="signOut">退出页面</el-button>
    </div>
</div>    
</template>

<script>
//import testImportJson from '../static/json/test.json'
import '@/assets/css/article/article.css'
import {addArticleCountOnce,newReadLog} from '../../request/api';
export default {
    
     data() {
      return {
        title:'',
        data:'',
        keyword:'小程序开发基础',
        startTime:'',  //进入页面时间
        nowtime:'', //现在时间
        needtime:'',  //每篇文章所需平均阅读时长
        overTimer: null,
        time:'',//阅读时长
        isOvertime: false, // 是否超时
        isfinish:1,
        getLength(){//统计每篇文章所需平均阅读时长
            let alllength=0;
            
            alllength=this.title.length+this.data.length+this.keyword.length;
            console.log('alllength'+alllength)
            this.needtime=alllength/700*60*1000;
           // console.log('需要:'+this.needtime)
        },
        getstartTime(){
            this.startTime=new Date().getTime();
            console.log(this.startTime);
        },
        created () {
            //console.log('123')
            // 开启定时器
            this.overTimer = setTimeout(() => {
            this.isOvertime = true;
            }, this.needtime)
        },
        destroyed () {
            // 销毁定时器
            clearTimeout(this.overTimer)
        },
        getdata(){
            //console.log(this.$store.getters.artcleInfo.title);
            this.title=this.$store.getters.artcleInfo.title;
            this.data=this.$store.getters.artcleInfo.content;
            this.keyword=this.$store.getters.artcleInfo.keyword;
        },
        
      }
      
    },
    
    methods:{
        
        signOut(){              //退出
            this.$router.push({
                path: "/case-management",
            }); 
        }
    },
    mounted:function () {   //自动触发写入的函数
        this.getdata();
        this.getLength();
        this.getstartTime();
        this.created();
    },
    destroyed: function () {
        this.destroyed ();
    },
}
</script>
<style lang="less" scoped>
.article_main{
    height: 100%;
    width: 100%;
}
.rich_media_area_primary {
    position: absolute;
    top: 40%;
    left:40%;
    width: 50%;
    
    padding: 20px 35px;
    border: 1px solid rgb(153, 149, 149);
    margin: -185px 0 0 -160px;
    &::before, &::after {
      position: absolute;
      height: 12px;
      content: "";
    }
    &::before {
      left: 4px;
      right: 4px;
      top: -12px;
      z-index: 2;
      background-color: #dfdbdb;
    }
    &::after {
      left: 10px;
      right: 10px;
      top: -22px;
      z-index: 1;
      background-color: #f0f0f0;
    }
}
.rich_media_content {
 overflow:hidden;
 color:#333;
 font-size:17px;
 word-wrap:break-word;
 -webkit-hyphens:auto;
 -ms-hyphens:auto;
 hyphens:auto;
 text-align:justify;
 position:relative;
 z-index:0;
 line-height:40px;
 
}
p {
    text-indent:2em;
    margin: 1.5em 5px !important;
    line-height: 1.8em;
    letter-spacing: 2px;
    padding: 0em 0.1em;
    font-size: 16px;
    font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
    color: rgb(34, 31, 31);
}
.rich_media_wrp {
 zoom:120%
}
</style>