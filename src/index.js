import $ from 'jquery';
import 'bootstrap-webpack';
import * as firebase from "firebase";
import './styles/index.less';
import './styles/user-profile-edit.less';
import { Rootpage } from './rootpage/view.js';
import { UnifyWebAppRouter } from './router.js';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAgMgWurk_QcfAYTBo9_Efrq9MolX2MAak",
    authDomain: "unify-app-51d0a.firebaseapp.com",
    databaseURL: "https://unify-app-51d0a.firebaseio.com",
    projectId: "unify-app-51d0a",
    storageBucket: "unify-app-51d0a.appspot.com",
    messagingSenderId: "796198836192"
};
firebase.initializeApp(config);

window.unifyApp = {
    router: new UnifyWebAppRouter(),
    database: firebase.database(),
    currentUser: undefined,
    // client: new WindowsAzure.MobileServiceClient('https://unify-proto.azurewebsites.net'),
    // userManager: new UserManager(),
};

const rootpage = new Rootpage();

// Render rootpage with the loading screen
rootpage.render();

// After sign-in state is determined, notify the rootpage.
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        window.unifyApp.currentUser = user;
        // User is signed in.
        rootpage.showMainScreen();
    } else {
        // No user is signed in.
        rootpage.showLoginScreen();
    }
});

$('body').append(rootpage.$el);

