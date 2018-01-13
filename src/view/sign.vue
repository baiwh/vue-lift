<template>
  <div id="contentDiv">
    <div id="contentSign">
      <div id="lift">
        Lift
      </div>
      <!--登录框-->
      <div id="signBox">
        <!--选项卡-->
        <ul>
          <li v-bind:class="signInLi" v-on:click="signInLiClick">登录</li>
          <div id="space"></div>
          <li v-bind:class="signUpLi" v-on:click="signUpLiClick">注册</li>
        </ul>
        <!--登录-->
        <div id="signIn" v-show="signIn">
          <!--用户名-->
          <div class="inputDiv">
            <input type="text" class="inputText" id="userName" v-on:blur="signInUserName" v-model="userName"
                   placeholder="用户名/邮箱"/>
            <span class="info">{{userNameInfo}}<img v-show="signInUN" class="ok" src="./../../static/icon/ok.png"></span>
          </div>
          <!--密码-->
          <div class="inputDiv">
            <input type="password" class="inputText" id="password" v-model="passWord" placeholder="请输入密码"/>
            <span class="info">{{passWordInfo}}</span>
          </div>
          <!--记住密码-->
          <div id="remember">
            <input type="checkbox" name="" id="rememberBox" value=""/>
            <label for="rememberBox">记住密码</label>
            <!--注册/忘记-->
            <a href="#" id="forget">忘记密码？</a>
          </div>
          <!--登录按钮-->
          <input type="button" class="signBtn" value="登录" v-on:click="signInBtn"/>
          <!--关联登录-->
          <div id="other">
            <div id="qq">
              <a href="" title="QQ登录"></a>
            </div>
            <div id="pay">
              <a href="" title="支付宝登录"></a>
            </div>
            <div id="weixin">
              <a href="" title="微信登录"></a>
            </div>
          </div>
        </div>
        <!--注册-->
        <div id="signUp" v-show="signUp">
          <!--邮箱-->
          <input type="email" name="email" id="email" value="" class="inputText" placeholder="用于注册的email"/>
          <span id="emailInfo" class="info"></span>
          <!--密码-->
          <input type="password" name="pwd" id="pwd" class="inputText" value="" placeholder="请输入密码"/>
          <span id="pwdInfo" class="info"></span>
          <div class="info" id="strength">
            <span id="strength1"></span>
            <span id="strength2"></span>
            <span id="strength3"></span>
            <div id="strengthTab"></div>
          </div>
          <!--再输入一次密码-->
          <input type="password" name="pwd2" id="pwd2" class="inputText" value="" placeholder="请再次输入密码"/>
          <span id="pwd2Info" class="info"></span>
          <!--提交-->
          <input type="button" class="signBtn" value="立即注册"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'sign',
    data(){
      return {
        signUp: false,
        signIn: true,
        signUpLi: {
          no_cli: true,
          cli: false
        },
        signInLi: {
          no_cli: false,
          cli: true
        },
        userName: '',
        passWord: '',
        userNameInfo: '',
        passWordInfo: '',
        signInUN:false
      }
    },
    methods: {
      //登录选项卡
      signInLiClick: function () {
        this.signUp = false,
          this.signIn = true,
          this.signUpLi.no_cli = true,
          this.signUpLi.cli = false,
          this.signInLi.no_cli = false,
          this.signInLi.cli = true
      },
      //注册选项卡
      signUpLiClick: function () {
        this.signUp = true,
          this.signIn = false,
          this.signUpLi.no_cli = false,
          this.signUpLi.cli = true,
          this.signInLi.no_cli = true,
          this.signInLi.cli = false
      },
      //邮箱

      //登录按钮
      signInBtn: function () {
        let userName = this.userName;
        let passWord = this.passWord;
        //如果用户名和密码非空
        if (userName != '' && passWord != '') {
          //查询用户名是否存在
          axios.get('/index/checkUser.action', {
            params: {
              userName: userName,
              checkType: 1
            },
            baseURL: '/liftVue',
            withCredentials: false
          }).then(res => {
            let user = res.data;
            let suc = user.status;
            let info=user.msg;
            //如果用户名存在
            if (suc) {
              //去掉报错提示
              this.userNameInfo = '';
              //插入正确提示符号
              this.signInUN=true;
              //验证密码是否正确
              axios.get('/index/signIn.action', {
                params: {
                  userName: userName,
                  passWord: passWord
                },
                baseURL: '/liftVue',
                withCredentials: false
              }).then(res => {
                let pass = res.data;
                let sucP = pass.status;
                if (sucP) {
                  //跳转到主页面
                } else {
                  //密码报错提示
                  this.passWordInfo = '密码错误';
                }
              })
            } else {
              //如果用户名不存在。用户名报错提示
              this.userNameInfo = info;
            }

          })
        } else if (userName == '' && passWord == '') {
          //如果都空
          this.signInUN=false;
          this.userNameInfo = '请填写用户名';
          this.passWordInfo = '请输入密码';
        } else {
          //如果有空。报错。
          if (userName == "") {
              this.signInUN=false;
            this.userNameInfo = '请填写用户名';
            this.passWordInfo = '';
          }
          if (passWord == "") {
            this.passWordInfo = '请输入密码';
          }
        }

      },
      //离开登陆用户名输入框
      signInUserName: function () {
        let userName = this.userName;
        //如果用户名非空
        if (userName != '') {
          //查询用户名是否存在
          axios.get('/index/checkUser.action', {
            params: {
              userName: userName,
              checkType: 1
            },
            baseURL: '/liftVue',
            withCredentials: false
          }).then(res => {
            let user = res.data;
            let suc = user.status;
            if (suc == 1) {
              //去掉报错提示
              this.userNameInfo = '';
              //插入正确提示符号<img class='ok' src='/lift/icon/ok.png'>

            }
          })
        }
      }
    }
  }
