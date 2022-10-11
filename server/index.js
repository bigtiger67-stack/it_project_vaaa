const express = require('express')
const cors = require('cors')
const middleware = require('./middleware/middleware')
const app = express()

// controllers
const booksController = require('./controllers/booksController')

const port = process.env.PORT || 3001
// Enable cors security headers
app.use(cors())

// add an express method to parse the POST method
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(middleware.decodeToken)

app.get('/', (req, res) => {
  res.send('Hi There')
})

// MyBooks routes
app.post('/MyBooks/AddNewBook', async (req, res) => {
    booksController.addNewBook(req, res);
});
app.post('/MyBooks', async (req, res) => {
  booksController.getUserBooks(req, res);
});
app.post('/MyBooks/UpdateTitle', async (req, res) => {
  booksController.updateTitle(req, res)
})
app.post('/MyBooks/DeleteBook', async (req, res) => {
  booksController.deleteBook(req, res)
})

app.listen(port, () => { console.log('Server listening on', port) })
