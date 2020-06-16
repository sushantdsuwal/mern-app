import React, { Component } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveArticle } from '../../../store/actions/articlesActions';
import ErrorMsg from '../../../components/ErrorMsg';
import InputField from '../../../components/InputField';

const FIELDS = [
  { name: 'title', type: 'text', label: 'Title' },
  { name: 'author', type: 'text', label: 'Author', disabled: 'disabled' },
];

const EditArticle = (props) => {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.articles.article);
  const [state, setState] = React.useState({
    article: {},
    errors: {},
  });

  React.useEffect(() => {
    const articleId = props.match.params.id;
    let editArticle, errors;
    if (localStorage.getItem('Edit' + articleId) === null) {
      localStorage.setItem(
        'Edit' + articleId,
        JSON.stringify({ article: article, errors: {} })
      );
      editArticle = article;
      errors = {};
    } else {
      editArticle = JSON.parse(localStorage.getItem('Edit' + articleId))
        .article;
      errors = JSON.parse(localStorage.getItem('Edit' + articleId)).errors;
    }

    setState((prevState) => {
      return {
        ...prevState,
        article: { ...article },
        errors: { ...errors },
      };
    });
    return () => {
      localStorage.removeItem('Edit' + props.match.params.id);
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
      () =>
        localStorage.setItem('Edit' + state.article._id, JSON.stringify(state))
    );
  };

  const handleEditArticleSubmit = (e) => {
    e.preventDefault();
    let errors = { ...state.errors };
    const formValuesValid =
      Object.keys(errors).filter((field) => errors[field] !== '').length === 0
        ? true
        : false;
    if (!formValuesValid) {
      return;
    } else {
      dispatch(saveArticle(props.match.params.id, state.article)).then(
        (res) => {
          if (res.errors) {
            setState((prevState) => {
              return {
                ...prevState,
                article: { ...prevState.article },
                errors: { ...prevState.errors, ...res.errors },
              };
            });
          } else {
            localStorage.removeItem('Edit' + props.match.params.id);
            props.history.push('/articles/' + props.match.params.id);
          }
        }
      );
    }
  };

  const inputFields = FIELDS.map((field) => (
    <InputField
      key={field.name}
      type={field.type}
      name={field.name}
      label={field.label}
      defaultValue={state.article[field.name]}
      disabled={field.disabled}
      errors={state.errors}
      onChange={handleInputChange}
    />
  ));

  return (
    <div className='container'>
      <br />
      <h3 className='text-center'>Edit Article</h3>
      <div className='jumbotron'>
        <form onSubmit={handleEditArticleSubmit}>
          {inputFields}
          <div className='form-group'>
            <label>Body</label>
            <textarea
              name='body'
              style={{ height: '200px' }}
              className='form-control'
              onChange={handleInputChange}
              defaultValue={state.article.body}
            />
            {state.errors.body !== '' && <ErrorMsg msg={state.errors.body} />}
          </div>
          <button className='btn btn-success'>Save</button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(EditArticle);
