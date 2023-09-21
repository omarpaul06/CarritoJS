//VARIABLES
const listaCursos = document.querySelector('#lista-cursos');
const carrito = document.querySelector('#lista-carrito tbody')
let articulosCarrito = [];

 eventListener();
function eventListener(){
    listaCursos.addEventListener('click', seleccionarCurso);
    
}

function seleccionarCurso(e){
    e.preventDefault();
    
    if(e.target.classList.contains('agregar-carrito')){
        const detalle = e.target.parentElement.parentElement;
        leerDatosCurso(detalle);
    }

}

function leerDatosCurso(curso){
    
    const desCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('p span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
        
    }
    articulosCarrito = [...articulosCarrito, desCurso];
    
    carritoHTML();
   
}

function carritoHTML() {
    limpiarHTML();

    articulosCarrito.forEach( curso =>{
        const row = document.createElement('tr');
        const {imagen, titulo, precio, cantidad, id} = curso;
        row.innerHTML = `
        <td> <img src="${imagen}" width="100"> </td>
        <td> ${titulo} </td>
        <td> ${precio}</td>
        <td> ${cantidad}</td>
        <td> <a href="#" class="borrar-curso" data-id=${id}>X</a></td>
        `

        carrito.appendChild(row);
    })
}

function limpiarHTML(){
    while(carrito.firstChild){
        carrito.removeChild(carrito.firstChild);
    }
}