import React from 'react';
import 'tailwindcss/tailwind.css';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src="/404.jpeg" alt="404 Error" className="w-1/2 mt-10" />
      <h1 className="text-4xl font-bold text-red-500 mt-5">PAGE NOT FOUND!</h1>
      <a href="/home" className="text-blue-500 mt-3">Voltar</a>
    </div>
  );
};

export default Error;
