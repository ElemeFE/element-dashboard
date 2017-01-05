<template lang="html">
  <div id="login-page" @keyup.enter="login">
    <div class="login-form">
      <div class="input-group">
        <div class="title">Element Dashboard</div>
        <el-input
          :autofocus="true"
          placeholder="请输入用户名"
          icon="time"
          v-model="username">
        </el-input>
      </div>
      <div class="input-group">
        <el-input
          placeholder="请输入密码"
          type="password"
          icon="time"
          v-model="password">
        </el-input>
      </div>
      <div class="input-group">
        <label>记住我？</label>
        <el-switch
          v-model="rememberMe"
          on-text=""
          off-text="">
        </el-switch>
      </div>
      <div class="input-group">
        <el-button @click.native="login" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { requestLogin } from '../../api/api';
export default {
  data() {
    return {
      username: 'vvliebe',
      password: '123456',
      rememberMe: false,
      isBtnLoading: false
    };
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登录中...';
      return '登录';
    }
  },
  methods: {
    login() {
      if (!this.username) {
        this.$message.error('请填写用户名！！！');
        return;
      }
      if (!this.password) {
        this.$message.error('请填写密码');
        return;
      }
      let loginParams = {username: this.username, password: this.password};
      this.isBtnLoading = true;
      requestLogin(loginParams).then(data => {
        this.isBtnLoading = false;
        let { msg, code, user } = data;
        if (code !== 200) {
          this.$message.error(msg);
        } else {
          localStorage.setItem('user', JSON.stringify(user));
          if (this.$route.query.redirect) {
            this.$router.push({path: this.$route.query.redirect});
          } else {
            this.$router.push({path: '/'});
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  #login-page {
    color: #D3DCE6;

    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background:#1F2D3D;

    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 500px;
      height: 400px;
      background: #475669;
      border-radius: 20px;
      box-shadow: 4px 4px 4px #324057;

      .title {
        color: #D3DCE6;
        font-weight: bold;
        font-size: 40px;
        text-align: center;
        line-height: 2.2;
      }

      .input-group {
        margin-top: 30px;
        width: 80%;
        button {
          width: 100%;
        }
      }
    }
  }
</style>
