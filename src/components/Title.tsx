import React from 'react';

interface TitleProps {
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <h1 className="text-3xl font-bold text-center my-6 text-blue-600">
      {children}
    </h1>
  );
};

export default Title; 