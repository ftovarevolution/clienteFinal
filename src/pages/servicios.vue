<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    const self = this;
    self.$store.commit("global/setTitle", "");
  }
};
</script>

<style></style>
