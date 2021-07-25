<template>
  <el-header>
    <!-- 右侧导航栏折叠按钮 -->
    <span class="btn-collapse" @click="collapseChage" :title="collapse ? '展开侧边栏' : '收起侧边栏'">
      <i class="el-icon-menu"></i>
    </span>
    <!-- 系统标题 -->
    <span class="header-title margin-l-10">安卓课后学习系统</span>
    <div class="header-right">
      
      <!-- 用户头像 -->
      <img class="header-portrait" src="static/portrait.jpg" alt="用户头像">
      <!-- 用户名下拉菜单 -->
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{username}}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >
              <el-button @click="modify">修改密码</el-button></el-dropdown-item>
          <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
  import Bus from './bus';
  export default {
    name: "StudentHeader",
    data() {
      return {
        //message: 1,
        username: this.$store.getters.userInfo.username,
        collapse: false
      }
    },
    methods: {
      // 侧边栏折叠打开效果
      collapseChage() {

        this.collapse = !this.collapse;
        Bus.$emit('collapse', this.collapse);
      },

      // 用户名下拉菜单选择事件
      handleCommand(command) {

        if ('loginout' == command) {

          localStorage.removeItem('username');
          this.$router.push('/login');
        }
      },
      modify(){
        this.$router.push('/modify_password');
      }
    }
  }
</script>

<style scoped lang="less">
  [class*='el-icon'] {
    cursor: pointer;
  }
  .el-header {
    width: 100%;
    padding: 0 30px;
    background-color: @headerBgColor;
    color: white;
    font-size: 16px;
    line-height: 53px;
  }
  .header-title, .btn-info {
    display: inline-block;
  }
  .header-title, .btn-collapse, .el-icon-bell {
    font-size: 25px;
  }
  .header-right {
    float: right;
  }
  .btn-collapse {
    vertical-align: sub;
  }
  .btn-info {
    position: relative;
  }
  .btn-info-tip {
    position: absolute;
    top: 10px;
    .circle(8px);
    background-color: #ff464f;
  }
  .el-icon-bell {
    color: white;
    vertical-align: text-top;
  }
  .header-portrait {
    .circle(40px);
    margin: 0 20px;
    vertical-align: middle;
  }
  .el-dropdown-link {
    color: white;
    cursor: pointer;
  }
</style>
