<template>
  <AppProducts :products="products"></AppProducts>
</template>

<script>
import { productServices } from "../services/product.services";
import AppProducts from "../components/AppProducts.vue";

export default {
  components: { AppProducts },
  data() {
    return { products: [{ isoption: true }] };
  },
  async mounted() {
    this.products = [
      { isoption: true },
      ...(await productServices.listProducts()),
    ];
  },
};
</script>
