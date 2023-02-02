import React from 'react';

import ToastPlayground from '../ToastPlayground';
import Footer from '../Footer';
import ToastProvider from '../ToastProvider/ToastProvider';
import ToastShelf from '../ToastShelf/ToastShelf';

function App() {
  return (
    <ToastProvider>
      <ToastPlayground />
      <ToastShelf />
      <Footer />
    </ToastProvider>
  );
}

export default App;
