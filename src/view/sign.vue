<template>
  <div id="contentDiv">
    <div id="contentSign">
      <div id="lift">
        Lift
      </div>
      <!--登录框-->
        <div id="main">
          <!--选项卡-->
          <ul>
            <li id="li-signIn" v-bind:class="signInLi" v-on:click="signInClick">登录</li>
            <div id="space">

            </div>
            <li id="li-signUp" v-bind:class="signUpLi" v-on:click="signUpClick">注册</li>
          </ul>
          <!--登录-->
          <div id="signIn" v-show="signIn">
            <!--用户名-->
            <div class="inputDiv" >
              <input type="text" class="inputText" name="userName" id="userName" value="" placeholder="用户名/邮箱"/>
              <span id="nameInfo" class="info"></span>
            </div>
            <!--密码-->
            <div class="inputDiv">
              <input type="password" class="inputText" name="password" id="password" value="" placeholder="请输入密码"/>
              <span id="passwordInfo" class="info"></span>
            </div>
            <!--记住密码-->
            <div id="remember">
              <input type="checkbox" name="" id="rememberBox" value="" />
              <label for="rememberBox">记住密码</label>
              <!--注册/忘记-->
              <a href="#" id="forget">忘记密码？</a>
            </div>

            <!--登录按钮-->
            <input type="button" name="" id="signInBtn" value="登录" />

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
            <input type="button" name="" id="signUpBtn" value="立即注册" />
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sign',
    data(){
        return{
          signUp:false,
          signIn:true,
          signUpLi:{
            no_cli:true,
            cli:false
          },
          signInLi:{
            no_cli:false,
            cli:true
          }
        }
    },
    methods:{
      //登录
      signInClick:function () {
          this.signUp=false,
          this.signIn=true,
            this.signUpLi.no_cli=true,
            this.signUpLi.cli=false,
            this.signInLi.no_cli=false,
            this.signInLi.cli=true
        },
      //注册
      signUpClick:function () {
        this.signUp=true,
          this.signIn=false,
          this.signUpLi.no_cli=false,
          this.signUpLi.cli=true,
          this.signInLi.no_cli=true,
          this.signInLi.cli=false
      },
      //邮箱
    }
  }
</script>

