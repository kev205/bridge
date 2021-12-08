<template>
  <div class="products-template">
    <el-row>
      <el-col :span="6" v-for="product in products" :key="product.id">
        <app-product :product="product"></app-product>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { productServices } from "../services/product.services";
import AppProduct from "../components/AppProduct.vue";
import { mapGetters } from "vuex";

export default {
  components: { AppProduct },
  data() {
    return { products: [], apiRes: [] };
  },
  created() {
    productServices.listProducts();
  },
  watch: {
    user: function (newVal) {
      if (newVal && newVal.isAdmin) {
        const index = this.products.findIndex((p) => p.isoption);

        if (index < 0) this.products = [{ isoption: true }, ...this.products];
      }
    },
    productsList: function (newVal) {
      if (this.user && this.user.isAdmin)
        this.products = [{ isoption: true }, ...newVal];
      else this.products = newVal;
    },
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
      productsList: "productsLists",
    }),
  },
};
</script>
