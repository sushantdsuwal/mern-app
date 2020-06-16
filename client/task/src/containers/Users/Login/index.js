import React, { Component } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userLoginRequest } from '../../../store/actions/usersActions';
import InputField from '../../../components/InputField';

const FIELDS = [
  { name: 'username', type: 'text', label: 'Username' },
  { name: 'password', type: 'password', label: 'Password' },
];

const Login = (props) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  const [state, setState] = React.useState({
    userCredentials: {},
    errors: {},
  });

  const handleValidation = (field, value) => {
    let error = {};
    if (value === '') {
      error[field] = 'This field is required';
    } else {
      error[field] = '';
    }
    return error;
  };

  const handleInputChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    const errors = {
      ...state.errors,
      ...handleValidation(field, value),
    };
    if (errors.invalidCredentials) {
      delete errors.invalidCredentials;
    }

    setState((prevState) => {
      return {
        ...prevState,
        userCredentials: {
          ...prevState.userCredentials,
          [field]: value,
        },
        errors: { ...errors },
      };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let errors = { ...state.errors };
    const userCredentialsValid =
      Object.keys(errors).filter((field) => errors[field] !== '').length === 0
        ? true
        : false;
    if (!userCredentialsValid) {
      return;
    } else {
      dispatch(userLoginRequest(state.userCredentials)).then((res) => {
        if (res.errors) {
          setState((prevState) => {
            return {
              ...prevState,
              userCredentials: { ...prevState.userCredentials },
              errors: { ...prevState.errors, ...res.errors },
            };
          });
        } else {
          props.history.push('/');
        }
      });
    }
  };

  const inputFields = FIELDS.map((field) => (
    <InputField
      key={field.name}
      type={field.type}
      name={field.name}
      label={field.label}
      errors={state.errors}
      onChange={handleInputChange}
    />
  ));

  return isAuthenticated ? (
    <Redirect to='/' />
  ) : (
    <div className='container'>
      <br />
      <h3 className='text-center'>Login</h3>
      <div className='jumbotron'>
        {state.errors.invalidCredentials && (
          <p className='text-danger'>{state.errors.invalidCredentials}</p>
        )}
        <form onSubmit={handleLogin}>
          {inputFields}
          <button className='btn btn-primary'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
