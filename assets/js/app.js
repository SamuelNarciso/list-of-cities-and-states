// let lista_ubicaciones;
const cities = [];

const endpoint =
	'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const nuevoLi = document.createElement('li');
const suggestionsUl = document.querySelector('.suggestions');
const searchInput = document.querySelector('.search');

fetch(endpoint)
	.then((blob) => blob.json())
	.then((data) => cities.push(...data));

const filtrar_busquedas = (word) => {
	return cities.filter((place) => {
		const regex = new RegExp(word, 'gi');
		return place.city.match(regex) || place.state.match(regex);
	});
};

const colocarResultados = (palabra) => {
	const ciudades_filtradas = filtrar_busquedas(palabra);
	const HTML = ciudades_filtradas.map((place) => {
		// const datali = document.createTextNode(place.city);

		return `<li>${place.city} , ${place.state} </li>`;
	});

	console.log(...HTML);

	suggestionsUl.innerHTML = (HTML);
};

searchInput.addEventListener('keyup', (e) => {
if(e.target.value){
	colocarResultados(e.target.value);

}else{
	suggestionsUl.innerHTML=('<li>Filter for a city</li> <li>or a state</li>')
}
});
