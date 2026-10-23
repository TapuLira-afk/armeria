// =========================================================================
// 1. MODELO DE DATOS Y CATÁLOGO
// =========================================================================

// Diseña aquí el modelo de la armería. Puedes elegir el nombre de la clase,
// organizar los datos como prefieras y añadir propiedades o comportamientos.
// El resto de la aplicación necesita poder leer estos datos de cada producto:
// nombre, imagen, precioEntero, precioOriginal, rareza, tipo y bonus.
// También necesitará una forma de formatear precios, aplicar el efecto de una
// compra y obtener una copia rebajada sin modificar el producto original.

import { Objeto } from "./model/Objeto.js";
// =========================================================================
// 2. MERCADO Y CATALOGO PREDEFINIDO
// =========================================================================

// Estos objetos son solo los datos iniciales. Decide cómo convertirlos en las
// instancias de tu modelo y guarda el resultado en productosIniciales.
const datosIniciales = [
  {
    nombre: "Espada de Hierro",
    imagen: "https://images.unsplash.com/photo-1440711085503-89d8ec455791?q=80&w=1098&auto=format&fit=crop",
    precioEntero: 1500, rareza: "Común", tipo: "Arma", bonus: 25
  },
  {
    nombre: "Escudo Antiguo",
    imagen: "https://images.unsplash.com/photo-1778940454592-f9e9595ade99?q=80&w=687&auto=format&fit=crop",
    precioEntero: 2000, rareza: "Común", tipo: "Armadura", bonus: 15
  },
  {
    nombre: "Poción de Vida",
    imagen: "https://images.unsplash.com/photo-1610706936277-f01646bb90c6?q=80&w=687&auto=format&fit=crop",
    precioEntero: 500, rareza: "Común", tipo: "Consumible", bonus: 200
  },
  {
    nombre: "Mandoble Rúnico",
    imagen: "https://images.unsplash.com/photo-1594399430386-913fd5defaa4?q=80&w=1170&auto=format&fit=crop",
    precioEntero: 4500, rareza: "Rara", tipo: "Arma", bonus: 60
  },
  {
    nombre: "Coraza Solar",
    imagen: "https://images.unsplash.com/photo-1664998064103-4075dad55a79?q=80&w=687&auto=format&fit=crop",
    precioEntero: 6000, rareza: "Legendaria", tipo: "Armadura", bonus: 80
  },
  {
    nombre: "Elixir Ancestral",
    imagen: "https://plus.unsplash.com/premium_photo-1695385055449-73d3748a0d9c?q=80&w=1170&auto=format&fit=crop",
    precioEntero: 2500, rareza: "Rara", tipo: "Consumible", bonus: 500
  }
];

// Convierte datosIniciales en objetos de tu modelo.
// const productosIniciales = datosIniciales.map(datos => ...);
// Mientras desarrollas, puedes usar una colección pequeña de prueba.
const productosIniciales = [];

// Recorremos el array de objetos, creamos y guardamos el objeto Objeto apartir de los objetos del array
datosIniciales.forEach(obj => {
  productosIniciales.push(new Objeto(obj.nombre, obj.imagen, obj.rareza, obj.tipo, obj.bonus, obj.precioEntero))
});

// Array de trabajo dinámico
let catalogoMercado = [...productosIniciales];

// Objeto Jugador
const jugador = {
  vida: 1000,
  ataque: 150,
  defensa: 80,
  oroCentimos: 8000 // 80,00 €
};

// =========================================================================
// 3. FUNCIONES DE LÓGICA DE MERCADO (A diseñar)
// =========================================================================

// Completa las operaciones que necesita la interfaz: filtrar por rareza,
// buscar por nombre y crear una colección nueva con descuentos por tipo o
// rareza. Decide si prefieres funciones normales o funciones flecha y cómo
// compones las operaciones, siempre evitando modificar la lista original.

// Selecciona aleatoriamente una oferta, la aplica al catálogo e informa en la UI
function generarOfertaAleatoria() {
  const criterios = ['Arma', 'Armadura', 'Consumible', 'Legendaria', 'Rara'];
  const porcentajes = [10, 15, 20, 25, 30, 50];

  const criterioElegido = criterios[Math.floor(Math.random() * criterios.length)];
  const porcentajeElegido = porcentajes[Math.floor(Math.random() * porcentajes.length)];

  // Actualizar catálogo global con los productos rebajados
  catalogoMercado = aplicarDescuentoFiltro(productosIniciales, criterioElegido, porcentajeElegido);

  // Mostrar la oferta activa en el elemento HTML #texto-oferta-dia
  const textoOferta = document.getElementById('texto-oferta-dia');
  textoOferta.textContent = `${porcentajeElegido}% de descuento en objetos de tipo/rareza: ${criterioElegido}`;

  aplicarFiltrosCombos();
}

