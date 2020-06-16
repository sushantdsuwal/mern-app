import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import NavigationBar from './containers/NavigationBar';
import Home from './containers/Home';
import { Login, Signup } from './containers/Users/';
import { AddArticle, DetailArticle, EditArticle } from './containers/Articles/';

class App extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <NavigationBar />
        <Switch>
          <Route exact path='/article/add' component={AddArticle} />
          <Route path='/article/edit/:id' component={EditArticle} />
          <Route path='/articles/:id' component={DetailArticle} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
