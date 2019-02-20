import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';


import LandingPage from '../Landing';


import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (


      <Router>
        <div>


          <Route exact path={ROUTES.LANDING} component={LandingPage} />

          
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route exact path={ROUTES.ADMIN} component={AdminPage} />
        </div>
      </Router>

    );


export default withAuthentication(App);
