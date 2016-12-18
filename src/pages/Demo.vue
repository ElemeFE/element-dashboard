<template lang="html">
  <div>{{text}}</div>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    };
  },
  mounted() {
    this.text = this.$router.history.current.fullPath;
  },
  watch: {
    '$route'(to, from) {
      this.text = to.fullPath;
    }
  }
};
</script>

<style lang="scss">
</style>
