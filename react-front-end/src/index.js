import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.scss';
import App from './components/App';
import FriendProvider from 'providers/FriendProvider';
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FriendProvider>
    <Router>
      <App />
    </Router>
  </FriendProvider>
);

