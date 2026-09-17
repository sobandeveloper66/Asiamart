import React from 'react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>
      
      <div className="prose prose-invert prose-zinc max-w-none space-y-8 text-zinc-400">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using AsiaMart ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. 
            In addition, when using this Website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">2. Product Authenticity and Descriptions</h2>
          <p>
            We guarantee that all products sold on AsiaMart are 100% authentic and sourced directly from their respective countries of origin (Japan, South Korea, China, etc.). 
            We attempt to be as accurate as possible with product descriptions and images. However, we do not warrant that product descriptions or other content of this site is completely error-free.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">3. Pricing and Payments</h2>
          <p>
            All prices displayed on the Website are in Indian Rupees (INR) and are inclusive of all applicable taxes and import duties. 
            The price you see is the final price. We reserve the right to modify prices without prior notice due to fluctuations in currency exchange rates or shipping costs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">4. Shipping and Returns</h2>
          <p>
            Food items and perishables are generally non-returnable due to health and safety regulations, unless the item arrived damaged or the wrong item was shipped.
            In such cases, please contact our Customer Service within 48 hours of delivery with photographic evidence.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">5. Privacy Policy</h2>
          <p>
            Your privacy is important to us. We collect, process, and protect your personal data in accordance with our strict privacy guidelines and the Information Technology Act, 2000 of India.
            We do not sell your personal information to third parties.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-[#222] text-sm">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
