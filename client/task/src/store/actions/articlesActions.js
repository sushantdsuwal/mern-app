import * as actionTypes from './actionTypes';
import endpoints from '../../services/endpoint';

const options = (data) => {
  return {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken'),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'post',
    body: JSON.stringify(data),
  };
};

export const getAllArticles = () => {
  return (dispatch) => {
    fetch(endpoints.articles)
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem('AllArticles', JSON.stringify(res.articles));
        dispatch({
          type: actionTypes.GOT_ALL_ARTICLES,
          articles: res.articles,
        });
      });
  };
};

export const getMyArticles = () => {
  return (dispatch) => {
    fetch(endpoints.myarticles, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken'),
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem('MyArticles', JSON.stringify(res.articles));
        dispatch({
          type: actionTypes.GOT_MY_ARTICLES,
          myArticles: res.articles,
        });
      });
  };
};

export const getArticle = (articleId) => {
  return (dispatch) => {
    fetch(`${endpoints.articles}/` + articleId)
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: actionTypes.GOT_SINGLE_ARTICLE,
          article: res.article,
        });
      });
  };
};

export const submitNewArticle = (articleData) => {
  return (dispatch) => {
    return fetch('/api/articles/add', options(articleData)).then((res) =>
      res.json()
    );
  };
};

export const saveArticle = (articleId, articleData) => {
  return (dispatch) => {
    return fetch(
      endpoints.editArticle + articleId,
      options(articleData)
    ).then((res) => res.json());
  };
};

export const deleteArticle = (articleId) => {
  return (dispatch) => {
    return fetch(endpoints.deleteArticle + articleId, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwtToken'),
        'Content-Type': 'application/json',
      },
      method: 'delete',
    }).then((res) => res.json());
  };
};
