// https://api.chucknorris.io/

// Usage
// Retrieve a random chuck joke in JSON format.
// https://api.chucknorris.io/jokes/random

// Example response:
// {
//  "icon_url" : "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
//  "id" : "2B0-YIQIQDaX1jpxmLQCpA",
//  "url" : "https://api.chucknorris.io/jokes/2B0-YIQIQDaX1jpxmLQCpA"
//  "value" : "Chuck Norris isn't given tests. He TAKES them."
// }
// Get me a new one ...(press "r" to refresh)

// Retrieve a random chuck norris joke from a given category.
// https://api.chucknorris.io/jokes/random?category={category}

// Retrieve a list of available categories.
// https://api.chucknorris.io/jokes/categories

// Free text search.
// https://api.chucknorris.io/jokes/search?query={query}

const jokesEndpoints = {
  getRandom: 'https://api.chucknorris.io/jokes/random',
  getCategories: 'https://api.chucknorris.io/jokes/categories',
  getByCategory: (category) => `https://api.chucknorris.io/jokes/random?category=${category}`
}

const joke = document.getElementById('joke');
const categories = document.getElementById('categories');

const writeJoke = (value) => {
  joke.textContent = value;
}

const addClickToChild = (categories) => {
  categories.addEventListener('change', (event) => {
    getJokeByCategory(event.target.value);
  })
}

const renderCategories = (array) => {
  array.map((item) => {
    let option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    categories.appendChild(option);
  })
  
  addClickToChild(categories);
}

async function getRandomJoke () {
  await fetch(jokesEndpoints.getRandom)
    .then(response => response.json())
    .then(response => writeJoke(response.value));
}

getRandomJoke();

async function getCategories () {
  await fetch(jokesEndpoints.getCategories)
    .then(response => response.json())
    .then(response => renderCategories(response));
}

getCategories();

async function getJokeByCategory (category) {
  await fetch(jokesEndpoints.getByCategory(category))
    .then(response => response.json())
    .then(response => writeJoke(response.value));
}
