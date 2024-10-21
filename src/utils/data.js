import { auth, myDB } from '../utils/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc, query, where, getDocs, doc, getDoc, runTransaction, deleteDoc, arrayUnion } from "firebase/firestore";

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
            cover: data.cover,
            status: data.status,
            genre: data.genre,
            pages: data.pages,
            format: data.format,
            readPages: data.readPages,
            expectations: data.expectations,
            tags: data.tags,
            quotes: [],
            notes: []
        });
        console.log("Transaction successfully committed!");

        return docRef.id;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Transaction failed: ", error);

        return { errorCode, errorMessage };
    }
}

async function updateBook(id, data) {
    const sfDocRef = doc(myDB, "books", id);
    const newTitle = data.title;
    const newAuthor = data.author;
    const newCover = data.cover;
    const newStatus = data.status;
    const newGenre = data.genre;
    const newPages = data.pages;
    const newFormat = data.format;
    const newReadPages = data.readPages;
    const newExpectations = data.expectations;
    const newTags = data.tags;

    try {
        await runTransaction(myDB, async (transaction) => {
            const sfDoc = await transaction.get(sfDocRef);
            if (!sfDoc.exists()) {
                throw "Document does not exist!";
            }

            transaction.update(sfDocRef, {
                title: newTitle,
                author: newAuthor,
                cover: newCover,
                status: newStatus,
                genre: newGenre,
                pages: newPages,
                format: newFormat,
                readPages: newReadPages,
                tags: newTags,
                expectations: newExpectations
            });
        });
        console.log("Transaction successfully committed!");
    } catch (e) {
        console.log("Transaction failed: ", e);
    }
}

async function updateBookStatus(id, newStatus) {
    const sfDocRef = doc(myDB, "books", id);
    try {
        await runTransaction(myDB, async (transaction) => {
            const sfDoc = await transaction.get(sfDocRef);
            if (!sfDoc.exists()) {
                throw "Document does not exist!";
            }

            transaction.update(sfDocRef, {
                status: newStatus
            });
        });
        console.log("Transaction successfully committed!");
    } catch (e) {
        console.log("Transaction failed: ", e);
    }
}

async function addQuote(id, value) {
    const sfDocRef = doc(myDB, "books", id);
    try {
        await runTransaction(myDB, async (transaction) => {
            const sfDoc = await transaction.get(sfDocRef);
            if (!sfDoc.exists()) {
                throw "Document does not exist!";
            }

            transaction.update(sfDocRef, {
                quotes: arrayUnion(value)
            });
        });
        console.log("Transaction successfully committed!");
    } catch (e) {
        console.log("Transaction failed: ", e);
    }
}

async function addNote(id, value) {
    const sfDocRef = doc(myDB, "books", id);
    try {
        await runTransaction(myDB, async (transaction) => {
            const sfDoc = await transaction.get(sfDocRef);
            if (!sfDoc.exists()) {
                throw "Document does not exist!";
            }

            transaction.update(sfDocRef, {
                notes: arrayUnion(value)
            });
        });
        console.log("Transaction successfully committed!");
    } catch (e) {
        console.log("Transaction failed: ", e);
    }
}

async function setBookGrade(id, value) {
    const sfDocRef = doc(myDB, "books", id);
    try {
        await runTransaction(myDB, async (transaction) => {
            const sfDoc = await transaction.get(sfDocRef);
            if (!sfDoc.exists()) {
                throw "Document does not exist!";
            }
            transaction.update(sfDocRef, {
                grade: value
            });
        });
        console.log("Transaction successfully committed!");
    } catch (e) {
        console.log("Transaction failed: ", e);
    }
}

async function deleteBook(id) {
    try {
        await deleteDoc(doc(myDB, "books", id));
        console.log("Transaction successfully committed!");
    } catch (error) {
        console.log("Transaction failed: ", error);
    }
}

async function getBook(id) {
    const docRef = doc(myDB, "books", id);
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
    updateBookStatus,
    deleteBook,
    getBook,
    setBookGrade,
    addQuote,
    addNote
};