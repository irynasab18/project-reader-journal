//utils to work with DB
import { STATUSES } from '../utils/dictionaries.js';

function createUser(name, email, password) {
    //put new user to DB
    //return true (if saved) ot false (if error)
}

function getUser(email, password) {
    //get user by email
    //compare DB password with received password
    //return true ot false
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
module.export = {
    getUserBooks,
    createUser,
    getUser,
    addBook,
    updateBook,
    deleteBook,
    getBook
};