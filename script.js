const galeria = document.getElementById("galeria");
const btnBuscar = document.getElementById("Buscar_Pokemon");
const inputPokemon = document.getElementById("Nombre_Pokemon");

// función para crear una carta con info del Pokémon
function crearCarta(pokemon) {
  const div = document.createElement("div");
  div.classList.add("carta");
  div.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p><strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
    <p><strong>Peso:</strong> ${(pokemon.weight / 10).toFixed(1)} kg</p>
  `;
  galeria.appendChild(div);
}

// función para cargar varios pokémon al inicio
function cargarPokemones() {
  galeria.innerHTML = "";
  fetch("https://pokeapi.co/api/v2/pokemon?limit=12")
    .then(res => res.json())
    .then(data => {
      data.results.forEach(p => {
        fetch(p.url)
          .then(res => res.json())
          .then(info => crearCarta(info));
      });
    })
    .catch(err => console.log("Error cargando pokemones:", err));
}

// función para buscar un pokémon por nombre
function buscarPokemon() {
  const nombre = inputPokemon.value.toLowerCase().trim();
  if (nombre === "") {
    alert("Escribe un nombre de Pokémon");
    return;
  }
  galeria.innerHTML = ""; // limpia galería
  fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Pokemon no encontrado");
      }
      return res.json();
    })
    .then(data => crearCarta(data))
    .catch(err => {
      galeria.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:red;">No se encontró el Pokémon 😢</p>`;
    });
}

// eventos
btnBuscar.addEventListener("click", buscarPokemon);

// carga inicial
cargarPokemones();


