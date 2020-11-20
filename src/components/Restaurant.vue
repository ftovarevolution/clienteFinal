<template>
  <div>
    <div class="row">
      <div class="text-h6 text-black-3">{{ form.title }}</div>
      <q-space />
      <q-badge color="primary" :label="form.rating" class="q-ma-sm" />
    </div>
    <div class="text-grey-7 q-mt-sm">{{ form.description }}</div>
    <q-toggle
      class="q-mt-md text-grey-7"
      v-model="form.vegOnly"
      color="secondary"
      label="Veg Only"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "Bliss Indian Restaurant",
        description: "Veg Only",
        rating: 4.6,
        vegOnly: false
      }
    };
  }
};
</script>

<style></style>
