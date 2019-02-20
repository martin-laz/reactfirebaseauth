import React, { Component } from 'react';


import { withFirebase } from '../Firebase';

import {
  MDBIcon,
  MDBCardHeader,
  MDBCardBody,
  MDBBtn,
  MDBInput
} from "mdbreact";



const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <MDBCardBody>
        <MDBCardHeader className="form-header deep-blue-gradient rounded">
          <h3 className="my-3">
            <MDBIcon icon="fa-edit" /> Change Password
          </h3>
        </MDBCardHeader>
        <form onSubmit={this.onSubmit}>
          <div className="grey-text">
            <MDBInput
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              label="Email Address"
              icon="envelope"
              group
              type="text"
              validate
              error="wrong"
              success="right"
            />

          </div>
          <div className="text-center">
            <MDBBtn disabled={isInvalid} type="submit" color="primary">Reset My Password</MDBBtn>
            <div className="font-weight-light">

            {error && <p>{error.message}</p>}
            </div>
          </div>
        </form>
      </MDBCardBody>
    );
  }
}





const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm };
