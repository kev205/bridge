import firebase from "../firebaseInit";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  setDoc,
  doc,
  query,
  where,
  addDoc,
  getDoc,
  orderBy,
} from "firebase/firestore/lite";
import store from "../store";

const db = getFirestore(firebase);

export const productServices = {
  listProducts,
  editProduct,
  deleteProduct,
  get,
};

async function listProducts(isadmin) {
  const productsCol = collection(db, "products");
  let productSnapshot;

  if (isadmin) {
    productSnapshot = await getDocs(productsCol, orderBy("name", "asc"));
  } else {
    const q = query(productsCol, where("published", "==", true));
    productSnapshot = await getDocs(q);
  }
  const products = productSnapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
  store.dispatch("fetchProducts", products);
}

async function editProduct(values, id = undefined) {
  const productsCol = collection(db, "products");
  if (id) {
    setDoc(doc(productsCol, id), values);
    store.dispatch("addProduct", { ...values, id });
  } else {
    try {
      const d = await addDoc(productsCol, values);
      const product = await getDoc(doc(productsCol, d.id));
      store.dispatch("addProduct", product.data());
    } catch (e) {
      /** */
    }
  }
}

function deleteProduct(id) {
  const productsCol = collection(db, "products");
  return updateDoc(doc(productsCol, id), { published: false });
}

function get(id) {
  const productsCol = collection(db, "products");
  return getDoc(doc(productsCol, id));
}
