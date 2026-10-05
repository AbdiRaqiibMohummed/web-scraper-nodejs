import { Client } from "pg";
import dotenv from "dotenv";

import data from "../books.json" with { type: 'json' }

dotenv.config({ path: '../.env' })

export async function main() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try{
    await client.connect();
    
    let insertedBooks = []

    for(const book of data){
    const title = book.title
    const rating = Number(book.rating)
    const link = book.link
  
    const stock = book.stock.trim().toLowerCase() === "in stock" ? 1 : 0;
    const price = Number.parseFloat(book.price.replace(/[^\d.-]/g, ""));

    const res = await client.query(
      `INSERT INTO public.books (title,price,stock,rating,link)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
       [title,price,stock,rating,link]
    );
    insertedBooks.push(res.rows[0])
  }
  console.log(`Inserted ${insertedBooks.length} books`);
    console.log(insertedBooks);
  }
  finally{
    await client.end()
  }
 
}

main().catch(console.error);
