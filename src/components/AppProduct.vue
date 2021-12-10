<template>
  <div class="app-product">
    <modal-edit v-if="product.isoption"></modal-edit>
    <v-card v-else class="mx-auto" width="310" min-height="300">
      <v-img :src="product.image" height="200px"></v-img>
      <v-card-title>
        {{ product.name }}
      </v-card-title>
      <v-card-subtitle v-if="product.inStock > 0"> Available </v-card-subtitle>
      <v-card-subtitle v-else> Not Available </v-card-subtitle>
      <v-card-actions v-if="product.description">
        <v-btn color="orange lighten-2" text> Details </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>{{ product.description }} </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>

<script>
import ModalEdit from "./ModalEdit.vue";

export default {
  data() {
    return {
      currentDate: new Date(),
      show: false,
    };
  },
  props: ["product", "isAdmin"],
  components: { ModalEdit },
};
</script>
