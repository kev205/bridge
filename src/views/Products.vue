<template>
  <div class="products-template">
    <el-row>
      <el-col :span="6" v-for="product in products" :key="product.id">
        <app-product :product="product" :isAdmin="isAdmin"></app-product>
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
    return { products: [], apiRes: [], loaded: false, isAdmin: false };
  },
  watch: {
    user: function (newVal) {
      this.isAdmin = newVal.isAdmin;
      if (!this.loaded) {
        productServices.listProducts(newVal.isAdmin);
      }
      if (newVal && newVal.isAdmin) {
        const index = this.products.findIndex((p) => p.isoption);

        if (index < 0) this.products = [{ isoption: true }, ...this.products];
      }
    },
    productsList: function (newVal) {
      this.loaded = true;
      if (this.user && this.user.isAdmin) {
        const index = this.products.findIndex((p) => p.isoption);

        if (index < 0) this.products = [{ isoption: true }, ...newVal];
        else this.products = [this.products[index], ...newVal];
      } else this.products = newVal;
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
      productsList: "productsLists",
    }),
  },
};
</script>
