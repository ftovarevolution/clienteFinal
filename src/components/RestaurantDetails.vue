<template>
  <q-page>
    <q-img
      style="min-width:360px;width:100%;height:240px"
      class="full-width"
      src="comida4.jpeg"
    />
    <q-card class="q-pa-xs q-ma-md">
      <q-card-section class="">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">{{ form.name }}</div>
            <div class="text-subtitle2 text-grey-5">{{ form.vegonly }}</div>
          </div>

          <div class="col-auto">
            <q-badge color="primary"> {{ form.rating }} </q-badge>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="location_on" />
          </q-item-section>

          <q-item-section>{{ form.address }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="call" />
          </q-item-section>

          <q-item-section class="text-primary">{{ form.phone }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="query_builder" />
          </q-item-section>

          <q-item-section>Opening Time: {{ form.openingTime }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="schedule" />
          </q-item-section>

          <q-item-section>Closing Time: {{ form.closingTime }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="local_atm" />
          </q-item-section>

          <q-item-section
            >Per Person Cost: {{ form.personCost }}</q-item-section
          >
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="moped" />
          </q-item-section>

          <q-item-section
            >Delivery Time: {{ form.deliveryTime }}</q-item-section
          >
        </q-item>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "Every Day Fresh",
        vegonly: "Veg Only",
        rating: 4.8,
        address: "Civil lines 406C,Namdev Chownk",
        phone: "1231231234",
        openingTime: "05:30:AM",
        closingTime: "05:30:AM",
        personCost: "₹200-250",
        deliveryTime: "20-25"
      }
    };
  }
};
</script>

<style></style>
