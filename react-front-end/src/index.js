import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.scss';
import App from './components/App';
import Events from './components/events/events';
import Fundraisers from './components/events/fundraisers';
import ProgressBar from 'react-bootstrap/esm/ProgressBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<>
    <App />
    <Events />
</>
);

