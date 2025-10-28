// // --- Static Imports ---
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import React, { useEffect, useState } from "react";
// import {
//   Routes,
//   Route,
//   Link,
//   useNavigate,
// } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import Lottie from "lottie-react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import LoginPage from "./components/LoginPage";
// import RegisterPage from "./components/CustomerForm";
// // --- Components (Assuming you have these files) ---
// import Navbar from "./components/Navbar"; 
// import Dashboard from "./components/Dashboard"; 
// import LoginModal from "./components/LoginModal"; 
// import RegisterModal from "./components/RegisterModal";

// // --- FIX: Firebase Imports ---
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

// // --- Lottie Animation URLs ---
// const HERO_ANIMATION_URL = "https://lottie.host/266a3eaf-0535-4251-b138-ee87fd8670e1/HEWCx6n0M8.json";
// const INVENTORY_ANIMATION_URL = "https://lottie.host/862918cb-9726-4f5d-957e-6d0660c56d21/HtDoQqvWwc.json";
// const REPORTS_ANIMATION_URL = "https://lottie.host/1d4984b6-7432-4589-b3a4-29e2ebb6aa80/lLME8ltPqI.json";
// const CUSTOMER_ANIMATION_URL = "https://lottie.host/f1060333-0a6b-4342-89cc-fbbfd9f59621/un46wPjDej.json";
// const SUPPORT_ANIMATION_URL = "https://lottie.host/dcf0515a-e357-4c15-971e-92b7b3c64cd9/NCVCuCeior.json";

// // ✅ Lottie Wrapper
// function LottieWrapper({ url }) {
//   const [animationData, setAnimationData] = useState(null);
//   useEffect(() => {
//     fetch(url)
//       .then(res => res.json())
//       .then(setAnimationData)
//       .catch(err => console.error("Failed to load Lottie:", err));
//   }, [url]);

//   if (!animationData)
//     return <div className="flex items-center justify-center h-40 text-gray-400 italic">Loading animation...</div>;

//   return <Lottie animationData={animationData} loop autoplay />;
// }

// // --- Global Vars (MUST be used) ---
// // FIX: Accessing global variables via 'window' to resolve 'no-undef' ESLint errors locally.
// const firebaseConfig = typeof window.__firebase_config !== 'undefined' ? JSON.parse(window.__firebase_config) : {};
// const initialAuthToken = typeof window.__initial_auth_token !== 'undefined' ? window.__initial_auth_token : null;
// const appId = typeof window.__app_id !== 'undefined' ? window.__app_id : 'default-app-id';

// // Global Firebase Instances (Set in useEffect)
// let db;
// let auth;

// // ---------------- Navbar ----------------
// function PublicNavbar({ onLoginClick, onRegisterClick }) {
//   return (
//     <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-4 bg-gradient-to-r from-pink-100/80 to-yellow-100/80 backdrop-blur-md shadow-lg z-50">
//       <h1 className="text-3xl font-bold text-pink-700 drop-shadow-md">🍰 The Baker's Edge</h1>
//       <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
//         <a href="/#hero" className="hover:text-pink-500 transition-colors">Home</a>
//         <a href="/#features" className="hover:text-pink-500 transition-colors duration-300">Why Smart Bakers</a>
//         <a href="/#support" className="hover:text-pink-500 transition-colors duration-300">Support</a>
//       </div>
//       <div className="flex space-x-3">
//         <button onClick={onLoginClick} className="px-5 py-2 bg-white text-pink-600 border border-pink-600 rounded-lg hover:bg-pink-50 font-semibold transition duration-300 shadow-md hover:shadow-lg">Login</button>
//         <button onClick={onRegisterClick} className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg hover:from-yellow-500 hover:to-yellow-600 font-semibold transition duration-300 shadow-md hover:shadow-lg">Register</button>
//       </div>
//     </nav>
//   );
// }

