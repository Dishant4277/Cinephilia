import { generateMovies, getFavourites } from "./index.js";
import { createDiv } from "./createTags.js";
import URL from "./index.js";
// import { handleFavourites } from "./createTags.js";

export function displayMovies() {
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

// show favourites
export function showFavourites() {
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
