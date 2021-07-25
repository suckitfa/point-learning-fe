<template>
  <div class=articlemanagement>
    <div class="search_"> <!--搜索添加和导入-->

      <el-input class="search" v-model="input" style="width: 30% " placeholder="请输入内容"></el-input>
      <el-button class="search" type="primary" @click="search">搜索</el-button>
      <el-button style="float:right;" icon="el-icon-plus" @click="rowAdd">添加</el-button>
      <el-upload
        style="float:right;"
        class="upload-demo"
        action=""
        :on-change="handleChange"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :show-file-list="false"
        :limit="1"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        :auto-upload="false">
        <el-tooltip class="item" effect="dark" content="只能上传 xlsx / xls 文件" placement="top-start">
          <el-button icon="el-icon-download">导入</el-button>
        </el-tooltip>

      </el-upload>
    </div>

    <div id="div1" :style="sliderStyle1">
      <el-table

        :data="userlist.slice((currentPage-1)*size,currentPage*size)"
        border
        style="width: 100%">

        <el-table-column
          property="userid"
          label="用户id"
          width="100">
        </el-table-column>

        <el-table-column
          property="username"
          label="用户名"
          width="180">
        </el-table-column>

        <el-table-column
          property="studentid"
          label="学号"
          width="180">
        </el-table-column>
        <el-table-column
          property="isadmin"
          label="权限"
          width="180">
        </el-table-column>
        <el-table-column
          property="status"
          label="用户状态"
          width="180">
        </el-table-column>

        <el-table-column
          label="操作"

          align="center">
          <template slot-scope="scope">
            <el-button circle icon="el-icon-document" type="primary" title="查看分数" size="small"
                       @click="checkscore(scope.$index, scope.row)"></el-button>
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
          :pager-count=5
          layout="total, sizes, prev, pager, next, jumper"
          :total="userlist.length">
        </el-pagination>
      </div>
    </div>

    <div id="div2" :style="sliderStyle2">
      <el-table
        :data="searchlist.slice((currentPage-1)*size,currentPage*size)"
        border
        style="width: 100%">

        <el-table-column
          property="userid"
          label="用户id"
          width="100">
        </el-table-column>

        <el-table-column
          property="username"
          label="用户名"
          width="180">
        </el-table-column>

        <el-table-column
          property="studentid"
          label="学号"
          width="180">
        </el-table-column>
        <el-table-column
          property="isadmin"
          label="权限"
          width="180">
        </el-table-column>
        <el-table-column
          property="status"
          label="用户状态"
          width="180">
        </el-table-column>

        <el-table-column
          label="操作"

          align="center">
          <template slot-scope="scope">
            <el-button circle icon="el-icon-document" type="primary" title="查看分数" size="small"
                       @click="checkscore(scope.$index, scope.row)"></el-button>
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
          :pager-count=5
          layout="total, sizes, prev, pager, next, jumper"
          :total="searchlist.length">
        </el-pagination>
      </div>
    </div>
    <!--添加-弹出框-->
    <el-dialog
      title="添加"
      :visible.sync="isShowAddDialog"
      width="500px">
      <el-form
        ref="addForm"
        :model="addstudents"
        label-width="80px"
        :rules="addRules">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="addstudents.username"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="studentid">
          <el-input v-model="addstudents.studentid"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="add_cancel()">取消</el-button>
          <el-button type="primary" @click="add_determine()" class="pull-right margin-l-25">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--编辑-弹出框-->
    <el-dialog
      title="编辑"
      :visible.sync="isShowEditDialog"
      width="500px">
      <el-form
        ref="editForm"
        :model="editstudents"
        label-width="80px"
        :rules="editRules">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="editstudents.username"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="studentid">
          <el-input v-model="editstudents.studentid"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editstudents.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="edit_cancel()" class="pull-left">取消</el-button>
          <el-button type="primary" @click="edit_determine()" class="pull-right margin-l-25">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--图表-弹出层-->
    <el-dialog
      title="分数详情"
      :visible.sync="isShowChartDialog"
      width="400px"
      @close="charDialogClose">
      <score-chart :score="look_score"></score-chart>
    </el-dialog>
  </div>
