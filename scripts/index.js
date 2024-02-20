import { displayMovies, showFavourites } from "./display.js";
import { handleSearch } from "./handle.js";

//To get your api key using omdb api
// you have to register your email with omdb api
//after successful registration, api key will be sent to the registered gmail.
const URL = "http://www.omdbapi.com/?apikey=467b36e9";
export default URL;

export async function generateMovies(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export function setFavourites(Fav) {
  localStorage.setItem("fav", JSON.stringify(Fav));
  console.log(getFavourites());
  showFavourites();
  displayMovies();
}

export function getFavourites() {
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

document.querySelector(".search-form").addEventListener("submit", handleSearch);

displayMovies();

export function createFavIcon(key, title, poster, desc) {
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
