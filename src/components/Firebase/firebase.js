import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

// const config = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APPID,
//     measurementId: process.env.REACT_APP_MEASUREMENTID
// };

const firebaseConfig = {
    apiKey: "AIzaSyCHBshxlV7Lupm4NMjVcMeeGzEBWXCXef4",
    authDomain: "expenses-ssaha.firebaseapp.com",
    databaseURL: "https://expenses-ssaha.firebaseio.com",
    projectId: "expenses-ssaha",
    storageBucket: "expenses-ssaha.appspot.com",
    messagingSenderId: "581797685229",
    appId: "1:581797685229:web:4d00a42e5fb8a26a2729e4",
    measurementId: "G-DC2FDER2W8"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.database();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref("users");
    expenses = () => this.db.ref("expenses");
    addExpense = expense => this.db.ref("expenses").push(expense);
    deleteExpense = key => this.db.ref(`expenses/${key}`).remove();
}

export default Firebase;
