import express from "express"
import dotenv from "dotenv"
import data from "../../books.json" with { type: 'json' }

const app = express()

dotenv.config({ path: '../.env' })

let PORT = process.env.SERVER_PORT || 3000

// this is the default home route
app.get("/", (req, res) => {
  const featuredBooks = data
    .map((book, index) => ({
      ...book,
      id: index + 1,
    }))
    .sort((a, b) => Number(b.rating) - Number(a.rating))
    .slice(0, 3);

  const featuredBooksHTML = featuredBooks
    .map(
      (book) => `
        <div style="
          font-size: 20px;
          padding: 20px;
          border: 1px solid black;
          width: 250px;
          box-sizing: border-box;
        ">
          <a href="/books/${book.id}">
            ${book.title}
          </a>

          <p>${book.price}</p>
          <p>${book.stock}</p>
          <p>${book.rating}⭐️</p>
        </div>
      `
    )
    .join("");

  res.send(`
    <div style="
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
      flex-direction: column;
    ">
      <h1>Book Scraper 101</h1>

      <a
        href="/books"
        style="
          padding: 15px 55px;
          border-radius: 0.5rem;
          color: white;
          margin-bottom: 20px;
          font-size: 20px;
          text-decoration: none;
          background-color: black;
        "
      >
        ALL BOOKS
      </a>

      <form action="/search" method="GET">
        <label for="bookId">SEARCH BOOKS</label>

        <input
          id="bookId"
          name="id"
          type="number"
          min="1"
          placeholder="Enter a book ID"
          required
        >

        <button type="submit">Search</button>
      </form>
    </div>

    <h2>Featured Books</h2>

    <div style="
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    ">
      ${featuredBooksHTML}
    </div>
  `);
});
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
  
            <a href="/books/${index + 1}" target="_blank">
              ${book.title}
            </a>
  
            <p>${book.price}</p>
            <p>${book.stock}</p>
            <p>${book.rating}⭐️</p>
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

    res.send(

    `
      <div style="
            font-size: 20px;
            padding: 20px;
            border: 1px solid black;
            width: 250px;
            box-sizing: border-box;
          ">

    <p>${book.title}</p>
    <p>${book.price}</p>
    <p>${book.stock}</p>
    <p>${book.rating}⭐️</p>
    </div
    `
    )
})

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON localhost:",PORT)
})