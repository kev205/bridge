import firebase from "../firebaseInit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const auth = getAuth(firebase);

export const userServices = { createUser, login, logout };

function createUser(email, password, info) {
  return createUserWithEmailAndPassword(auth, email, password).then((data) => {
    return updateProfile(data.user, info);
  });
}

function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

function logout() {
  return signOut(auth);
}
