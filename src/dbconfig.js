import { Client } from "pg";
import dotenv from "dotenv";

import data from "../books.json" with { type: 'json' }

let stringify = JSON.stringify(data[0]);

let title = JSON.parse(stringify).title;
let price = JSON.parse(stringify).price;
let stock = JSON.parse(stringify).stock;
let rating = JSON.parse(stringify).rating;
let link = JSON.parse(stringify).link;

dotenv.config({ path: '../.env' })

async function main() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try{
    await client.connect();

    const {title,rating,link} = data[0]
    const stock = data[0].stock.trim().toLowerCase() === "in stock" ? 1 : 0;
    const price = Number.parseFloat(data[0].price.replace(/[^\d.-]/g, ""));

    const res = await client.query(
      `INSERT INTO public.books (title,price,stock,rating,link)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
       [title,price,stock,rating,link]
    );
    console.log(res.rows[0]);
  }
  finally{
    await client.end()
  }
 
}

main().catch(console.error);
