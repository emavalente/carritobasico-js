const modalCarrito = document.querySelector("#carrito");
const cursos = document.querySelector("#lista-cursos");
const listaCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

let productos = [];

cargarEventListeners();
function cargarEventListeners() {
  // Agrego evento a la lista completa.
  cursos.addEventListener("click", agregarCurso);

  // Agrego evento al boton borrar del carrito.
  modalCarrito.addEventListener("click", borrarCurso);

  // Agrego evento al boton vaciar carrito.
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
}

function agregarCurso(e) {
  e.preventDefault();
  // Si el elemento donde hago click tiene la clase...
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
    generarHtmlProducto();
    console.log(productos);
  }
}

function leerDatosCurso(curso) {
  // crea un objeto del curso que ingresa por parametro.
  const infocurso = {
    id: curso.querySelector("a").getAttribute("data-id"),
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    cantidad: 1,
  };

  // Revisar si existe el producto
  const existe = productos.some((curso) => curso.id === infocurso.id);

  if (existe) {
    const cursos = productos.map((curso) => {
      if (curso.id === infocurso.id) {
        curso.cantidad++;
        return curso; //  retorna el objeto actualizado
      } else {
        return curso; // retorna los objetos no actualizados
      }
    });
    productos = [...cursos];
  } else {
    productos = [...productos, infocurso];
  }
}

function generarHtmlProducto() {
  // Limpiar el modal
  limpiarHTML();

  productos.forEach((producto) => {
    // Aplico destructuring al objeto.
    const { imagen, titulo, precio, cantidad, id } = producto;

    // Creo una fila con la info del producto.
    const row = document.createElement("tr");
    row.innerHTML = `
      <tr>
        <td><img src=${imagen}></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
          <a href=# class="borrar-curso" data-id="${id}"> X </a>
        </td>
      </tr>
    `;

    // agrego la fila como hijo del modal.
    listaCarrito.appendChild(row);
  });
}

function limpiarHTML() {
  // modalCarrito.innerHTML = ``;

  // forma mas rapida que innerHTML
  while (listaCarrito.firstChild) {
    listaCarrito.removeChild(listaCarrito.firstChild);
  }
}

function borrarCurso(e) {
  e.preventDefault();
  // Si hago click en el boton "X"
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id"); // tomo el id del boton "X"
    productos.forEach((curso) => {
      if (curso.id === cursoId && curso.cantidad > 1) {
        curso.cantidad--;
      } else {
        productos = productos.filter((producto) => producto.id !== cursoId);
      }
    });
    generarHtmlProducto();
    console.log(productos);
  }
}

function vaciarCarrito(e) {
  e.preventDefault();

  productos = [];

  limpiarHTML();
}
