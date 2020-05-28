import React from 'react';
import ReactGA from 'react-ga';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
const isProduction = process.env.NODE_ENV === 'production';
console.log('[Logger] Production env enabled: ', isProduction, process.env);
ReactGA.initialize('UA-47345139-1', { debug: !isProduction});
ReactGA.pageview(window.location.pathname + window.location.search);


ReactDOM.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