// // ----------------- Hero Section -----------------
// function Hero({ onLoginClick, onRegisterClick }) {
//   return (
//     <section id="hero" className="min-h-screen flex items-center pt-24 pb-12 bg-pink-50">
//       <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
//         <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
//           <h1 className="text-5xl md:text-6xl font-extrabold text-pink-900 mb-6 leading-tight">
//             The Baker's Edge: Go Digital 🚀
//           </h1>
//           <p className="text-lg text-gray-700 mb-8 max-w-lg">
//             Stop chasing paper trails. Automate sales, track custom orders, and master inventory so you can focus on mastering your recipes.
//           </p>
//           <div className="flex space-x-4">
//             <button onClick={onRegisterClick} className="px-8 py-3 bg-yellow-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition">
//               Get Started
//             </button>
//             <button onClick={onLoginClick} className="px-8 py-3 bg-white text-pink-700 text-lg font-semibold rounded-lg border border-gray-300 hover:bg-gray-100 transition">
//               Login
//             </button>
//           </div>
//         </motion.div>
//         <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7 }}>
//           <LottieWrapper url={HERO_ANIMATION_URL} />
//         </motion.div>
//       </div>
//     </section>
//   );
// }
// // ---------------- Feature Cards ----------------
// function FeatureCard({ animationUrl, title, description }) {
//   return (
//     <motion.div
//       className="bg-white p-8 rounded-3xl shadow-2xl text-center flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-3xl"
//       whileHover={{ y: -20 }}
//       transition={{ type: "spring", stiffness: 300 }}
//     >
//       <div className="w-48 h-40 mb-4">
//         <LottieWrapper url={animationUrl} />
//       </div>
//       <h3 className="text-2xl font-bold text-pink-800 mb-3">{title}</h3>
//       <p className="text-gray-600">{description}</p>
//     </motion.div>
//   );
// }

// function Features() {
//   const items = [
//     { title: "Recipe-Level Inventory", desc: "Instantly manage flour, butter, and yeast stock, track batch usage, and receive low-stock alerts before your next big order.", url: INVENTORY_ANIMATION_URL },
//     { title: "Bake-Sheet Profit Analytics", desc: "See true profitability per item (e.g., Samosa vs. Black Forest Cake) and get daily reports on your hottest and coldest sellers.", url: REPORTS_ANIMATION_URL },
//     { title: "Loyalty & Order History", desc: "Save customer flavor preferences, manage customized orders, and view every past purchase to fuel repeat business.", url: CUSTOMER_ANIMATION_URL },
//   ];

//   return (
//     <section id="features" className="py-20 bg-gradient-to-b from-yellow-50 via-pink-50 to-white">
//       <div className="container mx-auto px-6">
//         <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-pink-900 drop-shadow-md">Why Smart Bakers Choose Our Platform 🌟</h2>
//         <div className="grid md:grid-cols-3 gap-10">
//           {items.map((item, i) => <FeatureCard key={i} animationUrl={item.url} title={item.title} description={item.desc} />)}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ---------------- Support Section ----------------
// function Support() {
//   return (
//     <section id="support" className="py-20 bg-gradient-to-r from-pink-50 to-yellow-50">
//       <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
//         <div>
//           <h2 className="text-4xl font-extrabold text-pink-900 mb-6 drop-shadow-md">Friendly Support When You Need a Hand 👋</h2>
//           <p className="text-lg text-gray-700 leading-relaxed">
//             Always There for You. Get quick help on any platform feature or sales issue.
//           </p>
//         </div>
//         <div className="w-full max-w-md mx-auto"><LottieWrapper url={SUPPORT_ANIMATION_URL} /></div>
//       </div>
//     </section>
//   );
// }

// // ---------------- CTA Section ----------------
// function CallToAction({ onRegisterClick }) {
//   return (
//     <section id="cta" className="py-20 bg-gradient-to-r from-pink-700 to-yellow-500 text-white text-center">
//       <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Digitize Your Bakery Ledger Today</h2>
//       <p className="text-xl text-pink-100 mb-8">Safe. Simple. Made for Indian Bakers.</p>
//       <button onClick={onRegisterClick} className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xl font-bold rounded-xl shadow-2xl hover:from-yellow-500 hover:to-yellow-600 transition duration-300 transform hover:-translate-y-1 hover:scale-105">Get Started</button>
//     </section>
//   );
// }

// // function Products() {
// //   const items = [
// //     { name: "Chocolate Cake", img: "https://placehold.co/400x300/F0F0F0/000000?text=Chocolate" },
// //     { name: "Strawberry Pastry", img: "https://placehold.co/400x300/F0F0F0/000000?text=Strawberry" },
// //     { name: "Fresh Bread", img: "https://placehold.co/400x300/F0F0F0/000000?text=Bread" },
// //   ];

