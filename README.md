# Book Scraper with Node.js

A simple web scraper built with **Node.js** and **Puppeteer**. It opens [Books to Scrape](https://books.toscrape.com/), a website created for practising web scraping.

This project is part of my journey learning browser automation, web scraping, and working with asynchronous JavaScript.

## Features

- Launches a browser using Puppeteer
- Navigates to Books to Scrape
- Uses modern JavaScript with ES modules
- Provides a starting point for extracting book information

## Planned features

- Extract book titles, prices, ratings, and availability
- Scrape multiple pages
- Save the results as JSON or CSV
- Add error handling
- Add configurable scraping options

## Technologies

- [Node.js](https://nodejs.org/)
- [Puppeteer](https://pptr.dev/)

## Getting started

### Prerequisites

Install [Node.js](https://nodejs.org/) version 18 or later.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/web-scraper-nodejs.git
   cd web-scraper-nodejs
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the scraper:

   ```bash
   npm start
   ```

If the project does not have a start script yet, run the entry file directly:

```bash
node index.js
```

## Current implementation

```js
import puppeteer from "puppeteer";

const scrape = async () => {
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();
    await page.goto("https://books.toscrape.com/", {
      waitUntil: "domcontentloaded",
    });
  } finally {
    await browser.close();
  }
};

scrape();
```

## Project structure

```text
web-scraper-nodejs/
├── index.js
├── package.json
└── README.md
```

## Learning goals

- Understand how automated browsers work
- Select and extract information from HTML elements
- Work confidently with `async` and `await`
- Transform scraped information into structured data
- Handle navigation and scraping errors safely

## Responsible use

This project uses a website specifically designed for scraping practice. Before scraping other websites, review their terms of service and `robots.txt`, use reasonable request rates, and do not bypass authentication or access controls.

## Licence

This project is available under the [MIT License](LICENSE).