function aplicarDescuentoFiltro(productosIniciales, criterioElegido, porcentajeElegido) {

  let productos = productosIniciales.map(p => {
    let objeto = new Objeto(p.nombre, p.imagen, p.rareza, p.tipo, p.bonus, p.precio)

    if (p.tipo.toLowerCase() === criterioElegido.toLowerCase() || p.rareza.toLowerCase() === criterioElegido.toLowerCase()) {
      objeto.descuento(porcentajeElegido)
    }

    return objeto;
  });

  return productos
}

function buscarPorRareza(objetos, rareza) {
  if (rareza === 'todas') {
    return [...objetos];
  }


  return objetos.filter(o => o.rareza === rareza);
}

function buscarPorNombre(objetos, texto) {
  const textoFormateado = String(texto ?? "").trim().toLowerCase();

  if (textoFormateado === "") {
    return [...objetos];
  };

  return objetos.filter(o => o.nombre.toLowerCase().includes(textoFormateado));
}



// =========================================================================
// 4. INTERACCIÓN CON EL DOM Y NOTIFICACIONES (Lógica provista)
// =========================================================================

const contenedorCatalogo = document.getElementById('contenedor-catalogo');
const inputBuscar = document.getElementById('input-buscar');
const selectRareza = document.getElementById('select-rareza');
const bannerNotificacion = document.getElementById('banner-notificacion');
const btnNuevaOferta = document.getElementById('btn-nueva-oferta');

function mostrarNotificacion(mensaje, esExito) {
  bannerNotificacion.textContent = mensaje;
  bannerNotificacion.className = `banner-notificacion ${esExito ? 'exito' : 'error'}`;

  setTimeout(() => {
    bannerNotificacion.className = 'banner-notificacion oculto';
  }, 3000);
}

function renderizarJugador() {
  document.getElementById('stat-hp').textContent = jugador.vida;
  document.getElementById('stat-atk').textContent = jugador.ataque;
  document.getElementById('stat-def').textContent = jugador.defensa;
  document.getElementById('stat-oro').textContent = (jugador.oroCentimos / 100).toFixed(2).replace('.', ',') + ' €';
}

function renderizarCatalogo(lista) {
  contenedorCatalogo.innerHTML = '';

  lista.forEach((producto, index) => {
    const tieneRebaja = producto.precio < producto.precioOriginal;
    const card = document.createElement('div');
    card.className = `tarjeta-producto ${producto.rareza.toLowerCase()}`;

    card.innerHTML = `
      <div class="producto-img-container">
        <img src="${producto.imagen}" alt="${producto.nombre}">
      </div>
      <div class="producto-header">
        <span class="producto-nombre">${producto.nombre}</span>
        <span class="badge-rareza">${producto.rareza}</span>
      </div>
      <div class="producto-info">
        <span>Tipo: ${producto.tipo}</span><br>
        <span class="producto-bonus">+${producto.bonus} ${producto.tipo === 'arma' ? 'ATK' : producto.tipo === 'armadura' ? 'DEF' : 'HP'}</span>
      </div>
      <div class="producto-footer">
        <div class="precio-contenedor">
          ${tieneRebaja ? `<span class="precio-original">${producto.precioOriginalEuro()}</span>` : ''}
          <span class="producto-precio">${producto.precioEuro()}</span>
        </div>
        <button class="btn-comprar" data-index="${index}">Comprar</button>
      </div>
    `;
    contenedorCatalogo.appendChild(card);
  });

  document.querySelectorAll('.btn-comprar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      comprarProducto(lista[idx]);
    });
  });
}

function comprarProducto(producto) {
  if (jugador.oroCentimos >= producto.precio) {
    producto.aplicarObjeto(jugador);
    renderizarJugador();
    mostrarNotificacion(`¡Has comprado ${producto.nombre} exitosamente!`, true);
  } else {
    mostrarNotificacion(`No tienes suficiente oro para comprar ${producto.nombre}.`, false);
  }
}

function aplicarFiltrosCombos() {
  const texto = inputBuscar.value;
  const rareza = selectRareza.value;

  let resultado = buscarPorNombre(catalogoMercado, texto);
  resultado = buscarPorRareza(resultado, rareza);

  renderizarCatalogo(resultado);
}

// Eventos
inputBuscar.addEventListener('input', aplicarFiltrosCombos);
selectRareza.addEventListener('change', aplicarFiltrosCombos);
btnNuevaOferta.addEventListener('click', generarOfertaAleatoria);

// Inicialización
renderizarJugador();
generarOfertaAleatoria();