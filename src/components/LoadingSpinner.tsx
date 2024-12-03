import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-64">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-2 border-[#E94560] border-t-transparent animate-spin"></div>
      <div className="w-12 h-12 rounded-full border-2 border-[#0F3460] border-b-transparent animate-spin absolute top-0 left-0 animation-delay-150"></div>
    </div>
  </div>
);