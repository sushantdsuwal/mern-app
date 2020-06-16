import React, { Component, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  checkUserUniqueness,
  userSignupRequest,
} from '../../../store/actions/usersActions';
import InputField from '../../../components/InputField';

// Check if E-mail is Valid or not
const validateEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const FIELDS = [
  { name: 'name', type: 'text', label: 'Name' },
  { name: 'username', type: 'text', label: 'Username' },
  { name: 'email', type: 'email', label: 'E-mail Address' },
  { name: 'password', type: 'password', label: 'Password' },
  { name: 'confirmPassword', type: 'password', label: 'Confirm Password' },
];

const Signup = (props) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  const [state, setState] = useState({ userDetails: {}, errors: {} });

  React.useEffect(() => {
    if (localStorage.getItem('SignupPage') !== null) {
      const { userDetails, errors } = JSON.parse(
        localStorage.getItem('SignupPage')
      );
      setState((prevState) => {
        return {
          ...prevState,
          userDetails: { ...userDetails },
          errors: { ...errors },
        };
      });
    }
    return () => {};
  }, []);

  const commonValidation = (field, value) => {
    let error = {};
    if (value === '') {
      error[field] = 'This field is required';
    } else {
      if (field === 'email' && !validateEmail(value)) {
        error[field] = 'Not a valid Email';
      } else if (field === 'password' && value.length < 4) {
        error[field] = 'Password too short';
        if (
          state.errors['confirmPassword'] !== '' &&
          value === state.userDetails.confirmPassword
        ) {
          error['confirmPassword'] = '';
        }
      } else if (
        field === 'confirmPassword' &&
        value !== state.userDetails.password
      ) {
        error[field] = 'Passwords do not match';
      } else {
        error[field] = '';
      }
    }
    return error;
  };

  const userUniqueness = async ({ field, value }) => {
    const uniquenessError = await dispatch(
      checkUserUniqueness({ field, value })
    )
      .then((res) => res.json())
      .then((res) => {
        let result = {};
        if (res.error) {
          result = res.error;
        } else {
          result[field] = '';
        }
        return result;
      });
    return uniquenessError;
  };

  const handleInputChange = async (e) => {
    const field = e.target.name;
    const value = e.target.value;
    let errors = { ...state.errors };

    const commonValidationError = await commonValidation(field, value);
    let uniquenessError = {};
    if ((field === 'username' || field === 'email') && value !== '') {
      uniquenessError = await userUniqueness({ field, value });
      errors = {
        ...errors,
        [field]: commonValidationError[field] || uniquenessError[field],
      };
    } else {
      errors = { ...errors, ...commonValidationError };
    }

    setState(
      (prevState) => {
        return {
          ...prevState,
          userDetails: {
            ...prevState.userDetails,
            [field]: value,
          },
          errors: { ...errors },
        };
      },
      () => localStorage.setItem('SignupPage', JSON.stringify(state))
    );
  };

  const handleSignup = (e) => {
    e.preventDefault();
    let errors = { ...state.errors };
    const userDetailsValid =
      Object.keys(errors).filter((field) => errors[field] !== '').length === 0
        ? true
        : false;
    if (!userDetailsValid) {
      return;
    } else {
      dispatch(userSignupRequest(state.userDetails))
        .then((res) => res.json())
        .then((res) => {
          if (res.errors) {
            errors = { ...errors, ...res.errors };
            setState((prevState) => {
              return {
                ...prevState,
                userDetails: { ...prevState.userDetails },
                errors: { ...errors },
              };
            });
          } else {
            localStorage.removeItem('SignupPage');
            props.history.push('/login');
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
      defaultValue={state.userDetails[field.name]}
      errors={state.errors}
      onChange={handleInputChange}
    />
  ));

  return isAuthenticated ? (
    <Redirect to='/' />
  ) : (
    <div className='container'>
      <br />
      <h3 className='text-center'>Join Our Community!</h3>
      <div className='jumbotron'>
        <form onSubmit={handleSignup}>
          {inputFields}
          <button className='btn btn-primary'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
