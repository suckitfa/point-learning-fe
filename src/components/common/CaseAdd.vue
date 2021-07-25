<template>
  <el-container>
    <el-header>
      <el-input placeholder="请输入内容" v-model="articleTitle">
        <template slot="prepend">文章标题</template>
      </el-input>
<!--      <el-button @click="addKeyword">添加关键字</el-button>-->
      <el-row type="flex" align="middle">
        <el-col :span="3" style="display: flex;justify-content: center">文章关键字</el-col>
        <el-col :span="16">
          <el-select
            v-model="choose_keywords"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择文章标签"
            style="width: 100%">
            <el-option
              v-for="item in keywords"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <div id="websiteEditorElem" style="height:100%;background: #ffffff;"></div>
    </el-main>
    <el-footer class="row_button">
      <el-row type="flex" justify="center">
        <el-button type="primary" @click="getDate">提交</el-button>
      </el-row>
    </el-footer>

    <el-dialog
      title="添加"
      :visible.sync="isShowAddDialog"
      width="600px"
      >
      <el-transfer
        style="text-align: left; display: inline-block"
        v-model="choose_keywords"
        filterable
        :data="keywords"

        :titles="['可选择', '已选择']"
        :button-texts="['到左边', '到右边']"
        :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      >

      </el-transfer>
    </el-dialog>

  </el-container>
</template>

<script>
import E from 'wangeditor'
import {getKeyPointList,newArticle} from "../../request/api";

export default {
  name: "CaseAdd",
  data()
  {
    return {
      //文章标题
      articleTitle: '',
      //富文本编辑器
      editor: null,
      //是否显示弹窗
      isShowAddDialog: false,
      keydata:[],
      //所有知识点

      //已选择知识点
      choose_keywords:[]

    }
  },
  created()
  {
    getKeyPointList().then(data => {
      console.log(data)
      this.keydata = data.data
    })
  },
  computed: {
    //所有知识点
    keywords: function (){
      let keywords = [];
      for (let i =0;i<this.keydata.length;i++)
      {
        let obj = {}
        obj.vaule = this.keydata[i].pointid
        obj.label = this.keydata[i].pointname
        // obj.disabled = false
        keywords.push(obj)
      }
      return keywords
    }
  },
  methods: {
    getDate()
    {
      const articleData = {
        pointid: 1,
        userid: 1,
        status: 0,
        title:this.articleTitle,
        keyword:this.choose_keywords,
        createtime: 1623825916486,
        content:this.editor.txt.html(),
      }
      newArticle(articleData).then(data=>{
         console.log(data);
      })
      this.$message.success('提交成功');
      if(this.$store.getters.userInfo.isadmin===1){
        this.$router.push({
            path: "/case-management/case_list",
        }); 
      }else{
        this.$router.push({
            path: "/article",
        }); 
      }
      
      //console.log('这是什么',this.editor.txt.html())
      //console.log('这是标题？',this.articleTitle)
      //console.log('这是关键字？',this.choose_keywords)
    },
    addKeyword() {

      this.isShowAddDialog = true
    }
  },
  mounted()
  {
    this.editor = new E('#websiteEditorElem')
    //上传图片为 base64
    this.editor.config.uploadImgShowBase64 = true;
    //开启兼容模式
    this.editor.config.compatibleMode = function ()
    {
      // 返回 true 表示使用兼容模式；返回 false 使用标准模式
      return true
    }
    // 当我们使用兼容模式的时候，可以自定义记录的频率，默认 200 ms
    this.editor.config.onchangeTimeout = 500 // 修改为 500 ms
    // 还可以修改历史记录的步数。默认 30 步
    this.editor.config.historyMaxSize = 50 // 修改为 50 步
    // this.editor.config.height = 500
    // 菜单栏提示为下标
    this.editor.config.menuTooltipPosition = 'down'
    this.editor.config.placeholder = '文章内容'
    this.editor.config.zIndex = 0
    this.editor.create();

  }

}
</script>

<style scoped>


</style>
