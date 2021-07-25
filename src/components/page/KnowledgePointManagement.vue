<template>
  <div id="app">
    
    <div class="search_">
        <el-input class="search" v-model="input" style="width: 30% " placeholder="请输入内容"></el-input>
        <el-button class="search" type="primary" @click="search">搜索</el-button>
        <el-button style="float:right;" icon="el-icon-plus" type="primary" size="small" @click="rowadd()">增加</el-button>
    </div>
  <div id="div1" :style="sliderStyle1">
    <el-table
  :data="knowledgepointlist.slice((currentPage-1)*size,currentPage*size)"
  border
  style="width: 100%">
    
    <el-table-column
      prop="pointid"
      label="知识点id"
      width="200">
     
    </el-table-column>
    
    <el-table-column
      prop="pointname"
      label="知识点名字"
      width="636">
    </el-table-column>
    <el-table-column
        label="操作"
        
        align="center">
        <template slot-scope="scope">
            <el-button circle icon="el-icon-edit-outline" type="primary" title="编辑" size="small"
                       @click="rowEdit(scope.$index, scope.row)"></el-button>
            <el-button circle icon="el-icon-delete" type="danger" title="删除" size="small"
                       @click="rowDel(scope.$index, scope.row, $event);"></el-button>
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
      layout="total, sizes, prev, pager, next, jumper"
      :total="knowledgepointlist.length">
    </el-pagination>
  </div>
  </div>
  <div id="div2" :style="sliderStyle2">
    <el-table
  
  :data="searchlist.slice((currentPage-1)*size,currentPage*size)"
  border
  style="width: 100%">
    
    <el-table-column
      prop="pointid"
      label="知识点id"
      width="200">
     
    </el-table-column>
    
    <el-table-column
      prop="pointname"
      label="知识点名字"
      width="636">
    </el-table-column>
    <el-table-column
        label="操作"
        
        align="center">
        <template slot-scope="scope">
            <el-button circle icon="el-icon-edit-outline" type="primary" title="编辑" size="small"
                       @click="rowEdit(scope.$index, scope.row)"></el-button>
            <el-button circle icon="el-icon-delete" type="danger" title="删除" size="small"
                       @click="rowDel(scope.$index, scope.row, $event);"></el-button>
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
      layout="total, sizes, prev, pager, next, jumper"
      :total="searchlist.length">
    </el-pagination>
  </div>
  </div>
  </div>
</template>
<script>
import {getKeyPointList,newKeyPoint,updateKeyPoint,deleteKeyPoint} from '../../request/api';
export default {
  data() {
      return {
        searchlist:[],
        sliderStyle1:{display:''},
        sliderStyle2:{display:'none'},
        input:'',
        currentPage:1,
        size:5,
        knowledgepointlist:[],
        //编辑弹窗
      //isShowEditDialog: false,
      getdata(){
         getKeyPointList().then(data=>{
            this.knowledgepointlist=data.data;
            //console.log(data.data)
          })
      },
      }
    },
      methods: {
        /**
         * 搜索知识点
         */
        search() {
          let i=0;
          this.searchlist=[];
          this.knowledgepointlist.forEach(element => {
              if(element.pointname.match(this.input)!=null){
                 this.searchlist[i]=element;
                  i++;   
              }
              if(this.searchlist.length>0){
                  this.sliderStyle1.display="none";
                  this.sliderStyle2.display="";
              }
            });
            
            if(this.searchlist.length<=0){
                this.$message({
                type: 'warning',
                message: '未找到！'
              });
            }
        },
        /**
         * 增加知识点
         */
        rowadd(){
          this.$prompt('请输入知识点名字：', '新增知识点', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
            }).then(({value}) => {

              this.$message({
                type: 'success',
                message: '新增知识点成功'
              });
              newKeyPoint({pointname:value}).then(data=>{
                console.log(data);
              });
              getKeyPointList().then(data=>{
                this.knowledgepointlist=data.data;
                //console.log(data.data)
              });
            }).catch(() => {

              this.$message({
                type: 'info',
                message: '取消新增知识点'
              });
            });
          
        },
        /**
         * 修改知识点（修改名字）
         */
        rowEdit(index, row) {   
            //console.log(index);
            //console.log(row);
            this.$prompt(
                '请修改知识点名字：', 
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValue: '',
                    inputErrorMessage: '输入不能为空',
                    inputValidator: (value) => {       // 点击按钮时，对文本框里面的值进行验证
                        if(!value) {
                            return '输入不能为空';
                        }
                    },
                }).then(({value}) => {
                    //console.log(value);
                    console.log(row.pointid);
                    row.pointname=value;
                    updateKeyPoint({pointid:row.pointid,pointname:value}).then(data=>{
                      //console.log(pointid);
                      console.log(data.data);
                    });
                     this.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                    // TO DO DO ...
                }).catch((err) => {
                    this.$message({
                      type: 'info',
                      message: '取消修改'
                    });
                    console.log(err);
                });
        },
        /**
         * 删除知识点
         */
        rowDel(index, row, event) {
            console.log(row);
            // 让当前删除按钮失焦
            event.target.blur();

            this.$confirm('确定要删除当前行吗？', '删除', {
                comfirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                deleteKeyPoint({pointid:row.pointid}).then(data=>{
                  console.log(data);
                });
                getKeyPointList().then(data=>{
                this.knowledgepointlist=data.data;
                //console.log(data.data)
              });
                this.$message.success('删除成功');
                return false;
            }).catch((err) => {
                    this.$message({
                      type: 'info',
                      message: '取消删除'
                    });
                    console.log(err);
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
    },
     mounted:function () {   //自动触发写入的函数
        this.getdata();
    },
}
</script>
<style lang="less" scoped>
 
    .el-table__body tr.current-row>td{
 	background-color: #ebf0f1 !important;
  	color: #000000;
  	font-weight: 700;
}
</style>