import React from 'react';
import Navbar from './Navbar';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