<style>
  #contentDiv{
    height: 100vh;
    width: 100vw;
  }
  div{

  }
  a{
    text-decoration: none;
  }
  #contentSign{
    height: 500px;
    width: 300px;
    position: absolute;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
  /*logo*/
  #lift{
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
  #main{
    height: 400px;
    width: 300px;
  }
  /*选项卡*/
  #main ul{
    height: 80px;
    width: 300px;
    padding: 0px 25px;
  }
  #main li{
    height: 80px;
    width: 100px;
    display: inline-block;
    font-size: 25px;
    font-weight: 600;
    line-height: 80px;
    text-align: center;
    margin: 0px 10px;
  }
  #main li:hover{
    cursor: pointer;
    color: #009cff;
  }
  .cli{
    color: #46B6FD;
  }
  .no_cli{
    color: #D3D3D3;
  }
  #space{
    height: 20px;
    width: 2px;
    background: #808080;
    top: 30px;
    left: 125px;
    float: left;
  }

  /*登录*/
  .inputDiv{
    height: 60px;
    width: 300px;
  }
  /*输入框*/
  .inputText{
    height: 40px;
    width: 250px;
    margin: 5px 25px;
    padding: 0px 0px 0px 40px ;
    border-radius: 5px;
    font-size: 15px;
    border: 1px solid #D3D3D3;
  }
  #userName{
    background: url(../../static/icon/name.png) no-repeat;
    background-size: 25px 25px;
    background-position: 7px 7px;
  }
  #password{
    background: url(../../static/icon/password.png) no-repeat;
    background-size: 25px 25px;
    background-position: 7px 7px;
  }
  /*记住密码和前边的框*/
  #remember{
    height: 50px;
    width: 300px;
  }
  #remember input{
    top: 2px;
    left: 30px;
  }
  #remember label{
    color: grey;
    left: 30px;
  }
  #remember label:hover{
    color: black;
    cursor: pointer;
  }
  /*忘记密码*/
  #forget{
    color: #808080;
    left: 110px;
  }
  #forget:hover{
    color: black;
  }
  /*登录按钮*/
  #signInBtn{
    height: 35px;
    width: 240px;
    margin: 7px 30px;
    background: #46B6FD;
    border: 1px solid #46B6FD;
    border-radius: 3px;
    cursor: pointer;
    color: #FFFFFF;
  }
  #signInBtn:hover{
    background: #009cff;
  }
  /*关联登录*/
  #other{
    height: 50px;
    width: 300px;
    padding: 10px 50px;
    float: left;
  }
  #other div{
    float: left;
  }
  #qq a{
    background: url(../../static/icon/qq.png) no-repeat;
  }
  #weixin a{
    background: url(../../static/icon/weixin.png) no-repeat;
  }
  #pay a{
    background: url(../../static/icon/pay.png) no-repeat;
  }
  #other a{
    display: block;
    height: 40px;
    width: 40px;
    margin: 0px 13px;
    background-size: 80px 40px;
  }
  #other a:hover{
    background-position: -40px 0px;
  }
  /*注册*/
  /*提示*/
  .info{
    float: left;
    height: 0px;
    width: 200px;
    color: red;
    left: 290px;
    top: -40px;
  }
  .ok{
    position: absolute;
    top: 5px;
    height: 20px;
    width: 20px;
  }
  /*强度等级*/
  #strength{
    display: none;
    float: left;
  }
  #strength span{
    float: left;
    margin: -1px;
    top: 20px;
  }
  #strengthTab{
    /*上边可耐滴小气泡*/
    border-radius: 12px;
    height: 24px;
    width: 24px;
    color: #FFFFFF;
    top: -12px;
  }
  #strengthTab:before{
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
  #strengthTab:after{
    position: absolute;
    left: 4px;
  }
  /*弱*/
  .change1{
    background: red;
    /*left: -105px;*/
  }
  .change1:after{
    content: "弱";
  }
  .change1:before{
    border-top: 9px solid red;
  }
  /*中*/
  .change2{
    background: orange;
    /*left: -70px;*/
  }
  .change2:after{
    content: "中";
  }
  .change2:before{
    border-top: 9px solid orange;
  }
  /*强*/
  .change3{
    background: #66cc00;
    /*left: -35px;*/
  }
  .change3:after{
    content: "强";
  }
  .change3:before{
    border-top: 9px solid #66cc00;
  }
  /*强度等级条*/
  #strength1{
    height: 15px;
    width: 40px;
    border: 2px solid #c2c2c2;
    border-radius: 10px 0px 0px 10px;
  }
  #strength2{
    height: 15px;
    width: 40px;
    border: 2px solid #c2c2c2;
  }
  #strength3{
    height: 15px;
    width: 40px;
    border: 2px solid #c2c2c2;
    border-radius: 0px 10px 10px 0px;
  }
  .red{
    background: red;
  }
  .orange{
    background: orange;
  }
  .green{
    background: #66cc00;
  }
  /*验证码*/
  #verification input{
    width: 150px;
    margin-right: 0px;
  }
  #verification img{
    width: 80px;
    height: 30px;
    border: 1px solid #D3D3D3;
    cursor: pointer;
  }
  /*注册按钮*/
  #signUpBtn{
    height: 35px;
    width: 240px;
    margin: 7px 30px;
    background: #46B6FD;
    border: 1px solid #46B6FD;
    border-radius: 3px;
    cursor: pointer;
    color: #FFFFFF;
  }
  #signUpBtn:hover{
    background: #009cff;
  }
  /*同意注册*/
  #agree{
    width: 300px;
    height: 30px;
    text-align: center;
    color: #808080;
  }
  #agree a{
    color: #009CFF;
  }
  /*宽度小于900px时*/
  /*@media screen and (max-width: 900px){

  }*/
</style>
