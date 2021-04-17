import {buscarQuotes} from './fetch.js';

const formulario = document.querySelector("#formulario");
const informacion = document.querySelector(".container-quotes");
const resultado = document.querySelector(".resultado");
const container = document.querySelector('.container')
const ramdomBtn = document.querySelector('.ramdon');

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
    ramdomBtn.addEventListener('click', buscarRandom);
}

function validarFormulario(e){
    e.preventDefault();
    const terminoBusqueda = document.querySelector(".termino").value;

    if (terminoBusqueda === "") {
        mostrarMensaje("Debe agregar un autor a buscar");
        return;
    }

    buscarQuotes(terminoBusqueda);
}


function buscarQuotes(termino){
    const url = `https://quote-garden.herokuapp.com/api/v3/quotes?author=${termino}`;

    spinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            if (resultado.data.length === 0) {
                mostrarMensaje("No existen datos, intente buscar a otro autor");
                formulario.reset();
            }else{
                mostrarQuotes(resultado.data);
            }
        })
}

function buscarRandom(){

    const url = `https://quote-garden.herokuapp.com/api/v3/quotes?limit=50`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            const ramdom = Math.round(Math.random()*50,0);
            const author = resultado.data[ramdom].quoteAuthor;
            buscarQuotes(author);
        })
    
}


function mostrarQuotes(quotes){

    limpiarHtml();

    const author = quotes[0].quoteAuthor;
    const user = document.querySelector(".user");
    user.textContent = author;

    quotes.forEach(quote => {

        const {quoteText, quoteGenre} = quote;

        const card = document.createElement('div');
        card.classList.add('card-quote');

        const titleQuote = document.createElement('p');
        titleQuote.classList.add('title-quote');
        titleQuote.textContent = quoteGenre

        const parrafoQuote = document.createElement('p');
        parrafoQuote.classList.add('parrafo-quote');
        parrafoQuote.textContent = `"${quoteText}"`;

        card.appendChild(titleQuote);
        card.appendChild(parrafoQuote);
        informacion.appendChild(card);

        formulario.reset();
    })

}

function mostrarMensaje (mensaje){

    limpiarHtml();
    const user = document.querySelector('.user');
    user.textContent = "";
    const error = document.querySelector('.error');
    if (!error) {
        const alerta = document.createElement('p');
        alerta.classList.add('error');
        alerta.textContent = mensaje ;
        container.appendChild(alerta)
        
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function limpiarHtml(){
    
    while(informacion.firstChild){
        informacion.removeChild(informacion.firstChild)
    }
}

function spinner(){
    limpiarHtml();

    const spinner = document.createElement('div');
    spinner.classList.add('sk-chase');

    spinner.innerHTML = 
    `
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
    `
}