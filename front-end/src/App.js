/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './modules/home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/home/:tab" component={Home} />
      </div>
    </BrowserRouter>
  );
}

export default App;
