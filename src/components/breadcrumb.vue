<template lang="html">
  <el-breadcrumb separator="/">
    <span class="db-breadcrumb-loc">位置：</span>
    <el-breadcrumb-item v-for="item in breadcrumbs" :to="item">
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'db-breadcrumb',

  data() {
    return {
      breadcrumbs: []
    };
  },

  mounted() {
    this.breadcrumbs = (this.$parent && this.$parent.$route && this.$parent.$route.matched) || [];
  }
};
</script>

<style lang="css">
.db-breadcrumb-loc {
  float: left;
}
</style>
