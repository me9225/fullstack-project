import React from 'react';
import ReactDOM from 'react-dom/client';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import'primereact/resources/themes/mira/theme.css'
import './index.css';
import './flags.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';
import { PrimeReactProvider } from 'primereact/api';
import { Provider } from "react-redux";
// import { store } from "./Store/store";
import { configureStore } from '@reduxjs/toolkit';
import msgSlice from './Store/Slices/msgSlice';

const store = configureStore({
    reducer:{
      msgSlice
    }
  })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    <Provider store={store}>
    <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
