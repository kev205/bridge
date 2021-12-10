import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
    products: {
      productsLists: [],
    },
  },
  getters: {
    user(state) {
      return state.user.data;
    },
    isLoggedIn(state) {
      return state.user.loggedIn;
    },
    productsLists(state) {
      return state.products.productsLists;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_PRODUCTS_LIST(state, value) {
      state.products.productsLists = value;
    },
    ADD_PRODUCT_TO_CARDS(state, value) {
      const index = state.products.productsLists.findIndex(
        (p) => p.id == value.id
      );

      if (index < 0)
        state.products.productsLists = [value, ...state.products.productsLists];
      else state.products.productsLists[index] = value;
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
          isAdmin: user.email == "admin2021@gmail.com",
        });
      } else {
        commit("SET_USER", null);
      }
    },
    fetchProducts({ commit }, listProducts) {
      commit("SET_PRODUCTS_LIST", listProducts);
    },
    addProduct({ commit }, product) {
      commit("ADD_PRODUCT_TO_CARDS", product);
    },
  },
});
