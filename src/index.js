import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './style.css';
import App from './components/App';
import WebFont from 'webfontloader';
import { BrowserRouter as Router } from 'react-router-dom';

WebFont.load({
	google: {
		families: ['Titillium Web:300,400,700', 'sans-serif'],
	},
});
ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);
