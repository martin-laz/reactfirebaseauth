import React from 'react';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext, withAuthorization } from '../Session';
import Navigation from '../Navigation';
import PasswordChangeForm from '../PasswordChange';
const NavLinks = [
  {label: 'Home', to: ROUTES.HOME}
]
const AccountPage = () => (
  <AuthUserContext.Consumer>

    {authUser => (
      <div>
        <Navigation links={NavLinks} auth={authUser}/>
        <h1>Account: {authUser.email}</h1>

        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
