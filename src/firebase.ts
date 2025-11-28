// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4ALy6x5GBF8LJ6bcbQ8uFSZfhoFTUk6E",
    authDomain: "mason-s-portfolio.firebaseapp.com",
    databaseURL: "https://mason-s-portfolio-default-rtdb.firebaseio.com",
    projectId: "mason-s-portfolio",
    storageBucket: "mason-s-portfolio.firebasestorage.app",
    messagingSenderId: "971185016934",
    appId: "1:971185016934:web:a13473a4a3eee8f0775da7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 获取数据库引用
export const db = getDatabase(app);