</script>

<style>
  #contentDiv {
    height: 100vh;
    width: 100vw;
  }

  div {

  }

  a {
    text-decoration: none;
  }

  #contentSign {
    height: 500px;
    width: 300px;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }

  /*logo*/
  #lift {
    height: 100px;
    width: 300px;
    font-size: 100px;
    letter-spacing: 20px;
    line-height: 100px;
    top: 8px;
    left: 40px;
    color: #46B6FD;
  }

  /*登录框*/
  #signBox {
    height: 400px;
    width: 300px;
  }

  /*选项卡*/
  #signBox ul {
    height: 80px;
    width: 300px;
    padding: 0px 25px;
  }

  #signBox li {
    height: 80px;
    width: 100px;
    display: inline-block;
    font-size: 25px;
    font-weight: 600;
    line-height: 80px;
    text-align: center;
    margin: 0px 10px;
  }

  #signBox li:hover {
    cursor: pointer;
    color: #009cff;
  }

  .cli {
    color: #46B6FD;
  }

  .no_cli {
    color: #D3D3D3;
  }

  #space {
    height: 20px;
    width: 2px;
    background: #808080;
    top: 30px;
    left: 125px;
    float: left;
  }

  /*登录*/
  .inputDiv {
    height: 60px;
    width: 300px;
  }

  /*输入框*/
  .inputText {
    height: 40px;
    width: 250px;
    margin: 5px 25px;
    padding: 0px 0px 0px 40px;
    border-radius: 5px;
    font-size: 15px;
    border: 1px solid #D3D3D3;
  }

  #userName {
    background: url(../../static/icon/name.png) no-repeat;
    background-size: 25px 25px;
    background-position: 7px 7px;
  }

  #password {
    background: url(../../static/icon/password.png) no-repeat;
    background-size: 25px 25px;
    background-position: 7px 7px;
  }

  /*记住密码和前边的框*/
  #remember {
    height: 50px;
    width: 300px;
  }

  #remember input {
    top: 2px;
    left: 30px;
  }

  #remember label {
    color: grey;
    left: 30px;
  }

  #remember label:hover {
    color: black;
    cursor: pointer;
  }

  /*忘记密码*/
  #forget {
    color: #808080;
    left: 110px;
  }

  #forget:hover {
    color: black;
  }

  /*按钮*/
  .signBtn {
    height: 35px;
    width: 240px;
    margin: 7px 30px;
    background: #46B6FD;
    border: 1px solid #46B6FD;
    border-radius: 3px;
    cursor: pointer;
    color: #FFFFFF;
  }

  .signBtn:hover {
    background: #009cff;
  }

  /*关联登录*/
  #other {
    height: 50px;
    width: 300px;
    padding: 10px 50px;
    float: left;
  }

  #other div {
    float: left;
  }

  #qq a {
    background: url(../../static/icon/qq.png) no-repeat;
  }

  #weixin a {
    background: url(../../static/icon/weixin.png) no-repeat;
  }

  #pay a {
    background: url(../../static/icon/pay.png) no-repeat;
  }

  #other a {
    display: block;
    height: 40px;
    width: 40px;
    margin: 0px 13px;
    background-size: 80px 40px;
  }

  #other a:hover {
    background-position: -40px 0px;
  }

  /*注册*/
  /*提示*/
  .info {
    float: left;
    height: 0px;
    width: 200px;
    color: red;
    left: 290px;
    top: -40px;
  }

  .ok {
    position: absolute;
    top: 5px;
    height: 20px;
    width: 20px;
  }

  /*强度等级*/
  #strength {
    display: none;
    float: left;
  }

  #strength span {
    float: left;
    margin: -1px;
    top: 20px;
  }

  #strengthTab {
    /*上边可耐滴小气泡*/
    border-radius: 12px;
    height: 24px;
    width: 24px;
    color: #FFFFFF;
    top: -12px;
  }

  #strengthTab:before {
    /*小气泡的三角*/
    content: "";
    width: 0px;
    height: 0px;
    position: relative;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    top: 28px;
    left: 2px;
  }

  #strengthTab:after {
    position: absolute;
    left: 4px;
  }

  /*弱*/
  .change1 {
    background: red;
    /*left: -105px;*/
  }

  .change1:after {
    content: "弱";
  }

  .change1:before {
    border-top: 9px solid red;
  }

  /*中*/
  .change2 {
    background: orange;
    /*left: -70px;*/
  }

  .change2:after {
    content: "中";
  }

  .change2:before {
    border-top: 9px solid orange;
  }

  /*强*/
  .change3 {
    background: #66cc00;
    /*left: -35px;*/
  }

  .change3:after {
    content: "强";
  }

  .change3:before {
    border-top: 9px solid #66cc00;
  }

  /*强度等级条*/
  #strength1 {
    height: 15px;
    width: 40px;
    border: 2px solid #c2c2c2;
    border-radius: 10px 0px 0px 10px;
  }

  #strength2 {
    height: 15px;
    width: 40px;
    border: 2px solid #c2c2c2;
  }

  #strength3 {
    height: 15px;
    width: 40px;
    border: 2px solid #c2c2c2;
    border-radius: 0px 10px 10px 0px;
  }

  .red {
    background: red;
  }

  .orange {
    background: orange;
  }

  .green {
    background: #66cc00;
  }

  /*验证码*/
  #verification input {
    width: 150px;
    margin-right: 0px;
  }

  #verification img {
    width: 80px;
    height: 30px;
    border: 1px solid #D3D3D3;
    cursor: pointer;
  }

  /*同意注册*/
  #agree {
    width: 300px;
    height: 30px;
    text-align: center;
    color: #808080;
  }

  #agree a {
    color: #009CFF;
  }
</style>
