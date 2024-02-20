import { getFavourites, setFavourites } from "./index.js";
import { createFavIcon } from "./index.js";

export function createCard(arr) {
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
export function createDiv(key, title, poster, desc) {
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
