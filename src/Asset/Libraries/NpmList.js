// import axios from 'axios';
import { debounce } from 'lodash';
import { addNavigationHelpers, NavigationActions, TabNavigator, StackNavigator } from 'react-navigation';
import thunk from 'redux-thunk';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import Snackbar from 'react-native-snackbar';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'react-native-elements';

import ImageCropper from 'react-native-image-crop-picker';
import FCM from "react-native-fcm";
import moment  from 'moment';
import Moment  from 'moment';

var FileUpload = require('NativeModules').FileUpload;
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';

import ModalPicker from 'react-native-modal-picker'
import SplashScreen from 'react-native-smart-splash-screen';
import DeviceInfo from 'react-native-device-info';
// import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import CountDown from 'react-native-countdown-component';
import GridView from 'react-native-super-grid';
import ImageZoom from 'react-native-image-pan-zoom';
import KeyboardAwareScrollView from 'react-native-keyboard-aware-scroll-view';

export {
    debounce, thunk, addNavigationHelpers, NavigationActions, TabNavigator, StackNavigator, PropTypes, connect, Provider, combineReducers, createStore, applyMiddleware,
    LinearGradient, Snackbar, FontAwesomeIcon, Icon,Moment,KeyboardAwareScrollView,ImageZoom,
    ImageCropper, FCM, FileUpload, ImagePicker, DateTimePicker, ModalPicker, SplashScreen, moment , DeviceInfo,GridView,CountDown
}

