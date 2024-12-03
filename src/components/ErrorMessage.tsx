import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="text-center text-[#E94560] mb-8 p-4 bg-[#E94560]/10 rounded-lg border border-[#E94560]/20">
    {message}
  </div>
);