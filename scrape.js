import puppeteer from "puppeteer";
import fs from "fs";

const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const allBooks = []; // this is where all the books will be stored
  let currentPage = 1; //Here you can change from the page you want to start from
  const maxPages = 10; //Here you can change to scrape all the pages im sticking with 10 for now


  //looping through the pages until the maxPages is less than or equals to it
  while (currentPage <= maxPages) {

    //this will loop through the current page all the way to max Pages
    const url = `https://books.toscrape.com/catalogue/page-${currentPage}.html`;

    // asynchrounsly await to go to the page with that url above
    await page.goto(url);

    const books = await page.evaluate(() => {
    

      // here we extract the book elements  
      const bookElements = document.querySelectorAll(".product_pod");
      return Array.from(bookElements).map((book) => {

        // here we retrieve the data that we want to extract and store
        const title = book.querySelector("h3 a").getAttribute("title");
        const price = book.querySelector(".price_color").textContent;

        // ternary operator(if statement) to see if the book is in stock if truthy return
        //In Stock and if falsy return Not in stock
        const stock = book.querySelector(".instock.availability")
          ? "In Stock"
          : "Not in Stock";

        const rating = book
          .querySelector(".star-rating")
          .className.split(" ")[1];
        const link = book.querySelector("h3 a").getAttribute("href");
        return {
          title,
          price,
          stock,
          rating,
          link,
        };
      });
    });

    allBooks.push(...books)
    console.log(`Books on page ${currentPage}: `, books)
    currentPage++
  }

  fs.writeFileSync("books.json", JSON.stringify(allBooks, null, 2));

  console.log("Data saved to books.json");

  await browser.close();
};

scrape();
