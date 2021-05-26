import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps, callback) => async (dispatch) => {
  try {
    //formProps = {email, password}
    const response = await axios.post('http://localhost:3090/signup', {
      ...formProps,
    });

    dispatch({
      type: AUTH_USER,
      payload: response.data.token,
    });
    //save token into LS
    localStorage.setItem('token', response.data.token);
    //call the callback from auth/Signup (onSubmit)
    callback();
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    //we using the same AUTH_USER
    type: AUTH_USER,
    payload: '',
  };
};

export const signin = (formProps, callback) => async (dispatch) => {
  try {
    //formProps = {email, password}
    const response = await axios.post('http://localhost:3090/signin', {
      ...formProps,
    });

    dispatch({
      type: AUTH_USER,
      payload: response.data.token,
    });
    //save token into LS
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};