// //   return (
// //     <section id="products" className="py-16 bg-gradient-to-r from-yellow-100 to-pink-100">
// //       <h2 className="text-5xl font-bold text-center mb-12 text-pink-700">
// //         Our Products
// //       </h2>
// //       <div className="grid md:grid-cols-3 gap-10 px-10">
// //         {items.map((item, i) => (
// //           <motion.div
// //             key={i}
// //             className="p-6 rounded-2xl shadow-xl bg-white text-center hover:scale-105 transition transform"
// //             whileHover={{ scale: 1.05 }}
// //           >
// //             <img 
// //               src={item.img} 
// //               alt={item.name} 
// //               className="rounded-xl mb-4 w-full h-56 object-cover" 
// //               onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/F0F0F0/000000?text=Bakery+Item"; }}
// //             />
// //             <h3 className="text-2xl font-semibold text-gray-800">{item.name}</h3>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }

// // function HomePage({ onLoginClick, onRegisterClick }) {
// //   return (
// //     <>
// //       <PublicNavbar onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
// //       <Hero />
// //       <section id="about" className="py-16 px-10 bg-yellow-50">
// //         <h2 className="text-4xl font-bold text-center text-pink-600 mb-6">
// //           About Us
// //         </h2>
// //         <p className="text-center max-w-2xl mx-auto text-gray-600">
// //           Welcome to MyBakery! We serve freshly baked cakes, pastries, and breads
// //           daily. Our recipes are made with love and the finest ingredients.
// //         </p>
// //       </section>
// //       <Products />
// //       <Footer />
// //     </>
// //   );
// // }


// // ---------------- Footer ----------------
// function Footer() {
//   return (
//     <footer className="py-10 bg-gray-900 text-gray-400 text-center">
//       <p><strong>Website:</strong> www.varadanalyst.com | <strong>Phone:</strong> +91 8446448461</p>
//       <p><strong>Address:</strong> 505, Shivcity Center, Vijaynagar, Sangli 416416</p>
//       <p className="text-sm mt-2">&copy; 2025 The Baker's Edge. All rights reserved.</p>
//     </footer>
//   );
// }

// // ---------------- App Content ----------------
// function AppContent() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [showRegister, setShowRegister] = useState(false);

//   return (
//     <>
//       <PublicNavbar onLoginClick={() => setShowLogin(true)} onRegisterClick={() => setShowRegister(true)} />
//       <Hero onLoginClick={() => setShowLogin(true)} onRegisterClick={() => setShowRegister(true)} />
//       <Features />
//       <Support />
//       <CallToAction onRegisterClick={() => setShowRegister(true)} />
//       <Footer />

//       <AnimatePresence>
//         {showLogin && <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />}
//         {showRegister && <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />}
//       </AnimatePresence>
//     </>
//   );
// }

// // ---------------- Main App ----------------
// export default function App() {
//   return (
//     <>
//       <ToastContainer position="top-center" autoClose={3000} />
//       <Routes>
//         <Route path="/" element={<AppContent />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//       </Routes>
//     </>
//   );
// }

// // App.js
// import React, { useState, useEffect } from "react";
// // import { Routes, Route } from "react-router-dom"; // <-- REMOVED
// import { motion, AnimatePresence } from "framer-motion";
// import Lottie from "lottie-react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // import LoginPage from "./components/LoginPage"; // <-- REMOVED
// // import RegisterPage from "./components/CustomerForm"; // <-- REMOVED
// import LoginModal from "./components/LoginModal";
// import RegisterModal from "./components/RegisterModal";
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // <-- REMOVED (handled in index.js)




// // --- Lottie Animation URLs ---
// const HERO_ANIMATION_URL = "https://lottie.host/266a3eaf-0535-4251-b138-ee87fd8670e1/HEWCx6n0M8.json";
// const INVENTORY_ANIMATION_URL = "https://lottie.host/862918cb-9726-4f5d-957e-6d0660c56d21/HtDoQqvWwc.json";
// const REPORTS_ANIMATION_URL = "https://lottie.host/1d4984b6-7432-4589-b3a4-29e2ebb6aa80/lLME8ltPqI.json";
// const CUSTOMER_ANIMATION_URL = "https://lottie.host/f1060333-0a6b-4342-89cc-fbbfd9f59621/un46wPjDej.json";
// const SUPPORT_ANIMATION_URL = "https://lottie.host/dcf0515a-e357-4c15-971e-92b7b3c64cd9/NCVCuCeior.json";

