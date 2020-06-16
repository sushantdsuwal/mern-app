import React, { Component, useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  getAllArticles,
  getMyArticles,
} from '../../store/actions/articlesActions';
import { Article, WrappedLink } from '../../components';
import './Home.css';

const Home = (props) => {
  const dispatch = useDispatch();
  const allArticles = useSelector((state) => state.articles.articles);
  const myArticles = useSelector((state) => state.articles.myArticles);
  const isAuthenticated = useSelector((state) => state.articles.articles);

  const [state, setState] = useState({
    showMyArticles: false,
  });

  useEffect(() => {
    if (
      props.location.pathname === '/article/myarticles' &&
      !state.showMyArticles
    ) {
      toggleShowMyArticles();
    }
    return () => {};
  }, []);

  useEffect(() => {
    dispatch(getAllArticles());
    if (isAuthenticated) {
      dispatch(getMyArticles());
    }
  }, []);

  const toggleShowMyArticles = () => {
    setState((prevState) => {
      return {
        showMyArticles: !prevState.showMyArticles,
      };
    });
  };

  const renderAllArticles = () => {
    let updatedArticles =
      allArticles || JSON.parse(localStorage.getItem('AllArticles'));
    updatedArticles = allArticles.map((article) => (
      <Article key={article._id} id={article._id} title={article.title} />
    ));

    return updatedArticles;
  };

  const renderMyArticles = () => {
    let art = [];
    if (isAuthenticated && state.showMyArticles) {
      if (myArticles) {
        art = [...myArticles];
      } else {
        art = [...JSON.parse(localStorage.getItem('MyArticles'))];
      }
      art = art.map((article) => (
        <Article key={article._id} id={article._id} title={article.title} />
      ));
    }
    return art;
  };

  const showArticlesLink = (
    <WrappedLink
      to={state.showMyArticles ? '/' : '/article/myarticles'}
      buttonClasses={['btn', 'btn-outline-info', 'mr-3', 'MyArticlesButton']}
      onClick={toggleShowMyArticles}
    >
      {state.showMyArticles ? 'All Articles' : 'My Articles'}
    </WrappedLink>
  );

  return (
    <div className='container'>
      <br />
      <div className='Header'>
        <h1 style={{ display: 'inline-block' }}>All Articles</h1>
        <WrappedLink
          to='/article/add'
          buttonClasses={['btn', 'btn-primary', 'mr-3', 'AddArticleButton']}
        >
          Add Article
        </WrappedLink>
        {isAuthenticated && showArticlesLink}
      </div>
      <br />
      <div>
        <section className='jumbotron'>
          <div>
            {state.showMyArticles ? renderMyArticles() : renderAllArticles()}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
