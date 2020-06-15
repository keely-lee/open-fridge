const recipeScraper = require("recipe-scraper");
const ingParser = require('ingredientparser');
const axios = require('axios').default;
const fs = require('fs');

require('events').EventEmitter.defaultMaxListeners = 20;

scrapeRecipes(1,2,'testdata.json')


function scrapeRecipes(pageStart, pageEnd, writeFile){
  let i = pageStart;
  let writer = fs.createWriteStream(writeFile);
  while (i <= pageEnd){
    if (i === pageEnd){
      scrapePage(i).then( (recipes) => {
        writer.write(recipes, () => writer.close())
      })
    } else {
      scrapePage(i).then( (recipes) => {
        writer.write(recipes);
      })
    }
    i++;
  }
}

async function scrapePage(num){
  let indexUrl = `https://www.yummly.com/sitemap-en-US-${num}.html`
  let recipes = await axios.get(indexUrl, { responseType: 'text' })
    .then(({ data }) => batchScrape(data));
  return recipes;
}

async function batchScrape(htmlText) {
  let urlMatch = /href="(https:\/\/www\.yummly\.com\/recipe[^"]*)"/g
  let url = '';
  let recipes = [];
  while (url !== null) {
    let i = 0;
    let recipePromises = [];
    while ((url = urlMatch.exec(htmlText)) !== null && i < 20) {
      let recipeUrl = url[1];
      recipePromises.push(recipeScraper(recipeUrl).then(recipe => {
        recipe.ingredients = recipe.ingredients.map(ing => ingParser.parse(ing));
        recipe.time = { total: recipe.time.total }
        recipes.push(recipe);
      }).catch(err => console.log(err)));
      i++;
    };
    await Promise.all(recipePromises);
  }
  return JSON.stringify(recipes, null, 2);
}
