import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ScrollToTop from './app/layout/ScrollToTop';
import { store, StoreContext } from './app/stores/store';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import { createBrowserHistory } from 'history';
import './index.scss';

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StoreContext.Provider value={store}>
  <HistoryRouter history={history}>
    <ScrollToTop />
    <App />
  </HistoryRouter>
</StoreContext.Provider>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
