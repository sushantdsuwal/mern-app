import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { userLogoutRequest } from '../../store/actions/usersActions';

const NavigationBar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const authenticatedUsername = useSelector(
    (state) => state.users.authenticatedUsername
  );

  const userLinks = (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item mr-2 mt-2'>Hello, {authenticatedUsername}</li>
      <li className='nav-item'>
        <a
          className='btn btn-outline-primary'
          onClick={() => dispatch(userLogoutRequest())}
        >
          Logout
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item mr-2'>
        <NavLink to='/login' className='btn btn-outline-primary'>
          Login
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink to='/signup' className='btn btn-primary'>
          Signup
        </NavLink>
      </li>
    </ul>
  );

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <h1 className='navbar-brand'>MERN APPICATION</h1>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#myNavBar'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='myNavBar'>
        {isAuthenticated ? userLinks : guestLinks}
      </div>
    </nav>
  );
};

export default NavigationBar;
