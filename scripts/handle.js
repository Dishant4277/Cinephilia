import { generateMovies } from "./index.js";
import { createCard } from "./createTags.js";
import URL from "./index.js";
// import { handleFavourites } from "./createTags.js";
// handling search
export function handleSearch(event) {
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
