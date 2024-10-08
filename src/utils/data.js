import { STATUSES } from '../utils/dictionaries.js';
import { auth, myDB } from '../utils/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

async function registerUser(name, email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
            displayName: name
        });

        return auth.currentUser;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return { errorCode, errorMessage };
    }
}

async function loginUser(email, password) {
    try {
        let response = await signInWithEmailAndPassword(auth, email, password);
        //const q = query(collection(db, "cities"), where("capital", "==", true));
        getUserFromDatabase(response)
        //return response;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return { errorCode, errorMessage };
    }
}

async function addUserToDatabase(username, useremail) {
    try {
        const docRef = await addDoc(collection(myDB, 'users'), {
            name: username,
            email: useremail
        });
        return docRef.id;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return { errorCode, errorMessage };
    }

}

async function getUserFromDatabase(userData) {
    console.log(userData)

}

function addBook(data) {
    //save book to DB
}

function updateBook(id, data) {
    //update book in DB
}

function deleteBook(id) {
    //delete book from DB
}

function getBook(id) {
    //get book's detailed data
}

function getUserBooks(user, bookStatus = 'all') {
    let res = get();
    //use all statuses or passed when method called
    //make req to db
    //return array of books with all data
    if (bookStatus = 'IN_PROGRESS') {
        //return books for Main screen
    }
};
module.exports = {
    getUserBooks,
    registerUser,
    addUserToDatabase,
    loginUser,
    addBook,
    updateBook,
    deleteBook,
    getBook
};