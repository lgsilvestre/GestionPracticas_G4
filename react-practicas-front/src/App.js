import React from 'react';
import { AppRouter } from './components/routers/AppRouter';
import './components/routers/AppRouterStyle.css';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));

function App() {
  return (
    <div >
      <AppRouter/>
    </div>
  );
}

export default App;
