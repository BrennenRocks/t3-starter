import React from 'react';
import Navbar from '../Navbar';

export interface MainProps {
  includeNavbar?: boolean;
  children: React.ReactNode;
}

const Main = ({ includeNavbar = true, children }: MainProps) => {
  return (
    <>
      {includeNavbar && <Navbar />}
      <main className="min-h-screen bg-base-100">{children}</main>
    </>
  );
};

export default Main;
