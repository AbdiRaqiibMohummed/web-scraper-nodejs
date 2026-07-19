import express, { request, response} from "express"
import dotenv from "dotenv"
import path from "path"
import data from "../../books.json" with { type: 'json' }

const app = express()
let PORT = process.env.SERVER_PORT || 3000

dotenv.config({ path: '../.env' })


// this is the default home route
app.get("/",(req,res) => {
    res.send(`
        <div
        style="display:flex; justify-content:center; align-items:center; gap:5px; flex-direction:column;"
        >
        <h1 style="margin-auto; "> Book Scraper 101 </h1>
        <a 
        href="/books" 
        style=" 
        padding:15px 55px;
        border-radius:1rem;
        color:white; 
        font-size:20px; 
        text-decoration: none;
        background-color:black;">ALL BOOKS</a>

        <form action="/search" method=GET> 
         <label
        style=" 
        margin-top:50px;
        padding:15px 55px;
        border-radius:1rem;
        color:white; 
        font-size:20px; 
        text-decoration: none;
        background-color:green;">SEARCH BOOKS</lable>

        <input
        id="bookId"
          name="id"
          type="number"
          min="1"
          placeholder="Enter a book ID"
          required>

        <button type="submit">Search</href>
        </form>

        </div>`)

})



//this will handle the input search from the homepage

app.get("/search", (req,res) => {
    const id = req.query.id
    res.redirect(`/books/${id}`)
})



//this returns all the books
app.get("/books", (req, res) => {
    const booksHTML = data
      .map((book, index) => {
        return `
          <div style="
            font-size: 20px;
            padding: 20px;
            border: 1px solid black;
            width: 250px;
            box-sizing: border-box;
          ">
            <p>Book ID: ${index + 1}</p>
  
            <a href="${book.link}" target="_blank">
              ${book.title}
            </a>
  
            <p>${book.price}</p>
            <p>${book.stock}</p>
            <p>${book.rating} ⭐️</p>
          </div>
        `;
      })
      .join("");
  
    res.send(`
          <a href="/"> Back Home <a>
      <h1>Book Catalogue</h1>
    
  
      <div style="
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
      ">
        ${booksHTML}
      </div>
    `);
  });


// this returns one book that you choose
app.get("/books/:id",(req,res) => {
    const id = req.params.id
    const book = data[id - 1]

    res.json(book)
})

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON localhost:" , PORT)
})