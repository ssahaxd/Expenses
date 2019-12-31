import app from "firebase/app";
import "firebase/auth";
// import "firebase/database";
import "firebase/firestore";

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

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APPID,
//     measurementId: process.env.REACT_APP_MEASUREMENTID
// };

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        // this.db = app.database();
        this.db = app.firestore();
        app.firestore().settings({
            cacheSizeBytes: app.firestore.CACHE_SIZE_UNLIMITED
        });

        app.firestore().enablePersistence();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    user = uid => this.db.doc(`users/${uid}`);
    users = () => this.db.collection("users");
    addUser = (uid, udata) => this.db.doc(`users/${uid}`).set(udata);
    expenses = () => this.db.collection("expenses");
    addExpense = expense => this.db.collection("expenses").add(expense);
    deleteExpense = key => this.db.doc(`expenses/${key}`).delete();

    getExpenseByGroup = gid =>
        this.db.collection("expenses").where("gid", "==", gid);

    addCategory = category => this.db.collection("categories").push(category);
}

export default Firebase;
