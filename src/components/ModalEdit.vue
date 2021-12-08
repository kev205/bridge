<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
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
                <v-btn @click="clear" class="form-btn"> cancel </v-btn>
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

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { productServices } from "../services/product.services";

export default {
  name: "ModalEdit",
  mixins: [validationMixin],
  validations: {
    name: { required, minLength: minLength(10) },
    description: { required, minLength: minLength(10) },
    price: { required },
  },
  data() {
    return {
      name: "",
      description: "",
      image: null,
      price: null,
      isDiscount: false,
      isService: false,
      inStock: true,
      published: true,
      dialog: false,
      photo: null,
    };
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
      !this.$v.price.required && errors.push("Price is required.");
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
      } = this;
      productServices.editProduct({
        name,
        description,
        image: photo,
        price,
        isDiscount,
        isService,
        inStock,
        published,
      });
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.description = "";
      this.image = null;
      this.price = null;
      this.isDiscount = false;
      this.isService = false;
      this.inStock = true;
      this.published = true;
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
