import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as Sentry from '@sentry/browser';

Sentry.init({dsn: process.env.SENTRY_URL});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
