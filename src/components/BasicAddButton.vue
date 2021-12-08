<template v-slot:activator="{ on, attrs }">
  <v-card
    class="mx-auto"
    width="300"
    height="300"
    style="background-color: darkgray"
  >
    <div class="add-product">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Add product / service
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {};
</script>
