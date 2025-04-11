import React from 'react';
import { FaPhone, FaEnvelope, FaQuestionCircle, FaExclamationTriangle } from 'react-icons/fa';

const CancellationPolicy = () => {
  return (
    <div className="bg-[#1A1A1A] text-[#AAAAAA] p-6 rounded-lg border border-[#626262] max-w-4xl mx-auto my-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#FFD700] flex items-center">
        <FaExclamationTriangle className="mr-3" /> Cancellation/Deposit Policy
      </h2>
      
      <div className="space-y-6">
        {/* Deposit Policy */}
        <div className="border-l-4 border-[#FFD700] pl-4">
          <h3 className="text-xl font-semibold text-white mb-2">Deposit Policy</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>All bookings over $300 require a <span className="text-[#FFE657]">50% deposit</span> at time of reservation</li>
            <li>Your trip is not confirmed until deposit is received</li>
          </ul>
        </div>

        {/* Cancellation Policy */}
        <div className="border-l-4 border-[#FFD700] pl-4">
          <h3 className="text-xl font-semibold text-white mb-2">Cancellation Policy</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="text-[#FFE657]">48+ hours before:</span> Full deposit refund
            </li>
            <li>
              <span className="text-[#FFE657]">Within 48 hours:</span> Deposit non-refundable
            </li>
            <li>
              <span className="text-[#FFE657]">Within 2 hours:</span> Full trip charge applies
            </li>
          </ul>
        </div>

        {/* No-Show Policy */}
        <div className="border-l-4 border-[#FFD700] pl-4">
          <h3 className="text-xl font-semibold text-white mb-2">No-Show Policy</h3>
          <p className="pl-1">
            A "No-Show" will incur a <span className="text-[#FFE657]">100% charge</span> of the estimated trip cost.
          </p>
        </div>

        {/* Important Notes */}
        <div className="bg-[#262626] p-4 rounded-lg border border-[#626262]">
          <h3 className="text-lg font-semibold text-[#FFD700] mb-2">Important Notes</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Rates subject to change without notice</li>
            <li>Additional charges (fuel, cleaning, etc.) are non-refundable</li>
            <li>Holiday bookings may have different cancellation terms</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="pt-4">
          <h3 className="text-xl font-semibold text-white mb-3">Need Assistance?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/faq" className="flex items-center text-[#AAAAAA] hover:text-[#FFD700] transition">
              <FaQuestionCircle className="mr-2" /> FAQ Page
            </a>
            <a href="mailto:info@yourlimoservice.com" className="flex items-center text-[#AAAAAA] hover:text-[#FFD700] transition">
              <FaEnvelope className="mr-2" /> Email Us
            </a>
            <a href="tel:+18884129150" className="flex items-center text-[#AAAAAA] hover:text-[#FFD700] transition">
              <FaPhone className="mr-2" /> (888) 412-9150
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;