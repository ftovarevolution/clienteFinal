<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none q-pa-sm">
      <div class="text-h6 text-grey-8">Apply Coupon</div>
      <q-space />
      <q-btn icon="close" style="width:65px" color="primary" outline dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <q-input v-model="coupon" class="full-width" outlined label="add coupon" dense >
        <template v-slot:append>
          <q-btn icon="add" color="positive" flat dense rounded @click="coupons.push({name: coupon}), coupon = ''" />
        </template>
      </q-input>
    </q-card-section>
    <q-separator />
    <q-card-section>
    Avilable Discount Coupon
      <q-list class="window-height">
        <div v-for="(coupon, index) in coupons" :key="index">
          <q-item>
            <q-item-section>
              <q-item-label> {{coupon.name}} </q-item-label>
              <q-item-label caption> {{coupon.description}} </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-btn label="Apply" style="width:65px" color="primary" dense v-close-popup />
            </q-item-section>
          </q-item>
          <q-separator />
        </div>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data () {
    return {
      coupon: '',
      coupons: [
        {
          name: 'off100',
          description: 'Hello testing'
        }
      ]
    }
  }
}
</script>

<style>

</style>
