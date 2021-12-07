<template>
  <el-row>
    <el-col
      :span="5"
      v-for="(product, index) in products"
      :key="product.id"
      :offset="index > 0 ? 1 : 0"
    >
      <el-card v-if="product.isoption" :body-style="{ padding: '0px' }">
        <span>Add Product / Service</span>
      </el-card>
      <el-card v-else :body-style="{ padding: '0px' }">
        <img :src="product.image" class="image" :alt="product.name" />
        <div style="padding: 14px">
          <span>{{ product.name }}</span>
          <div class="bottom clearfix">
            <time class="time">Produit</time>
            <el-button type="text" class="button">Operating</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
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
export default {
  data() {
    return {
      currentDate: new Date(),
    };
  },
  props: ["products"],
};
</script>
