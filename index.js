import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './componenst/App';
import * as serviceWorker from './serviceWorker';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import Firebase,  { FirebaseContext } from './componenst/Firebase';

ReactDOM.render(<FirebaseContext.Provider value={new Firebase()}><App /> </FirebaseContext.Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
