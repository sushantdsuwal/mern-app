import React, { Component, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  getArticle,
  deleteArticle,
} from '../../../store/actions/articlesActions';
import { WrappedLink } from '../../../components/';
import './DetailArticle.css';

const DetailArticle = (props) => {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.articles.article);
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const authenticatedUsername = useSelector(
    (state) => state.users.authenticatedUsername
  );

  useEffect(() => {
    getSingleArticle();
  }, []);

  const getSingleArticle = () => {
    if (props.match.params.id) {
      if (!article || article._id !== +props.match.params.id) {
        dispatch(getArticle(props.match.params.id));
      }
    }
  };

  const handleEditArticleClick = () => {
    props.history.replace({
      pathname: '/article/edit/' + props.match.params.id,
    });
  };

  const handleDeleteArticleClick = () => {
    alert('deleting your article...');
    dispatch(deleteArticle(props.match.params.id)).then((res) => {
      if (res.success) {
        props.history.push('/');
      }
    });
  };

  return (
    <div className='container'>
      <br />
      <div className='jumbotron DetailArticle'>
        <h3 className='text-center'>{article.title}</h3>
        <h5 className='text-right'>- By {article.author}</h5>
        <p>{article.body}</p>
        {isAuthenticated && authenticatedUsername === article.author && (
          <button
            className='btn btn-danger'
            style={{ float: 'right', padding: '6px 12px' }}
            onClick={() => handleDeleteArticleClick()}
          >
            Delete
          </button>
        )}
        {isAuthenticated && authenticatedUsername === article.author && (
          <WrappedLink
            to={'/article/edit/' + props.match.params.id}
            buttonClasses={['btn', 'btn-info', 'mr-2']}
            click={() => handleEditArticleClick()}
          >
            Edit
          </WrappedLink>
        )}
      </div>
    </div>
  );
};

export default DetailArticle;
