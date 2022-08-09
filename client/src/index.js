
/*Add mdbootstrap and fontAwesome  */

import '@fortawesome/fontawesome-free/css/all.css';

import 'mdbootstrap/css/bootstrap.css';
import 'mdbootstrap/css/mdb.css';


import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
     
       <App />
       
   </Provider>
  </React.StrictMode>
);


reportWebVitals()