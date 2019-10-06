/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Home from './modules/home';
import routes from './routes';
import { AuthProvider } from './modules/auth/authContext';
import Login from './modules/auth/Login';
import Auth from './modules/auth/Auth';
import FlyerItem from './modules/flyer-item';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Route exact path="/" component={() => <Redirect to={routes.map} />} />
          <Route exact path={routes.tabs} component={Home} />
          <Route exact path={routes.login} component={Login} />
          <Route exact path={routes.auth} component={Auth} />
          <Route exact path={routes.newFlyer} component={() => <FlyerItem mode="new" />} />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
