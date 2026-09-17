import React from 'react';
import { FiTruck, FiBox, FiClock, FiShield } from 'react-icons/fi';

export default function DeliveryInfo() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">India Delivery Info</h1>
      <p className="text-zinc-400 text-lg mb-12">
        We specialize in importing premium authentic goods from across Asia and delivering them directly to your doorstep anywhere in India.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-[#161616] border border-[#222] rounded-2xl p-6 flex items-start gap-4">
          <div className="bg-brand-red/10 p-3 rounded-xl text-brand-red shrink-0">
            <FiTruck size={24} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-2">Shipping Methods & Times</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              <strong>Standard Delivery:</strong> 5-7 business days across major Indian metros. <br/>
              <strong>Express Delivery:</strong> 2-3 business days (Available in Tier 1 cities).
            </p>
          </div>
        </div>

        <div className="bg-[#161616] border border-[#222] rounded-2xl p-6 flex items-start gap-4">
          <div className="bg-brand-red/10 p-3 rounded-xl text-brand-red shrink-0">
            <FiBox size={24} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-2">Packaging</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              All fragile items, especially glass jars and ceramics from Japan and Korea, are packed using custom shock-absorbing materials to ensure safe transit.
            </p>
          </div>
        </div>

        <div className="bg-[#161616] border border-[#222] rounded-2xl p-6 flex items-start gap-4">
          <div className="bg-brand-red/10 p-3 rounded-xl text-brand-red shrink-0">
            <FiShield size={24} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-2">Customs & Duties</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              The price you see is the price you pay. All customs duties and import taxes are entirely pre-paid by AsiaMart.
            </p>
          </div>
        </div>

        <div className="bg-[#161616] border border-[#222] rounded-2xl p-6 flex items-start gap-4">
          <div className="bg-brand-red/10 p-3 rounded-xl text-brand-red shrink-0">
            <FiClock size={24} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-2">Order Tracking</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Once your order is dispatched from our central hub in Mumbai, you will receive a Live Tracking link via email and SMS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
