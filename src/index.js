import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';

Sentry.init({dsn: process.env.SENTRY_URL});
ReactGA.initialize('UA-149863250-1', {debug: process.env.NODE_ENV === 'development'});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
