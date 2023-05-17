import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.scss';
import App from './components/App';
import FriendProvider from 'providers/FriendProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<FriendProvider>
    <App />
</FriendProvider>
);