// // ✅ Lottie Wrapper
// function LottieWrapper({ url }) {
//   const [animationData, setAnimationData] = useState(null);
//   useEffect(() => {
//     fetch(url)
//       .then(res => res.json())
//       .then(setAnimationData)
//       .catch(err => console.error("Failed to load Lottie:", err));
//   }, [url]);

//   if (!animationData)
//     return <div className="flex items-center justify-center h-40 text-gray-400 italic">Loading animation...</div>;

//   return <Lottie animationData={animationData} loop autoplay />;
// }

// // ---------------- Navbar ----------------
// function PublicNavbar({ onLoginClick, onRegisterClick }) {
//   return (
//     <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-4 bg-gradient-to-r from-pink-100/80 to-yellow-100/80 backdrop-blur-md shadow-lg z-50">
//       <h1 className="text-3xl font-bold text-pink-700 drop-shadow-md">🍰 The Baker's Edge</h1>
//       <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
//         <a href="/#hero" className="hover:text-pink-500 transition-colors">Home</a>
//         <a href="/#features" className="hover:text-pink-500 transition-colors duration-300">Why Smart Bakers</a>
//         <a href="/#support" className="hover:text-pink-500 transition-colors duration-300">Support</a>
//       </div>
//       <div className="flex space-x-3">
//         <button onClick={onLoginClick} className="px-5 py-2 bg-white text-pink-600 border border-pink-600 rounded-lg hover:bg-pink-50 font-semibold transition duration-300 shadow-md hover:shadow-lg">Login</button>
//         <button onClick={onRegisterClick} className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg hover:from-yellow-500 hover:to-yellow-600 font-semibold transition duration-300 shadow-md hover:shadow-lg">Register</button>
//       </div>
//     </nav>
//   );
// }

// // ----------------- Hero Section -----------------
// function Hero({ onLoginClick, onRegisterClick }) {
//   return (
//     <section id="hero" className="min-h-screen flex items-center pt-24 pb-12 bg-pink-50">
//       <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
//         <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
//           <h1 className="text-5xl md:text-6xl font-extrabold text-pink-900 mb-6 leading-tight">
//             The Baker's Edge: Go Digital 🚀
//           </h1>
//           <p className="text-lg text-gray-700 mb-8 max-w-lg">
//             Stop chasing paper trails. Automate sales, track custom orders, and master inventory so you can focus on mastering your recipes.
//           </p>
//           <div className="flex space-x-4">
//             <button onClick={onRegisterClick} className="px-8 py-3 bg-yellow-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition">
//               Get Started
//             </button>
//             <button onClick={onLoginClick} className="px-8 py-3 bg-white text-pink-700 text-lg font-semibold rounded-lg border border-gray-300 hover:bg-gray-100 transition">
//               Login
//             </button>
//           </div>
//         </motion.div>
//         <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7 }}>
//           <LottieWrapper url={HERO_ANIMATION_URL} />
//         </motion.div>
//       </div>
//     </section>
//   );
// }
// // ---------------- Feature Cards ----------------
// function FeatureCard({ animationUrl, title, description }) {
//   return (
//     <motion.div
//       className="bg-white p-8 rounded-3xl shadow-2xl text-center flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-3xl"
//       whileHover={{ y: -10 }}
//       transition={{ type: "spring", stiffness: 300 }}
//     >
//       <div className="w-48 h-40 mb-4">
//         <LottieWrapper url={animationUrl} />
//       </div>
//       <h3 className="text-2xl font-bold text-pink-800 mb-3">{title}</h3>
//       <p className="text-gray-600">{description}</p>
//     </motion.div>
//   );
// }

// function Features() {
//   const items = [
//     { title: "Recipe-Level Inventory", desc: "Instantly manage flour, butter, and yeast stock, track batch usage, and receive low-stock alerts before your next big order.", url: INVENTORY_ANIMATION_URL },
//     { title: "Bake-Sheet Profit Analytics", desc: "See true profitability per item (e.g., Samosa vs. Black Forest Cake) and get daily reports on your hottest and coldest sellers.", url: REPORTS_ANIMATION_URL },
//     { title: "Loyalty & Order History", desc: "Save customer flavor preferences, manage customized orders, and view every past purchase to fuel repeat business.", url: CUSTOMER_ANIMATION_URL },
//   ];

