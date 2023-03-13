import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './config/firebase.config'
import axios from 'axios';

axios.defaults.baseURL = 'https://us-east1-journeymap-a8e65.cloudfunctions.net/app/';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);