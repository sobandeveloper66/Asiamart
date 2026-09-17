import React, { useState } from 'react';
import { FiMail, FiMessageSquare, FiPhone } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function CustomerService() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      toast.success("Message sent! Our support team will get back to you shortly.", {
        style: { background: '#161616', color: '#fff', border: '1px solid #222' }
      });
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Customer Service</h1>
        <p className="text-zinc-400 text-lg">
          Need help with an order, or have a question about a product? We're here to assist you 24/7.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Contact Info */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Get in Touch</h2>
          
          <div className="flex items-center gap-4 bg-[#161616] border border-[#222] p-5 rounded-xl">
            <div className="bg-brand-red/10 p-4 rounded-full text-brand-red">
              <FiPhone size={24} />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-medium">Call Us (Toll-Free)</p>
              <p className="text-white text-lg font-semibold">1800-ASIA-MART</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#161616] border border-[#222] p-5 rounded-xl">
            <div className="bg-brand-red/10 p-4 rounded-full text-brand-red">
              <FiMail size={24} />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-medium">Email Support</p>
              <p className="text-white text-lg font-semibold">support@asiamart.in</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#161616] border border-[#222] p-5 rounded-xl">
            <div className="bg-brand-red/10 p-4 rounded-full text-brand-red">
              <FiMessageSquare size={24} />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-medium">Live Chat</p>
              <p className="text-white text-lg font-semibold">Available via the AI widget</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#161616] border border-[#222] rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#0b0b0b] text-white rounded-lg border border-[#333] px-4 py-2.5 focus:outline-none focus:border-brand-red transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-[#0b0b0b] text-white rounded-lg border border-[#333] px-4 py-2.5 focus:outline-none focus:border-brand-red transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-[#0b0b0b] text-white rounded-lg border border-[#333] px-4 py-2.5 focus:outline-none focus:border-brand-red transition-colors resize-none"
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-red hover:bg-brand-red-hover text-white font-semibold py-3 rounded-lg transition-colors mt-2"
            >
              Submit Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
