//VARIABLES
const listaCursos = document.querySelector('#lista-cursos');
let carrito = [];
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

//EVENTOS
eventListener();
function eventListener(){
    listaCursos.addEventListener('click', leerDatosCurso);
    vaciarCarritoBtn.addEventListener('click', ()=> {
        carrito = [];
        limpiarHTML();
    });

    //Muestra los cursos del Local Storage
    document.addEventListener('DOMContentLoaded', ()=>{
        carrito = JSON.parse( localStorage.getItem('datos')) || [];

        carritoHTML();
    })
    
    listaCarrito.addEventListener('click', eliminarCurso);
}

//FUNCIONES
function leerDatosCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        cursoSeleccionado = e.target.parentElement.parentElement;
        detalleCurso(cursoSeleccionado);
    }
    
}

function detalleCurso(curso){
    const detalleCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('p span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Verifica si selecciona el mismo curso
    const existe = carrito.some(curso => curso.id === detalleCurso.id);
    if(existe){
       //Actualizamos la cantidad
        const cursos = carrito.map(curso => {
            if(curso.id === detalleCurso.id){
                curso.cantidad++;
                return curso; //Retorna el objeto actualizado
            }else{
                return curso; //Retorna los objetos que no son duplicados
            }   
        });
        carrito = [...cursos]; //Cuenta
    }else{
        carrito = [...carrito,detalleCurso]
    }


    console.log(carrito);
    carritoHTML();
}

function carritoHTML(){

    limpiarHTML();
    carrito.forEach(curso =>{
        const row = document.createElement('tr');
        const {imagen, titulo, precio, id, cantidad} = curso;
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="" class="borrar-curso" data-id=${id}>X</a></td>
        `
        listaCarrito.appendChild(row);
    });

    sincronizarStorage();
   
}

function sincronizarStorage(){
    const detalleCursoString = JSON.stringify(carrito);
    localStorage.setItem('datos',detalleCursoString);
    
}

function limpiarHTML(){
    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild)
    }
}

function eliminarCurso(e){
    e.preventDefault();

    if (e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        const existe = carrito.some(curso => {
            if(curso.id === cursoId){
                if(curso.cantidad > 1){
                    curso.cantidad--;
                    carritoHTML();
                }else{
                    carrito = carrito.filter(curso => curso.id !== cursoId);
                    carritoHTML();
                }
            }
        })
    }
}