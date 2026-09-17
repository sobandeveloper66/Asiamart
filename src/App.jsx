import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import DeliveryInfo from './pages/DeliveryInfo';
import CustomerService from './pages/CustomerService';
import TermsOfService from './pages/TermsOfService';
import AuthCallback from './pages/AuthCallback';

import { useCart } from './context/CartContext';
import AuthModal from './components/AuthModal';
import AIChatWidget from './components/AIChatWidget';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

// Main layout wrapper to conditionally hide Navbar/Footer on Checkout page
function AppContent() {
  const location = useLocation();
  const isCheckout = location.pathname.toLowerCase() === '/checkout';
  const { isAuthModalOpen, setIsAuthModalOpen } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg overflow-x-hidden">
      {/* Show full navbar on all pages except checkout */}
      {!isCheckout && <Navbar />}
      
      {/* Main Content Area */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/category/:country" element={<PageWrapper><Category /></PageWrapper>} />
            <Route path="/product/:id" element={<PageWrapper><ProductDetails /></PageWrapper>} />
            <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
            <Route path="/orders" element={<PageWrapper><Orders /></PageWrapper>} />
            <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
            <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
            <Route path="/delivery-info" element={<PageWrapper><DeliveryInfo /></PageWrapper>} />
            <Route path="/customer-service" element={<PageWrapper><CustomerService /></PageWrapper>} />
            <Route path="/terms-of-service" element={<PageWrapper><TermsOfService /></PageWrapper>} />
            <Route path="/auth/callback" element={<PageWrapper><AuthCallback /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Show footer on all pages */}
      <Footer />

      {/* Floating AI Chat Widget */}
      <AIChatWidget />

      {/* Global Auth Modal Popup (Rendered outside header sticky context to prevent backdrop-blur positioning bugs) */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AppContent />
    </>
  );
}
