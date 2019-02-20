import React, { Component } from 'react';
import {  withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import {

  MDBCardBody,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";


const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  role: 'User',
  error: null,
};


class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, role } = this.state;
    const roles = [];

    if (this.state.role === 'User' ) {
      roles.push(ROLES.USER);
    }
    if (this.state.role === 'Artist' ) {
      roles.push(ROLES.ARTIST);
    }
    if (this.state.role === 'Venue' ) {
      roles.push(ROLES.VENUE);
    }
    if (this.state.role === 'Admin' ) {
      roles.push(ROLES.ADMIN);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            roles,
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();

  }

  onChange = event => {
   this.setState({ [event.target.name]: event.target.value });

};

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      role,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' || username.length > 20;
    return (

          <MDBCardBody>
            <MDBCardHeader className="form-header deep-blue-gradient rounded">
              <h3 className="my-3">
                <MDBIcon icon="fa fa-pencil" /> Register:
              </h3>
            </MDBCardHeader>
              <form onSubmit={this.onSubmit}>

                <div className="grey-text">
                  <MDBInput
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  label="Your password"
                  icon="lock"
                  group
                  type="password"
                  validate
                  />
                  <MDBInput
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    label="Confirm your password"
                    icon="exclamation-triangle"
                    group

                    type="password"
                    validate
                    error="wrong"
                    success="right"
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" for="inputGroupSelect01">Register as:</label>
                  </div>
                  <select className="custom-select" id="inputGroupSelect01" onChange = {this.onChange} name='role'>
                    <option value="User">Regular User</option>
                    <option value="Artist">Artist</option>
                    <option value="Venue">Venue</option>
                    <option value="Admin">Admin</option>

                  </select>
                </div>
                <div className="text-center">
                  <MDBBtn disabled={isInvalid} type="submit" color="primary">Register</MDBBtn>
                  <div className="font-weight-light">

                  {error && <p>{error.message}</p>}
                  </div>
                </div>
              </form>

              </MDBCardBody>

    );
  }
}


const SignUpForm = compose(withRouter, withFirebase,)(SignUpFormBase);


export { SignUpForm };