//   return (
//     <section id="features" className="py-20 bg-gradient-to-b from-yellow-50 via-pink-50 to-white">
//       <div className="container mx-auto px-6">
//         <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-pink-900 drop-shadow-md">Why Smart Bakers Choose Our Platform 🌟</h2>
//         <div className="grid md:grid-cols-3 gap-10">
//           {items.map((item, i) => <FeatureCard key={i} animationUrl={item.url} title={item.title} description={item.desc} />)}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ---------------- Support Section ----------------
// function Support() {
//   return (
//     <section id="support" className="py-20 bg-gradient-to-r from-pink-50 to-yellow-50">
//       <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
//         <div>
//           <h2 className="text-4xl font-extrabold text-pink-900 mb-6 drop-shadow-md">Friendly Support When You Need a Hand 👋</h2>
//           <p className="text-lg text-gray-700 leading-relaxed">
//             Always There for You. Get quick help on any platform feature or sales issue.
//           </p>
//         </div>
//         <div className="w-full max-w-md mx-auto"><LottieWrapper url={SUPPORT_ANIMATION_URL} /></div>
//       </div>
//     </section>
//   );
// }

// // ---------------- CTA Section ----------------
// function CallToAction({ onRegisterClick }) {
//   return (
//     <section id="cta" className="py-20 bg-gradient-to-r from-pink-700 to-yellow-500 text-white text-center">
//       <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Digitize Your Bakery Ledger Today</h2>
//       <p className="text-xl text-pink-100 mb-8">Safe. Simple. Made for Indian Bakers.</p>
//       <button onClick={onRegisterClick} className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xl font-bold rounded-xl shadow-2xl hover:from-yellow-500 hover:to-yellow-600 transition duration-300 transform hover:-translate-y-1 hover:scale-105">Get Started</button>
//     </section>
//   );
// }

// // ---------------- Footer ----------------
// function Footer() {
//   return (
//     <footer className="py-10 bg-gray-900 text-gray-400 text-center">
//       <p><strong>Website:</strong> www.varadanalyst.com | <strong>Phone:</strong> +91 8446448461</p>
//       <p><strong>Address:</strong> 505, Shivcity Center, Vijaynagar, Sangli 416416</p>
//       <p className="text-sm mt-2">&copy; 2025 The Baker's Edge. All rights reserved.</p>
//     </footer>
//   );
// }

// // ---------------- App Content ----------------
// // Renamed from AppContent
// export default function App() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [showRegister, setShowRegister] = useState(false);

//   return (
//     <>
//       {/* ToastContainer moved here */}
//       <ToastContainer position="top-center" autoClose={3000} />

//       <PublicNavbar onLoginClick={() => setShowLogin(true)} onRegisterClick={() => setShowRegister(true)} />
//       <Hero onLoginClick={() => setShowLogin(true)} onRegisterClick={() => setShowRegister(true)} />
//       <Features />
//       <Support />
//       <CallToAction onRegisterClick={() => setShowRegister(true)} />
//       <Footer />

//       <AnimatePresence>
//         {showLogin && <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />}
//         {showRegister && <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />}
//       </AnimatePresence>
//     </>
//   );
// }

// // ---------------- Main App ----------------
// // REMOVED old App function with <Routes>

// App.js

import { FaWhatsapp, FaInstagram, FaSms, FaPhoneAlt } from 'react-icons/fa';
import React, { useState, useEffect } from "react";
// import { Routes, Route } from "react-router-dom"; // <-- REMOVED
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import LoginPage from "./components/LoginPage"; // <-- REMOVED
// import RegisterPage from "./components/CustomerForm"; // <-- REMOVED
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
// ⛔️ 'bootstrap/dist/css/bootstrap.min.css'; // <-- Was already removed
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // <-- REMOVED (handled in index.js)

// --- Lottie Animation URLs ---
const HERO_ANIMATION_URL = "https://lottie.host/266a3eaf-0535-4251-b138-ee87fd8670e1/HEWCx6n0M8.json";
const INVENTORY_ANIMATION_URL = "https://lottie.host/862918cb-9726-4f5d-957e-6d0660c56d21/HtDoQqvWwc.json";
const REPORTS_ANIMATION_URL = "https://lottie.host/1d4984b6-7432-4589-b3a4-29e2ebb6aa80/lLME8ltPqI.json";
const CUSTOMER_ANIMATION_URL = "https://lottie.host/f1060333-0a6b-4342-89cc-fbbfd9f59621/un46wPjDej.json";
const SUPPORT_ANIMATION_URL = "https://lottie.host/dcf0515a-e357-4c15-971e-92b7b3c64cd9/NCVCuCeior.json";

