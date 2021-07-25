<template>
  <div class="login-wrapper">
    <el-button @click="apiTest">测试</el-button>
    <div class="login-main">
      <h3 class="login-title">安卓案例管理系统</h3>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username"     oninput="value=value.replace(/^\.+|[^\d.]/g,'')" placeholder="学号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <p class="login-tip">默认密码：12345678</p>
        </el-form-item>
      </el-form>
    </div>
    <canvas id="canvas" class="login-anim"></canvas>
  </div>
</template>

<script>
import {login} from '../../request/api';
  export default {
    name: 'login',
    data: function(){
      return {
        ruleForm: {
          username: '18201321',
          password: '12345678'
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      apiTest(){
        //console.log('TESTESTSETSW')
        getUserList().then(data=>{
          //console.log(data);
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {

          if (!valid) {

            this.$message.error('登录表单字段输入格式有误');
            return false;
          }
          //console.log(this.ruleForm.username);
          //console.log(this.ruleForm.password);
          //localStorage.setItem('username', this.ruleForm.username);
          //localStorage.setItem('user', JSON.stringify(this.$store.getters.userInfo));
          login({studentid:this.ruleForm.username,password:this.ruleForm.password}).then(data=>{
            //console.log(data.data);
            if(data.errno==0){
              //console.log('登入成功')
              this.$store.commit('setUser',data.data);
              this.$message.success('登入成功');
              console.log(this.$store.getters.userInfo)
              if(this.$store.getters.userInfo.isadmin==1){
                console.log('我是管理员')
                this.$router.push('/user-management');
              }else{
                console.log('我是学生')
                this.$router.push('/article-reading');
              }
            }else{
              //console.log('登入失败');
              this.$message.error('账号或密码错误');
            }
          })  
        });
      }
    },
    mounted() {

      // 实现页面底部波纹特效
      let canvas = document.getElementById('canvas');
      let ctx = canvas.getContext('2d');
      canvas.width = canvas.parentNode.offsetWidth;
      canvas.height = canvas.parentNode.offsetHeight;
      console.log(canvas.width, canvas.height);

      // 如果浏览器支持requestAnimFrame则使用requestAnimFrame否则使用setTimeout
      window.requestAnimFrame = (function () {

        return window.requestAnimationFrame
          || window.webkitRequestAnimationFrame
          || window.mozRequestAnimationFrame
          || function (callback) {

            window.setTimeout(callback, 1000 / 60);
          };
      })();

      // 波浪大小
      let boHeight = 40;// canvas.height / 10;
      let posHeight = canvas.height - 150;// canvas.height / 1.2;

      // 初始角度为0
      let step = 0;
      // 定义三条不同波浪的颜色
      let lines = ["rgba(69, 159, 117, 0.1)", "rgba(95, 170, 135, 0.6)", "rgba(69, 159, 117, 0.4)"];

      function loop(){

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        step++;
        // 画3个不同颜色的矩形
        for(let j = lines.length - 1; j >= 0; j--) {

          ctx.fillStyle = lines[j];

          //每个矩形的角度都不同，每个之间相差45度
          let angle = (step + j * 70) * Math.PI / 180; // 50
          let deltaHeight = Math.sin(angle) * boHeight;
          let deltaHeightRight = Math.cos(angle) * boHeight;
          ctx.beginPath();
          ctx.moveTo(0, posHeight + deltaHeight);
          ctx.moveTo(0, posHeight + deltaHeight);
          ctx.bezierCurveTo(canvas.width / 2, posHeight + deltaHeight-boHeight, canvas.width / 2, posHeight + deltaHeightRight - boHeight, canvas.width, posHeight + deltaHeightRight);
          ctx.lineTo(canvas.width, canvas.height);
          ctx.lineTo(0, canvas.height);
          ctx.lineTo(0, posHeight+deltaHeight);
          ctx.closePath();
          ctx.fill();
        }
        requestAnimFrame(loop);
      }
      loop();
    }
  }
</script>

<style scoped lang="less">
  .login-wrapper {
    height: 100%;
  }
  #canvas {
    width: 100%;
  }
  .login-main {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 320px;
    height: 370px;
    padding: 20px 35px;
    border: 1px solid #eee;
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
      background-color: #f5f5f5;
    }
    &::after {
      left: 10px;
      right: 10px;
      top: -22px;
      z-index: 1;
      background-color: #f0f0f0;
    }
  }
  .login-title {
    padding-bottom: 15px;
    border-bottom: 2px solid @mainColor;
    margin: 15px 0 45px 0;
    color: #555;
    text-align: center;
    font-size: 30px;
  }
  .login-btn{
    width: 100%;
    height: 36px;
    margin-top: 30px;
    font-size: 16px;
  }
  .login-tip {
    color: #999;
    font-size: 12px;
    line-height: 30px;
  }
  .login-anim {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
</style>
