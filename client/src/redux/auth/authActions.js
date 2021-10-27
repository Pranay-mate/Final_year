import { ToastContainer, toast } from 'react-toastify';
import { AUTH } from './authTypes.js';
import * as api from './api.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    toast.success("Hey! "+data.result.name);

    router.push('/');
  } catch (error) {
    console.log(error);
    toast.error("Error! Please try again");
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    console.log(data)
    // toast.success("Hi.."+data.result.name);

    router.push('/');
  } catch (error) {
    console.log(error);
    toast.error("Error! Please try again");
  }
};