const endpoints = {
  getRandom: 'https://api.chucknorris.io/jokes/random',
  getCategories: 'https://api.chucknorris.io/jokes/categories',
  getByCategory: category => `https://api.chucknorris.io/jokes/random?category=${category}`
}

const categoriesContainer = document.querySelector('.categories');
const jokeContainer = document.querySelector('.joke');

async function htmlJoke (joke) {
  jokeContainer.textContent = joke.value;
}

async function handleClass (event) {
  event.preventDefault();
  document.querySelectorAll('.categories > li').forEach((category) => {
    if (category.classList.contains('selected')) {
      category.classList.remove('selected');
    };
  })
  event.target.classList.add('selected');
};

async function handleJokeByCategory (category) {
  return fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
    .then(response => response.json())
    .then(response => htmlJoke(response));
}

async function handleCategory (event) {
  handleJokeByCategory(event.target.textContent);
}

async function handleClick (event) {
  event.preventDefault();
  handleClass(event);
  handleCategory(event);
};

async function htmlCategories (categories) {
  categories.forEach(category => {
    const listItem = document.createElement('li');
    listItem.textContent = category;
    listItem.onclick = handleClick;
    categoriesContainer.appendChild(listItem);
  });
}

async function categories () {
  return fetch('https://api.chucknorris.io/jokes/categories')
    .then(response => response.json())
    .then(response => htmlCategories(response))
    .catch(error => console.log(error));
}

async function joke () {
  return fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(response => htmlJoke(response))
    .catch(error => console.log(error));
}

async function run () {
  joke();
  categories();
}

run();
