import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

import { toast } from "react-hot-toast";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();

// Register

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

// Login

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

// Logout

export const logOut = async (email, password) => {
  try {
    await signOut(auth, email, password);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

// Update Profile

export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toast.success("Profil Yeniləndi!");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

// Email Verification

export const emailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success(
      ` Təstiq mail'i ${auth.currentUser.email} adresinə göndərildi! `
    );
  } catch (error) {
    toast.error(error.message);
  }
};

export default app;