// ✅ Lottie Wrapper
function LottieWrapper({ url }) {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setAnimationData)
      .catch(err => console.error("Failed to load Lottie:", err));
  }, [url]);

  if (!animationData)
    return <div className="flex items-center justify-center h-40 text-gray-400 italic">Loading animation...</div>;

  return <Lottie animationData={animationData} loop autoplay />;
}

// ---------------- Navbar ----------------
function PublicNavbar({ onLoginClick, onRegisterClick }) {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-4 bg-gradient-to-r from-pink-100/80 to-yellow-100/80 backdrop-blur-md shadow-lg z-50">
      <h1 className="text-3xl font-bold text-pink-700 drop-shadow-md">🍰 The Baker's Edge</h1>
      <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
        <a href="/#hero" className="hover:text-pink-500 transition-colors">Home</a>
        <a href="/#features" className="hover:text-pink-500 transition-colors duration-300">Why Smart Bakers</a>
        <a href="/#support" className="hover:text-pink-500 transition-colors duration-300">Support</a>
      </div>
      <div className="flex space-x-3">
        <button onClick={onLoginClick} className="px-5 py-2 bg-white text-pink-600 border border-pink-600 rounded-lg hover:bg-pink-50 font-semibold transition duration-300 shadow-md hover:shadow-lg">Login</button>
        <button onClick={onRegisterClick} className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg hover:from-yellow-500 hover:to-yellow-600 font-semibold transition duration-300 shadow-md hover:shadow-lg">Register</button>
      </div>
    </nav>
  );
}

