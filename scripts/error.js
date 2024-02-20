// import { getFavourites, setFavourites, favourite } from "./index.js";

// togglemenu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const URL = "https://www.omdbapi.com/?apikey=467b36e9";
async function generateMovies(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// handle favourites

function favourite(key, title, desc, poster, isFav = false) {
  this.key = key;
  this.Title = title;
  this.desc = desc;
  this.Poster = poster;
  this.isFav = isFav;
}
function setFavourites(Fav) {
  localStorage.setItem("fav", JSON.stringify(Fav));
  console.log(getFavourites());
  showFavourites();
  displayMovies();
  // handleSearch();
}

function showFavourites() {
  const favs = document.querySelector(".favs");
  favs.innerHTML = "";
  let fav = getFavourites();
  if (getFavourites().length === 0) {
    document.querySelector(".favs").innerHTML =
      "<h2>Add your favourite movies or series here...</h2>";
  }
  fav.map((res, key) => {
    const div = createDiv(key, res.Title, res.Poster, res.desc);
    favs.appendChild(div);
  });
}
function getFavourites() {
  return JSON.parse(localStorage.getItem("fav"));
}
if (getFavourites() === null) {
  localStorage.setItem("fav", JSON.stringify([]));
  document.querySelector(".favs").innerHTML =
    "<h2>Add your favourite movies or series here...</h2>";
} else {
  console.log(getFavourites());
  showFavourites();
}
function removeFav(title) {
  let Fav = getFavourites();
  Fav.map((f) => {
    if (f.Title === title) {
      let id = Fav.indexOf(f);
      Fav.splice(id, 1);
    }
  });
  return Fav;
}
function handleFavourites(key, title, desc, poster) {
  let icon = document.getElementById("fav" + key + title);
  const fav = new favourite(key, title, desc, poster);
  let Fav = getFavourites();
  if (icon.classList.contains("fa-regular")) {
    icon.classList.replace("fa-regular", "fa-solid");
    fav.isFav = true;
    Fav.push(fav);
    setFavourites(Fav);
  } else {
    icon.classList.replace("fa-solid", "fa-regular");
    fav.isFav = false;
    Fav = removeFav(title);
    setFavourites(Fav);
  }
}

function displayMovies() {
  let random = [15398776, 1517268, 6791350, 3581920, 4574334];
  let results = document.querySelector(".random");
  results.innerHTML = "";
  for (let it = 0; it < 5; it++) {
    let i = "tt" + random[it].toString();
    const pr = generateMovies(URL + `&i=${i}`);
    pr.then((res) => {
      let desc = res.Type + " " + res.Year;
      let title = res.Title;
      title = title.replace("'", " ");
      title = title.replace('"', " ");
      let poster = res.Poster;
      const div = createDiv(it, title, poster, desc);
      results.appendChild(div);
    });
  }
}

document.querySelector(".search-form").addEventListener("submit", handleSearch);
function handleSearch(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const input = document.getElementById("search");
  const s = data.get("movie");
  console.log(s);
  const result = document.querySelector(".hide");
  result.classList.add("show");
  const pr = generateMovies(URL + `&s=${s}`);
  pr.then((res) => createCard(res.Search));
  input.value = "";
}

function createCard(arr) {
  console.log(arr);
  const results = document.querySelector(`.results`);
  results.innerHTML = "";
  if (arr === undefined) {
    results.appendChild(displayNil());
  } else {
    arr.map((res, key) => {
      let desc = res.Type + " " + res.Year;
      let title = res.Title;
      title = title.replace("'", " ");
      title = title.replace('"', " ");
      let poster = res.Poster;
      const div = createDiv(key, title, poster, desc);
      results.appendChild(div);
    });
  }
  console.log(getFavourites());
}
function displayNil() {
  const h2 = document.createElement("h2");
  h2.textContent = "No Such Movie or Web Series Found!!!";
  return h2;
}

function createDiv(key, title, poster, desc) {
  const div = document.createElement("div");
  div.className = "card";

  const p = document.createElement("p");
  p.className = "id";
  p.textContent = `${key + 1}`;

  const descP = document.createElement("p");
  descP.textContent = `${desc}`;

  const img = createPoster(poster, title);

  const thead = document.createElement("h2");
  thead.className = "title";
  thead.textContent = `${title}`;

  const fav = createFavIcon(key, title, poster, desc);

  div.appendChild(p);
  div.appendChild(img);
  div.appendChild(thead);
  div.appendChild(fav);
  div.appendChild(descP);

  return div;
}
function createPoster(poster, title) {
  const img = document.createElement("img");
  img.className = "poster";
  img.setAttribute("src", `${poster}`);
  img.setAttribute("alt", `${title}`);
  return img;
}

function createFavIcon(key, title, poster, desc) {
  const h2 = document.createElement("h2");
  const fav = document.createElement("i");

  fav.className = "fa-regular fa-heart fa fa-beat-fade";
  let Fav = getFavourites();
  Fav.map((f) => {
    if (f.Title === title) {
      fav.classList.replace("fa-regular", "fa-solid");
    }
  });
  fav.setAttribute("id", `fav${key}${title}`);
  fav.setAttribute(
    "onclick",
    `handleFavourites(${key},"${title}","${desc}","${poster}")`
  );
  h2.appendChild(fav);
  return h2;
}
