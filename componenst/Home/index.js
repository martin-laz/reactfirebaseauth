import React from 'react';
import Navigation from '../Navigation';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
const NavLinks = [
  {label: 'Account', to: ROUTES.ACCOUNT},
]
const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <Navigation links={NavLinks}/>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
