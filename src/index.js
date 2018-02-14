import $ from 'jquery';
import 'bootstrap-webpack';
import * as firebase from "firebase";
import './styles/index.less';
import './styles/user-profile-edit.less';
import { Rootpage } from './rootpage/view.js';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD163pvGBgFJO2FNR_MIUcXLbdGD0dBz_k",
    authDomain: "unify-proto.firebaseapp.com",
    databaseURL: "https://unify-proto.firebaseio.com",
    projectId: "unify-proto",
    storageBucket: "unify-proto.appspot.com",
    messagingSenderId: "617755998297"
};
firebase.initializeApp(config);

const rootpage = new Rootpage();

rootpage.render();

$('body').append(rootpage.$el);

