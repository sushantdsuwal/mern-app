import React, { Component, useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { submitNewArticle } from '../../../store/actions/articlesActions';
import ErrorMsg from '../../../components/ErrorMsg';
import InputField from '../../../components/InputField';

const FIELDS = [
  { name: 'title', type: 'text', label: 'Title' },
  { name: 'author', type: 'text', label: 'Author', disabled: 'disabled' },
];

const AddArticle = (props) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const authenticatedUsername = useSelector(
    (state) => state.users.authenticatedUsername
  );

  const [state, setState] = useState({
    article: {},
    errors: {},
  });

  useEffect(() => {
    if (localStorage.getItem('AddArticlePage') !== null) {
      const { article, errors } = JSON.parse(
        localStorage.getItem('AddArticlePage')
      );
      setState((prevState) => {
        return {
          ...prevState,
          article: { ...article },
          errors: { ...errors },
        };
      });
    }
    return () => {
      localStorage.removeItem('AddArticlePage');
    };
  }, []);

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

    setState(
      (prevState) => {
        return {
          ...prevState,
          article: {
            ...prevState.article,
            [field]: value,
          },
          errors: { ...errors },
        };
      },
      () => localStorage.setItem('AddArticlePage', JSON.stringify(state))
    );
  };

  const handleNewArticleSubmit = (e) => {
    e.preventDefault();
    let errors = { ...state.errors };
    const formValuesValid =
      Object.keys(errors).filter((field) => errors[field] !== '').length === 0
        ? true
        : false;
    if (!formValuesValid) {
      return;
    } else {
      dispatch(
        submitNewArticle({
          ...state.article,
          author: props.authenticatedUsername,
        })
      ).then((res) => {
        if (res.errors) {
          setState((prevState) => {
            return {
              ...prevState,
              article: { ...prevState.article },
              errors: { ...prevState.errors, ...res.errors },
            };
          });
        } else {
          props.history.push('/');
        }
      });
    }
  };

  return !props.isAuthenticated ? (
    <Redirect to='/login' />
  ) : (
    <div className='container'>
      <br />
      <h3 className='text-center'>Add Article</h3>
      <div className='jumbotron'>
        <form onSubmit={handleNewArticleSubmit}>
          <InputField
            key={FIELDS[0].name}
            type={FIELDS[0].type}
            name={FIELDS[0].name}
            label={FIELDS[0].label}
            defaultValue={state.article.title}
            errors={state.errors}
            onChange={handleInputChange}
          />
          <InputField
            key={FIELDS[1].name}
            type={FIELDS[1].type}
            name={FIELDS[1].name}
            label={FIELDS[1].label}
            defaultValue={props.authenticatedUsername}
            disabled={FIELDS[1].disabled}
            errors={state.errors}
            onChange={handleInputChange}
          />
          <div className='form-group'>
            <label>Body</label>
            <textarea
              name='body'
              style={{ height: '200px' }}
              className='form-control'
              placeholder="Your article's contents goes here... Good luck!"
              onChange={handleInputChange}
              defaultValue={state.article.body}
            />
            {state.errors.body !== '' && <ErrorMsg msg={state.errors.body} />}
          </div>
          <button className='btn btn-success'>Submit</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.users.isAuthenticated,
    authenticatedUsername: state.users.authenticatedUsername,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewArticle: (articleData) => dispatch(submitNewArticle(articleData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);
