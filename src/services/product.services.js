import firebase from "../firebaseInit";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const db = getFirestore(firebase);

export const productServices = {
  listProducts,
};

async function listProducts() {
  const productsCol = collection(db, "products");
  const productSnapshot = await getDocs(productsCol);
  return productSnapshot.docs.map((doc) => doc.data());
}
