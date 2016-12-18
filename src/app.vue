<template>
  <section class="app">
    <el-row class="app-header">
      <header class="navbar">
        <a href="/" class="nav-brand">Element Dashboard</a>
        <div class="user-info" v-if="user.id">
          <span v-text="user.name"></span>
          <img :src="user.icon">
        </div>
      </header>
    </el-row>
    <div class="app-body">
      <el-menu default-active="2" class="menu-bar" router>
        <template v-for="(route, index) in $router.options.routes[1].children">
          <el-submenu :index="index + ''" v-if="route.children">
            <template slot="title"><i :class="route.iconClass"></i>{{route.name}}</template>
            <el-menu-item :index="index + '' + cIndex" v-for="(cRoute, cIndex) in route.children" :route="cRoute">{{cRoute.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item :index="index + ''" :route="route" v-if="!route.children"><i :class="route.iconClass"></i>{{route.name}}</el-menu-item>
        </template>
      </el-menu>
      <div class="router-view">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: '123',
        name: 'vvliebe',
        icon: 'https://o0p2nwku4.qnssl.com/favicon.ico'
      }
    };
  },
  created() {
    console.log(this.$router);
  }
};
</script>

<style lang="scss">
@import './styles/_variables.scss';
.app {
  height: 100%;
  display: flex;
  flex-direction: column;

  .app-header {
    height: 60px;

    .navbar{
      width: 100%;
      height: 100%;
      background: $dark-gray;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      box-sizing: border-box;

      .nav-brand{
        text-decoration: none;
        font-size: 1.5em;
        color: #ffffff;
      }

      .user-info {
        margin-right: 20px;
        color: #fff;
        span {
          vertical-align: middle;
        }
        img {
          width: 45px;
          height: 45px;
          vertical-align: middle;
        }
      }
    }
  }

  .app-body {
    display: flex;
    flex: 1;

    .menu-bar {
      flex: 4;
      height: 100%;
    }
    .router-view {
      flex: 20;
      height: 100%;
      padding: 15px;
      box-sizing: border-box;
    }
  }
}
</style>
