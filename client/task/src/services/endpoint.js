const endpoints = {
  validate: '/api/users/validate',
  signup: '/api/users/signup',
  login: '/api/users/login',

  articles: '/api/articles', //aslo accept params with /id?
  myarticles: '/api/articles/myarticles',
  addArticle: '/api/articles/add',
  editArticle: '/api/articles/edit/',
  deleteArticle: '/api/articles/delete/',
};

export default endpoints;
