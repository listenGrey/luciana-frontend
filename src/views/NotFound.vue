<template>
  <div class="not-found">
    <h1>404 - 页面不存在</h1>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 20%;
}
</style>