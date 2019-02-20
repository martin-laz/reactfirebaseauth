import React, { Component } from 'react';
import {SignInForm} from '../SignIn';
import {SignUpForm} from '../SignUp'
import {PasswordForgetForm} from '../PasswordForget'

import {
  MDBModalFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody
} from "mdbreact";

const LoginLink = [
  {name: "Register", text:"Don't have an acount?"},
  {name: "PasswordForget", text: "Forgot password?"}
];

class LandingPage extends Component {
    constructor(props) {
      super(props);

      this.state = {view: <SignInForm/>, links: LoginLink};
    }
    onClick = event => {
      if (event.target.name=== 'Login')
        this.setState({view: <SignInForm/>, links: LoginLink });
      if (event.target.name === 'Register')
        this.setState({view: <SignUpForm/>, links:[{name:'Login', text:'Already have an accoount? Login instead.'}]});
      if (event.target.name=== 'PasswordForget')
        this.setState({view: <PasswordForgetForm/>, links:[{name:"Login", text: 'Try to Login'}]});
    }

    render() {
      const view = this.state.view;
      const links = this.state.links;
      return (
        <MDBContainer>
        <MDBRow>
          <MDBCol md="6 offset-md-3">
            <MDBCard>

              {view}
                  <MDBModalFooter>

                      {links.map(link =>(
                        <a key={link.name} name={link.name} href='#' onClick={this.onClick}>{link.text}</a>
                      ))}


                  </MDBModalFooter>

            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      );
    }
}
export default LandingPage;