// ----------------- Hero Section -----------------
function Hero({ onLoginClick, onRegisterClick }) {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-24 pb-12 bg-pink-50">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-6xl font-extrabold text-pink-900 mb-6 leading-tight">
            The Baker's Edge: Go Digital 🚀
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-lg">
            Stop chasing paper trails. Automate sales, track custom orders, and master inventory so you can focus on mastering your recipes.
          </p>
          <div className="flex space-x-4">
            <button onClick={onRegisterClick} className="px-8 py-3 bg-yellow-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition">
              Get Started
            </button>
            <button onClick={onLoginClick} className="px-8 py-3 bg-white text-pink-700 text-lg font-semibold rounded-lg border border-gray-300 hover:bg-gray-100 transition">
              Login
            </button>
          </div>
        </motion.div>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7 }}>
          <LottieWrapper url={HERO_ANIMATION_URL} />
        </motion.div>
      </div>
    </section>
  );
}
// ---------------- Feature Cards ----------------
function FeatureCard({ animationUrl, title, description }) {
  return (
    <motion.div
      className="bg-white p-8 rounded-3xl shadow-2xl text-center flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-3xl"
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="w-48 h-40 mb-4">
        <LottieWrapper url={animationUrl} />
      </div>
      <h3 className="text-2xl font-bold text-pink-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function Features() {
  const items = [
    { title: "Recipe-Level Inventory", desc: "Instantly manage flour, butter, and yeast stock, track batch usage, and receive low-stock alerts before your next big order.", url: INVENTORY_ANIMATION_URL },
    { title: "Bake-Sheet Profit Analytics", desc: "See true profitability per item (e.g., Samosa vs. Black Forest Cake) and get daily reports on your hottest and coldest sellers.", url: REPORTS_ANIMATION_URL },
    { title: "Loyalty & Order History", desc: "Save customer flavor preferences, manage customized orders, and view every past purchase to fuel repeat business.", url: CUSTOMER_ANIMATION_URL },
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-yellow-50 via-pink-50 to-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-pink-900 drop-shadow-md">Why Smart Bakers Choose Our Platform 🌟</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {items.map((item, i) => <FeatureCard key={i} animationUrl={item.url} title={item.title} description={item.desc} />)}
        </div>
      </div>
    </section>
  );
}

// ---------------- Support Section ----------------
// function Support() {
//   return (
//     <section id="support" className="py-20 bg-gradient-to-r from-pink-50 to-yellow-50">
//       <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
//         <div>
//           <h2 className="text-4xl font-extrabold text-pink-900 mb-6 drop-shadow-md">Friendly Support When You Need a Hand 👋</h2>
//           <p className="text-lg text-gray-700 leading-relaxed">
//             Always There for You. Get quick help on any platform feature or sales issue.
//           </p>
//           <p className="text-lg text-gray-700 leading-relaxed mt-4">
//             You can also contact the owner directly at:
//             <a 
//               href="tel:+911234567890" 
//               className="font-bold text-pink-800 hover:underline ml-1"
//             >
//               +91 12345 67890
//             </a>
//           </p>
//         </div>
//         <div className="w-full max-w-md mx-auto"><LottieWrapper url={SUPPORT_ANIMATION_URL} /></div>
//       </div>
//     </section>
//   );
// }

function Support() {
  return (
    <section id="support" className="py-20 bg-gradient-to-r from-pink-50 to-yellow-50">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-extrabold text-pink-900 mb-6 drop-shadow-md">
            Friendly Support When You Need a Hand 👋
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Always There for You. Get quick help on any platform feature or sales issue.
          </p>

          {/* --- THIS IS THE NEW PART --- */}
          <p className="text-lg text-gray-700 leading-relaxed mt-6 font-semibold">
            Or reach out on your favorite platform:
          </p>
          
          <div className="flex items-center gap-6 md:gap-8 mt-4">
            {/* WhatsApp */}
            <a
              href="https://wa.me/911234567890" // <-- ADD YOUR NUMBER (with country code)
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-green-500 transform hover:scale-110 transition-all duration-300"
              aria-label="Chat on WhatsApp"
            >
              <FaWhatsapp className="text-4xl md:text-5xl" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/your_username" // <-- ADD YOUR USERNAME
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-pink-600 transform hover:scale-110 transition-all duration-300"
              aria-label="Follow on Instagram"
            >
              <FaInstagram className="text-4xl md:text-5xl" />
            </a>

            {/* SMS (Text Message) */}
            <a
              href="sms:+911234567890" // <-- ADD YOUR NUMBER (with country code)
              className="text-gray-700 hover:text-blue-500 transform hover:scale-110 transition-all duration-300"
              aria-label="Send a text message (SMS)"
            >
              <FaSms className="text-4xl md:text-5xl" />
            </a>

            {/* Phone Call */}
            <a
              href="tel:+911234567890" // <-- ADD YOUR NUMBER (with country code)
              className="text-gray-700 hover:text-pink-800 transform hover:scale-110 transition-all duration-300"
              aria-label="Call us"
            >
              <FaPhoneAlt className="text-4xl md:text-5xl" />
            </a>
          </div>
          {/* --- END OF NEW PART --- */}

        </div>
        <div className="w-full max-w-md mx-auto">
          <LottieWrapper url={SUPPORT_ANIMATION_URL} />
        </div>
      </div>
    </section>
  );
}

// ---------------- CTA Section ----------------
function CallToAction({ onRegisterClick }) {
  return (
    <section id="cta" className="py-20 bg-gradient-to-r from-pink-700 to-yellow-500 text-white text-center">
      <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Digitize Your Bakery Ledger Today</h2>
      <p className="text-xl text-pink-100 mb-8">Safe. Simple. Made for Indian Bakers.</p>
      <button onClick={onRegisterClick} className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xl font-bold rounded-xl shadow-2xl hover:from-yellow-500 hover:to-yellow-600 transition duration-300 transform hover:-translate-y-1 hover:scale-105">Get Started</button>
    </section>
  );
}

// ---------------- Footer ----------------
function Footer() {
  return (
    <footer className="py-10 bg-gray-900 text-gray-400 text-center">
      <p><strong>Website:</strong> www.varadanalyst.com | <strong>Phone:</strong> +91 8446448461</p>
      <p><strong>Address:</strong> 505, Shivcity Center, Vijaynagar, Sangli 416416</p>
      <p className="text-sm mt-2">&copy; 2025 The Baker's Edge. All rights reserved.</p>
    </footer>
  );
}

// ---------------- App Content ----------------
// Renamed from AppContent
export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      {/* ToastContainer moved here */}
      <ToastContainer position="top-center" autoClose={3000} />

      <PublicNavbar onLoginClick={() => setShowLogin(true)} onRegisterClick={() => setShowRegister(true)} />
      <Hero onLoginClick={() => setShowLogin(true)} onRegisterClick={() => setShowRegister(true)} />
      <Features />
      <Support />
      <CallToAction onRegisterClick={() => setShowRegister(true)} />
      <Footer />

      <AnimatePresence>
        {showLogin && <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />}
        {showRegister && <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />}
      </AnimatePresence>
    </>
  );
}

// ---------------- Main App ----------------
// REMOVED old App function with <Routes>