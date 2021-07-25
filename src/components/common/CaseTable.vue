<template>
  <el-container>
    <!--    搜索添加-->
    <el-header>
      <div class="search_">
        <el-input class="search" v-model="input" style="width: 30% " placeholder="请输入内容"></el-input>
        <el-button class="search" type="primary" @click="search">搜索</el-button>
         <el-button icon="el-icon-plus" type="primary" size="small"  style="float:right;" @click="rowAdd">添加</el-button>
    </div>
     
    </el-header>

     <div id="div1" :style="sliderStyle1">
    <el-table
    
    :data="articlist.slice((currentPage-1)*size,currentPage*size)"
    border
    style="width: 100%">
    
    <el-table-column
      prop="title"
      label="标题"
      width="346">
     
    </el-table-column>
    
    <el-table-column
      prop="keyword"
      label="关键字"
      width="350">
    </el-table-column>
    <el-table-column
      prop="status"
      label="发表情况(1表示发表)"
      width="250">
    </el-table-column>
    <el-table-column
        label="操作"
        
        align="center">
        <template slot-scope="scope">
          <el-button circle icon="el-icon-view" type="primary" title="查看" size="small"
                       @click="intoarticle( scope.row)"></el-button>
            <el-button circle icon="el-icon-edit-outline" type="primary" title="编辑" size="small"
                       @click="rowEdit( scope.row)"></el-button>
            <el-button circle icon="el-icon-upload2" type="primary" title="发表" size="small"
                       @click="publish( scope.row)"></el-button>
            <el-button circle icon="el-icon-delete" type="danger" title="删除" size="small"
                       @click="rowDel(scope.row, $event);"></el-button>
          </template>
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
    :data="searchlist.slice((currentPage-1)*size,currentPage*size)"
    border
    style="width: 100%">
    
    <el-table-column
      prop="title"
      label="标题"
      width="346">
     
    </el-table-column>
    
    <el-table-column
      prop="keyword"
      label="关键字"
      width="350">
    </el-table-column>
    <el-table-column
      prop="status"
      label="发表情况(1表示发表)"
      width="250">
    </el-table-column>
    <el-table-column
        label="操作"
        
        align="center">
        <template slot-scope="scope">
          <el-button circle icon="el-icon-view" type="primary" title="查看" size="small"
                       @click="intoarticle( scope.row)"></el-button>
            <el-button circle icon="el-icon-edit-outline" type="primary" title="编辑" size="small"
                       @click="rowEdit(scope.row)"></el-button>
            <el-button circle icon="el-icon-upload2" type="primary" title="发表" size="small"
                       @click="publish( scope.row)"></el-button>
            <el-button circle icon="el-icon-delete" type="danger" title="删除" size="small"
                       @click="rowDel(scope.row, $event);"></el-button>
          </template>
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

  </el-container>
</template>

<script>
import {getArticleList,deleteArticle,publishArticle} from "../../request/api";

export default {
  name: "CaseTable",
  data() {
    return {
      input: '',
      currentPage:1,
      size:10,
      articlist:[],
      searchlist:[],
      sliderStyle1:{display:''},
      sliderStyle2:{display:'none'},
      getdata(){
          getArticleList().then(data=>{
              this.articlist=data.data;
              console.log(data)
          })
                
      }
    }
  },
  
  methods: {
    /**
     * 进入文章页面
     */
    intoarticle(row){
        //console.log(row);
        this.$store.commit('setArtcle',row);
        this.$router.push({
            path: "/browse_article",
        });     
    },

    rowEdit(row) {
      // console.log(index);
       console.log(row);
      
    },
    /**
     * 删除文章
     */
    rowDel(row, event) {
      // 让当前删除按钮失焦
      event.target.blur();

      this.$confirm('确定要删除当前行吗？', '删除', {
        comfirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        deleteArticle({articleid:row.articleid}).then(data=>{
          console.log(data);
        });
        getArticleList().then(data=>{
              this.articlist=data.data;
              console.log(data)
          })
        this.$message.success('删除成功');
        return false;
      }).catch((err) => {
                this.$message({
                  type: 'info',
                  message: '取消删除'
                });
          });
    },
    /**
     * 查询文章（根据文章标题和关键字，可以模糊查询）
     */
    search() {
            let i=0;
            this.searchlist=[];
            this.articlist.forEach(element => {
                if(element.title.match(this.input)!=null||element.keyword.match(this.input)!=null){
                   this.searchlist[i]=element;
                   // this.searchlist[i].keyword=element.keyword;
                    console.log(element)
                    //console.log(this.searchlist[i].title)
                    i++;
                    
                }
                if(this.searchlist.length>0){
                    this.sliderStyle1.display="none";
                    this.sliderStyle2.display="";
                }
                
            });
        },
        handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.size = val
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val
      },
    /**
     * 添加文章
     */
    rowAdd() {
      this.$router.push('case_add')
    },
    /**
     * 发表文章
     */
    publish(row){
      if(row.status==1){
        this.$message.info('该文章已发布');
      }else{
        publishArticle({articleid:row.articleid}).then(data=>{
          console.log(data);
        })
        getArticleList().then(data=>{
                this.articlist=data.data;
                console.log(data)
        })
        this.$message.success('发布成功');
      }
      
    },
  },
  mounted:function () {   //自动触发写入的函数
        this.getdata();
    },

}
</script>

<style scoped>

</style>
