<template>
  <v-row justify="center">
    <modal-edit v-if="product.isoption"></modal-edit>
    <v-dialog v-else v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <div class="app-product">
          <v-card class="mx-auto" width="310" min-height="300" v-bind="attrs">
            <v-img
              :src="product.image"
              height="200px"
              v-on="isAdmin ? on : null"
            ></v-img>
            <v-card-title v-on="isAdmin ? on : null">
              {{ product.name }}
            </v-card-title>
            <v-card-subtitle v-if="product.inStock > 0">
              Available
            </v-card-subtitle>
            <v-card-subtitle v-else> Not Available </v-card-subtitle>
            <v-card-actions v-if="product.description">
              <v-btn color="orange lighten-2" text> Details </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
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
      <div class="product-form">
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Add/Edit Product/Service</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <form>
                <v-text-field
                  v-model="name"
                  :error-messages="nameErrors"
                  label="Name*"
                  required
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                  class="input-field"
                ></v-text-field>
                <v-textarea
                  v-model="description"
                  :error-messages="descErrors"
                  label="Description*"
                  required
                  @input="$v.description.$touch()"
                  @blur="$v.description.$touch()"
                  class="input-field"
                ></v-textarea>
                <v-file-input
                  v-model="image"
                  label="Add photo"
                  filled
                  prepend-icon=""
                  @change="getImage()"
                  id="file"
                  class="input-file"
                  accept="image/*"
                ></v-file-input>
                <v-text-field
                  v-model="price"
                  :error-messages="priceErrors"
                  label="Price*"
                  type="Number"
                  required
                  @input="$v.price.$touch()"
                  @blur="$v.price.$touch()"
                  class="input-long-field"
                ></v-text-field>
                <v-switch
                  v-model="isDiscount"
                  color="primary"
                  label="This item is discount"
                  inset
                ></v-switch>
                <v-switch
                  v-model="isService"
                  color="primary"
                  label="This item is a service"
                  inset
                ></v-switch>
                <v-switch
                  v-model="inStock"
                  color="primary"
                  label="In stock"
                  inset
                ></v-switch>
                <v-switch
                  v-model="published"
                  color="primary"
                  label="Published"
                  inset
                ></v-switch>
                <v-btn @click="cancel" class="form-btn"> cancel </v-btn>
                <v-btn
                  class="mr-4 form-btn"
                  @click="submit"
                  style="color: white; background-color: orange"
                >
                  submit
                </v-btn>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>
  </v-row>
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
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { productServices } from "../services/product.services";

export default {
  props: ["product", "isAdmin"],
  components: { ModalEdit },
  mixins: [validationMixin],
  validations: {
    name: { required, minLength: minLength(10) },
    description: { required, minLength: minLength(10) },
    price: { required },
  },
  data() {
    return {
      id: null,
      name: "",
      description: "",
      image: null,
      price: 0,
      isDiscount: false,
      isService: false,
      inStock: true,
      published: true,
      dialog: false,
      photo: null,
      show: false,
    };
  },
  created() {
    this.name = this.product.name || "";
    this.description = this.product.description || "";
    this.photo = this.product.image || null;
    this.price = this.product.price || 0;
    this.isDiscount = this.product.isDiscount || false;
    this.isService = this.product.isService || false;
    this.published = this.product.published || true;
    this.inStock = this.product.inStock || true;
    this.id = this.product.id;
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.minLength &&
        errors.push("Name must be at least 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    descErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.minLength &&
        errors.push("Description must be at least 10 characters long");
      !this.$v.description.required && errors.push("description is required.");
      return errors;
    },
    priceErrors() {
      const errors = [];
      if (!this.$v.price.$dirty) return errors;
      !this.$v.price.minLength && errors.push("Price must be given");
      return errors;
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      this.dialog = false;
      const {
        name,
        description,
        photo,
        price,
        isDiscount,
        isService,
        inStock,
        published,
        id,
      } = this;
      productServices.editProduct(
        {
          name,
          description,
          image: photo,
          price: parseFloat(price),
          isDiscount,
          isService,
          inStock,
          published,
        },
        id
      );
    },
    cancel() {
      this.dialog = false;
    },
    getImage() {
      const file = document.querySelector("#file").files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        this.photo = reader.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
