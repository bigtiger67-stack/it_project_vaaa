/* eslint-disable no-unused-vars */
const { db } = require('../models/admin')

// CREATE: add a new book
const addNewBook = async function (req, res) {
  // const { currUID, title, author, shelves, image } = req.body
  const currUID = req.body.currUID || res.status(500).send('No User id')
  const title = req.body.title || ''
  const author = req.body.author || ''
  const shelves = req.body.shelves || []
  const image = req.body.image || 'noImageFound.jpg'

  const newBookRef = db.collection('books').doc()
  const res2 = await newBookRef.set({
    bookID: newBookRef.id,
    uid: currUID,
    title,
    author,
    image,
    shelves: shelves.concat(['All Books'])

  }, { merge: true })
  console.log('New book created')
  res.status(200).send('Added new book ' + title + ' for user ' + currUID)
}

// READ: get books data by user id
const getUserBooks = async function (req, res) {
  const { currUID } = req.body
  const booksRef = db.collection('books')
  const booksRes = await booksRef.get()
  const books = []
  booksRes.forEach(doc => {
    books.push(doc.data())
  })
  // filter on currUID
  const booksByUID = books.filter(book => book.uid === currUID)
  res.send(booksByUID)
}

// UPDATE: change a book's title
const updateTitle = async function (req, res) {
  const { bookID, currUID, newTitle } = req.body
  const bookRef = db.collection('books').doc(bookID)
  const res2 = await bookRef.set({
    bookID,
    currUID,
    title: newTitle
  }, { merge: true })
  res.status(200).send('Updated title to' + newTitle + ' for bookID ' + bookID)
}

// DELETE: deletes a book
const deleteBook = async function (req, res) {
  const { bookID } = req.body
  const bookRef = db.collection('books').doc(bookID).delete()
  res.status(200).send('Deleted book with bookID ' + bookID)
}

module.exports = {
  addNewBook,
  getUserBooks,
  updateTitle,
  deleteBook
}