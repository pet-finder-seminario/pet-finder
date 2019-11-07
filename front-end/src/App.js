/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Home from './modules/home';
import routes from './routes';
import { AuthProvider } from './modules/auth/authContext';
import Login from './modules/auth/Login';
import Auth from './modules/auth/Auth';
import FlyerItem from './modules/flyer-item';
import Messages from './modules/messages';
import { AppProvider } from './modules/common/context';
import { DialogProvider } from './modules/common/DialogContext';

function App() {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  const vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // We listen to the resize event
  window.addEventListener('resize', () => {
    // We execute the same script as before
    // eslint-disable-next-line
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  return (
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <DialogProvider>
            <div className="App">
              <Route exact path="/" component={() => <Redirect to={routes.map} />} />
              <Route exact path={routes.tabs} component={Home} />
              <Route exact path={routes.login} component={Login} />
              <Route exact path={routes.auth} component={Auth} />
              <Route exact path={routes.messages} component={Messages} />
              <Route exact path={routes.newFlyer} component={(props) => <FlyerItem mode="new" {...props} />} />
              <Route exact path={routes.viewFlyer} component={(props) => <FlyerItem mode="view" {...props} />} />
            </div>
          </DialogProvider>
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
