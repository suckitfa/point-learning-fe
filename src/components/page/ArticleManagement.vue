<template>
<div class=articlemanagement>
    <div class="search_">
        <el-input class="search" v-model="input" style="width: 30% " placeholder="请输入内容"></el-input>
        <el-button class="search" type="primary" @click="search">搜索</el-button>
    </div>
    <div id="div1" :style="sliderStyle1">
    <el-table
    @row-click="intoarticle"
    :data="articlist.slice((currentPage-1)*size,currentPage*size)"
    border
    style="width: 100%">
    
    <el-table-column
      prop="title"
      label="标题"
      width="746">
     
    </el-table-column>
    
    <el-table-column
      prop="keyword"
      label="关键字"
      width="700">
    </el-table-column>
  </el-table>
  <div class="block" style="margin-left:30%">
    <!-- <span class="demonstration">完整功能</span> -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="size"
      :pager-count=5
      layout="total, sizes, prev, pager, next, jumper"
      :total="articlist.length">
    </el-pagination>
  </div>
  </div>

   <div id="div2" :style="sliderStyle2" >
    <el-table
    @row-click="intoarticle"
    :data="searchlist.slice((currentPage-1)*size,currentPage*size)"
    border
    style="width: 100%">
    
    <el-table-column
      prop="title"
      label="标题"
      width="746">
     
    </el-table-column>
    
    <el-table-column
      prop="keyword"
      label="关键字"
      width="700">
    </el-table-column>
  </el-table>
  <div class="block" style="margin-left:30%">
    <!-- <span class="demonstration">完整功能</span> -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="size"
      :pager-count=5
      layout="total, sizes, prev, pager, next, jumper"
      :total="searchlist.length">
    </el-pagination>
  </div>
  </div>
</div>    
</template>
<script>
import {getArticleList} from '../../request/api';
export default {
    data() {
        return {
            input: '',
            currentPage:1,
            size:10,
            articlist:[],
            list:[],
            searchlist:[
                {
                    title:'',
                    keyword:'',
                    data:'',
                }
                ],
            sliderStyle1:{display:''},
            sliderStyle2:{display:'none'},
            getdata(){
              getArticleList().then(data=>{
                this.list=data.data;
                let j=0;
                this.articlist=[];
                this.list.forEach(element =>{
                  if(element.status==1){
                    this.articlist[j]=element;
                    j++;
                  }
                })
                //console.log(this.articlist)
              })
              
              
            }
        }
    },
    methods:{
        search() {
          console.log(this.$store.getters.userInfo)
            let i=0;
            this.searchlist=[];
           this.articlist.forEach(element => {
                if(element.title.match(this.input)!=null||element.keyword.match(this.input)!=null){
                   this.searchlist[i]=element;
                    i++;
                    
                }
                if(this.searchlist.length>0){
                    this.sliderStyle1.display="none";
                    this.sliderStyle2.display="";
                }
                
            });
            //if(this.input==this)
            //this.$router.push({
            ///path: "/article-search"
            //});
        },
        handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.size = val
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val
      },
    intoarticle(row){
        //console.log(row);
        this.$store.commit('setArtcle',row);
        this.$router.push({
            path: "/article",
        });     
    },
    },
     mounted:function () {   //自动触发写入的函数
        this.getdata();
    },
    
}
</script>
<style lang="less" scoped>
.articlemanagement{
    width: 100%;
    height: 100%;
}
.search_{
    display:block;
    margin-left:auto;
    margin-right:auto;
}
</style>