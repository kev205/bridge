import firebase from "../firebaseInit";
const db = firebase.firestore();

export const userServices = { createUser };

function createUser(email, fullname, password) {
  db.collection("users").add({ email, fullname, password });
}
