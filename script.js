//api

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=12";

const galeria = document.getElementById("galeria");

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const pokemons = data.results; 
    pokemons.forEach(poke => {
      fetch(poke.url)
        .then(res => res.json())
        .then(info => {
          const div = document.createElement("div");
          div.classList.add("card");
          div.innerHTML = `
            <h2>${info.name}</h2>
            <img src="${info.sprites.front_default}" alt="${info.name}">
            <p><strong>Tipo:</strong> ${info.types.map(t => t.type.name).join(", ")}</p>
            <p><strong>Peso:</strong> ${(info.weight/10).toFixed(1)} kg</p>
          `;
          galeria.appendChild(div);
        });
    });
  })
  .catch(err => console.log("Error:", err));

