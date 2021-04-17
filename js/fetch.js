export function buscarQuotes(termino){
    const url = `https://quote-garden.herokuapp.com/api/v3/quotes?author=${termino}`;


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
