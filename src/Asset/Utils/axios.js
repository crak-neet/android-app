import React, { Component } from 'react';
import Axios from 'axios';

const client = Axios.create({
  // baseURL: 'http://139.59.42.219/api',
  baseURL: 'https://www.crakneet.com/api',
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json',
  timeout: 15000,

});

/**
 * Request Wrapper with default success/error actions
 */
const httpRequest = function (options) {
  const onSuccess = function (response) {
    // console.log(options.url)
    // console.debug('Request Successful!', response);
    return response.data;
  }

  const onError = function (error) {
    if (error.response) {

      // console.warn('Status:', error.response.status);
      // console.warn('Data:', error.response.data);
      // console.warn('Headers:', error.response.headers);
      // console.warn('Code Error', error.response.code)
    } else if (error.request) {
      // Server Error Like 404,500 Internal error //
      // Snackbar.show({
      //   title: 'Kindly Logout and Login !',
      //   backgroundColor: 'red',
      //   duration: Snackbar.LENGTH_SHORT,

      // });
      //  console.warn(error.request);
    }
    else {
      // Something else happened while setting up the request
      // triggered the error
      // Server Error Like 404,500 Internal error //
      // Snackbar.show({
      //   title: 'No internet connection available. Please try again later.',
      //   //  backgroundColor: 'red',
      //   duration: Snackbar.LENGTH_SHORT,

      // });
      //  console.warn('Error Message:', error.message);
    }
    // Server Error Like 404,500 Internal error //
    // Snackbar.show({
    //   title: 'No internet connection available. Please try again later.',
    //   //  backgroundColor: 'red',
    //   duration: Snackbar.LENGTH_SHORT,

    // });
    //  console.warn('Request Failed:', error.config);
    return Promise.reject(error.response || error.message
      || error.config || error.request);
  }

  return client(options)
  .then(onSuccess)
  .catch(onError);
}
export { httpRequest, client };