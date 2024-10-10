import { STATUSES } from '../utils/dictionaries.js';
import { auth, myDB } from '../utils/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc, query, where, getDocs, doc, getDoc } from "firebase/firestore";

async function registerUser(name, email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
            displayName: name
        });
        console.log(auth.currentUser)

        return auth.currentUser;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return { errorCode, errorMessage };
    }
}

async function loginUser(email, password) {
    console.log('LOGIN data')
    try {
        let response = await signInWithEmailAndPassword(auth, email, password);
        if (response) {
            let userId = await getUserFromDatabase(response);
            return userId;
        } else {
            return new Error('Что-то пошло не так');
        }

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
    const q = query(collection(myDB, "users"), where("email", "==", userData.user.email));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].id;
}

async function addBook(data) {
    try {
        const docRef = await addDoc(collection(myDB, 'books'), {
            userId: data.userId,
            title: data.title,
            author: data.author,
            status: data.status,
            genre: data.genre,
            pages: data.pages,
            format: data.format,
            readPages: data.readPages,
            expectations: data.expectations,
            tags: data.tags
        });
        return docRef.id;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return { errorCode, errorMessage };
    }
}

async function updateBook(id, data) {

}

function deleteBook(id) {
    //delete book from DB
}

async function getBook(id) {
    const docRef = doc(db, "books", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return new Error('Документ не найден');
    }
}

async function getUserBooks(user, bookStatus = 'all') {
    let q;
    if (bookStatus !== 'all') {
        q = query(collection(myDB, "books"),
            where("status", "==", bookStatus),
            where("userId", "==", user));
    } else {
        q = query(collection(myDB, "books"),
            where("userId", "==", user));
    }

    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length) {
        return querySnapshot.docs;
    } else {
        return new Error('Документ не найден');
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