import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
//redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';
import Feature from './components/Feature';

const middleware = [thunk];

ReactDOM.render(
  <Provider
    store={createStore(
      reducers,
      {
        //when app starts up, we get the token, if any, from the LS
        auth: { authenticated: localStorage.getItem('token') },
      },
      composeWithDevTools(applyMiddleware(...middleware))
    )}
  >
    <BrowserRouter>
      <App>
        <Route path='/' exact component={Welcome} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/signout' exact component={Signout} />
        <Route path='/signin' exact component={Signin} />
        <Route path='/feature' exact component={Feature} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
