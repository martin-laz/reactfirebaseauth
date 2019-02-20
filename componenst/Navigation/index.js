import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';



const Navigation= ( props ) => {
  const links = props.links;
  const listItems =links.map((link) =>
      <li key={link.to}>
        <a href={link.to}>{link.label}</a>
      </li>
    )
  return (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <ul>
            {listItems}
            {authUser.roles.includes(ROLES.ADMIN) && (
              <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
              </li>
            )}
            {authUser && (
            <li>
              <SignOutButton />
            </li>)}
          </ul>
          ):(
            <ul>
              <Navigation/>
            </ul>
          )
      }
    </AuthUserContext.Consumer>
  );
}


export default Navigation;
