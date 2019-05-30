const endpoints = {
  getRandom: 'https://api.chucknorris.io/jokes/random',
  getCategories: 'https://api.chucknorris.io/jokes/categories',
  getByCategory: category => `https://api.chucknorris.io/jokes/random?category=${category}`
}

const categoriesContainer = document.querySelector('.categories');
const jokeContainer = document.querySelector('.joke');

const htmlJoke = joke => {
  jokeContainer.textContent = joke.value;
}

const handleClass = event => {
  event.preventDefault();
  document.querySelectorAll('.categories > li').forEach((category) => {
    if (category.classList.contains('selected')) {
      category.classList.remove('selected');
    };
  })
  event.target.classList.add('selected');
};

const handleJokeByCategory = category => {
  return fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
    .then(response => response.json())
    .then(response => htmlJoke(response));
}

const handleCategory = event => handleJokeByCategory(event.target.textContent);

const handleClick = event => {
  event.preventDefault();
  handleClass(event);
  handleCategory(event);
};

const htmlCategories = categories =>
  categories.forEach(category => {
    const listItem = document.createElement('li');
    listItem.textContent = category;
    listItem.onclick = handleClick;
    categoriesContainer.appendChild(listItem);
  });

const categories = () =>
  fetch('https://api.chucknorris.io/jokes/categories')
    .then(response => response.json())
    .then(response => htmlCategories(response))
    .catch(error => console.log(error));

const joke = () => 
  fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(response => htmlJoke(response))
    .catch(error => console.log(error));

const run = () => {
  joke();
  categories();
}

run();
