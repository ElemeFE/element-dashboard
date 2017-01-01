<template>
  <section class="db">

    <!-- header start  -->
    <header class="db-header">
      <a href="/" class="logo">Element Dashboard</a>
      <div class="user-info" v-if="user.id">
        <span v-text="user.name"></span>
        <img :src="user.icon">
      </div>
    </header>
    <!-- header end  -->

    <!-- body start  -->
    <div class="db-body">

      <!-- menu start -->
      <aside class="db-menu-wrapper">
        <el-menu default-active="2" class="db-menu-bar" router>
          <template v-for="(route, index) in $router.options.routes[0].children">
            <el-submenu :index="index + ''" v-if="route.children">
              <template slot="title"><i :class="route.iconClass"></i>{{route.name}}</template>
              <el-menu-item :index="index + '' + cIndex" v-for="(cRoute, cIndex) in route.children" :route="cRoute">{{cRoute.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item :index="index + ''" :route="route" v-if="!route.children"><i :class="route.iconClass"></i>{{route.name}}</el-menu-item>
          </template>
        </el-menu>
      </aside>
      <!-- menu end -->

      <!-- content start -->
      <div class="db-content-wrapper">
        <section class="db-content">
          <router-view></router-view>
        </section>
      </div>
      <!-- content end -->
    </div>
    <!-- body end  -->
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
  }
};
</script>

<style lang="scss">
@import './styles/_variables.scss';

.db {
  // header
  .db-header {
    width: 100%;
    height: 60px;
    background: #20A0FF;
    padding: 13px 20px;
    box-sizing: border-box;
    color: #ffffff;
    z-index: 99999999;
    position: fixed;
    left: 0;
    top: 0;

    .logo{
      font-size: 2.4rem;
    }

    .user-info {
      float: right;

      img {
        width: 25px;
        height: 25px;
        vertical-align: -7px;
        margin: 0 0 0 10px;
      }
    }
  }

  // body
  .db-body {

    // menu
    .db-menu-wrapper {
      position: fixed;
      left: 0;
      top: 60px;
      background: red;
      height: 100%;
      overflow: auto;
      z-index: 99999998;

      .db-menu-bar {
        height: 100%;
        flex-grow: 0;
        width: 200px;
      }
    }

    // content
    .db-content-wrapper {
      width: 100%;
      z-index: 997;
      box-sizing: border-box;
      padding: 60px 0px 0px 200px;

      .db-content {
        padding: 25px;

        .db-content-inner {
          padding: 10px 0px;
        }
      }
    }
  }
}
</style>