</template>
<script>
import {deleteUser, getUserList, newUser, updateUser, getScoreList} from '../../request/api';
import ScoreChart from "../common/ScoreChart";
export default {
  data() {
    return {
      isShowAddDialog: false,  //添加学生弹出框
      isShowEditDialog: false,//修改学生信息弹出框
      addstudents: {   //添加学生所需填写信息
        username: '',
        password: '12345678',//密码默认为12345678
        studentid: '',
      },
      editstudents: {     //修改学生信息
        userid: '',
        username: '',
        password: '',
        studentid: '',
        // isadmin:'',
        // status:'',
      },
      input: '',  //查询信息输入
      currentPage: 1,
      size: 10,
      userlist: [],
      searchlist: [],
      sliderStyle1: {display: ''},
      sliderStyle2: {display: 'none'},
      addRules: {
        username: [
          {required: true, message: '姓名不能为空', trigger: 'blur, change'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur, change'}
        ],
        studentid: [
          {required: true, message: '学号不能为空', trigger: 'blur, change'}
        ],

      },
      editRules: {
        username: [
          {required: true, message: '姓名不能为空', trigger: 'blur, change'}
        ],
        studentid: [
          {required: true, message: '学号不能为空', trigger: 'blur, change'}
        ],
      },
      getdata() {
        getUserList().then(data => {
          this.userlist = data.data;
          console.log(data)
        })

      },
      //查看分数
      look_score: null,
      //文件临时变量
      fileTemp: null,
      //文件解析变量
      fileData: [1,2],
      //所有分数
      allScore: [],
      //分数弹窗
      isShowChartDialog: false
    }
  },
  methods: {
    /**
     * 查询学生（按学号和姓名查询；也可通过输入班级查询全班学生）
     */
    search() {
      let i = 0;
      this.searchlist = [];
      this.userlist.forEach(element => {
        if (element.username.match(this.input) != null || element.studentid.match(this.input) != null) {
          this.searchlist[i] = element;
          // this.searchlist[i].keyword=element.keyword;
          console.log(element)
          //console.log(this.searchlist[i].title)
          i++;
        }
        if (this.searchlist.length > 0) {
          this.sliderStyle1.display = "none";
          this.sliderStyle2.display = "";
        }

      });
    },
    /**
     * 增加学生弹框
     */
    rowAdd() {
      this.isShowAddDialog = true;
    },
    /**
     * 确认添加学生
     */
    add_determine() {
      this.$refs.addForm.validate((validate) => {
        if (validate) {
          console.log(validate);
          console.log(this.addstudents);
          newUser(this.addstudents).then((data) => {
            console.log(data);
          });
          getUserList().then(data => {
            this.userlist = data.data
          })
          this.isShowAddDialog = false
          this.$message.success('添加成功')
        }
        else {
          return false;
        }
      })
    },
    /**
     * 取消添加学生
     */
    add_cancel() {
      this.$message.info('取消添加')
      this.isShowAddDialog = false;
    },
    /**
     * 查看分数
     */
    checkscore(index, row) {
      //根据row拿到该行的学生学号，然后进入数据库查询
      this.look_score = this.allScore.find(function (item){
        return item.userid === row.userid
      })
      if (this.look_score === undefined){
        // this.$message.warning('暂时没有分数数据')
        this.look_score = {
          partone: 80,
          parttwo: 70,
          partthree: 95,
        }
      }
      // else
        //打开弹窗
        this.isShowChartDialog = true
    },
    /**
     *修改学生信息弹出框
     */
    rowEdit(index, row) {
      //console.log(row.userid);
      this.editstudents.userid = row.userid;
      this.editstudents.username = row.username;
      this.editstudents.studentid = row.studentid;
      //this.editstudents.isadmin=row.isadmin;
      //this.editstudents.password=row.password;
      // this.editstudents.status=row.status;
      this.isShowEditDialog = true
    },
    /**
     * 取消编辑学生信息
     */
    edit_cancel() {
      this.$message.info('取消编辑')
      this.isShowEditDialog = false;
    },
    /**
     * 确认修改
     */
    edit_determine() {
      this.$refs.editForm.validate((validate) => {
        console.log(this.editstudents);
        console.log(validate);
        if (validate) {
          const {userid, studentid, password, username} = this.editstudents
          const updateData = {userid, studentid, password, username};
          console.log('上传数据 = ', updateData);
          updateUser(updateData).then(data => {
            console.log('修改成功')
            console.log(data);
          })
          getUserList().then(data => {
            this.userlist = data.data
          });
          this.isShowEditDialog = false
          this.$message.success('修改成功')
        }
        else {
          return false;
        }
      })

    },
    /**
     *删除学生
     */
    rowDel(index, row, event) {
      console.log(row);
      // 让当前删除按钮失焦
      event.target.blur();
      this.$confirm('确定要删除当前行吗？', '删除', {
        comfirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        deleteUser({userid: row.userid}).then(data => {
          console.log(data);
        });
        getUserList().then(data => {
          this.userlist = data.data;
          console.log(data)
        })
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
    handleChange(file, fileList) {
      //上传前清空文件
      this.fileTemp = null
      this.fileTemp = file.raw

      if (this.fileTemp) {
        if ((this.fileTemp.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (this.fileTemp.type === 'application/vnd.ms-excel')) {
          let _this = this
          // console.log(this.fileData)
          this.importExcel(file).then(tableData => {
            tableData.forEach((value,index) => {
              newUser(value).then(data => {

              })
            })
            _this.getdata()
            _this.$message.success('添加成功')
          })
          // console.log(this.fileData)
        }
        else {
          this.$message({
            type: 'warning',
            message: '附件格式错误，请删除后重新上传！'
          })
        }
      }
      else {
        this.$message({
          type: 'warning',
          message: '请上传附件！'
        })
      }
    },
    handleRemove(file, fileList) {
      this.fileTemp = null
    },
    handleSuccess(response,file,fileList) {
      console.log(this.fileData);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val
    },
    importExcel (file) {
      let _this = this;
      return new Promise(function (resolve, reject) {
        /*const types = file.name.split('.')[1]
        const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => item === types)
        if (!fileType) {
          _this.$message({
            type: "warning",
            message: "文件格式不正确，请重新选择!"
          });
          reject();
        }*/
        const reader = new FileReader();
        reader.onload = function (e) {
          const data = e.target.result;
          let XLSX = require('xlsx');
          this.wb = XLSX.read(data, {
            type: "binary"
          });
          const wsname = this.wb.SheetNames[0];
          const ws = this.wb.Sheets[wsname];
          /* Convert array of arrays */
          const sheetJson = XLSX.utils.sheet_to_json(ws);
          let tableData = []; //转换为真正的table所需要的数据
          this.da = [...sheetJson]
          this.da.map(v => {
            let obj = {}
            obj.username = v['姓名']
            obj.studentid = v['学号']
            tableData.push(obj)
          })

          resolve(tableData);
        };
        reader.readAsBinaryString(file.raw);
      });
    },
    //图表弹窗关闭回调
    charDialogClose() {
      this.look_score = null
    },

  },
  mounted: function () {   //自动触发写入的函数
    this.getdata();
    //初始化分数信息
    getScoreList().then(data => {
      this.allScore = data.data
    })
  },
  components: {
    'score-chart':ScoreChart,
  }


}
</script>
<style lang="less" scoped>
.articlemanagement {
  width: 100%;
  height: 100%;
}

.search_ {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
