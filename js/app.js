const formulario = document.querySelector("#formulario");
const informacion = document.querySelector(".container-quotes");
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
    console.log(terminoBusqueda)
}

function buscarQuotes(termino){
    const url = `https://quote-garden.herokuapp.com/api/v3/quotes?author=${termino}`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarQuotes(resultado.data);
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

    while(informacion.firstChild){
        informacion.removeChild(informacion.firstChild)
    }

    const author = quotes[0].quoteAuthor;
    const user = document.querySelector(".user");
    user.textContent = author;

    quotes.forEach(quote => {

        const {quoteText} = quote;

        const card = document.createElement('div');
        card.classList.add('card-quote');

        const titleQuote = document.createElement('p');
        titleQuote.classList.add('title-quote');
        titleQuote.textContent = "Techonoly"

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

}