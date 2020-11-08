<template>
  <q-layout view="lHh Lpr lFf">
    <div id="app">
      <transition name="slideUp" mode="out-in">
        <router-view />
      </transition>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: "OutLayout",
  components: {},
  data() {
    return {};
  }
};
</script>

<style></style>
