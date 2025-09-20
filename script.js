// Definimos la lógica para traer la información de la API
const getInputValue = () => {
    const input = document.getElementById("pokemon_input");
    const nombre = input.value.toLowerCase().trim();

    if (nombre === "") {
        document.getElementById("show-info").innerHTML = "<p>Escribe un nombre primero</p>";
        return;
    }

    getApiData(nombre);
};

const getApiData = (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    axios.get(url)
        .then(response => {
            const data = response.data;
            const info = {
                name: data.name,
                weight: data.weight,
                height: data.height,
                types: data.types.map(t => t.type.name).join(", "),
                image: data.sprites.front_default
            };
            display_data(info);
        })
        .catch(error => {
            document.getElementById("show-info").innerHTML = `<p>No se encontró el Pokémon 😢</p>`;
        });
};

const display_data = (data) => {
    const response = document.getElementById("show-info");
    response.innerHTML = `
        <div class="pokemon-container">
            <div class="pokemon-img">
                <img src="${data.image}" alt="${data.name}">
            </div>
            <div class="pokemon-info">
                <h2>${data.name.toUpperCase()}</h2>
                <p><strong>Peso:</strong> ${data.weight}</p>
                <p><strong>Altura:</strong> ${data.height}</p>
                <p><strong>Tipos:</strong> ${data.types}</p>
            </div>
        </div>
    `;
};

