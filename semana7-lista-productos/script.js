// 📦 Arreglo de productos iniciales
let productos = [
    {
        nombre: "Laptop Gaming UEA",
        precio: 1299.99,
        descripcion: "Potente laptop para estudiantes de ingeniería con procesador i7 y 16GB RAM"
    },
    {
        nombre: "Mouse Ergonómico",
        precio: 29.99,
        descripcion: "Mouse inalámbrico ergonómico ideal para largas sesiones de programación"
    },
    {
        nombre: "Teclado Mecánico",
        precio: 89.99,
        descripcion: "Teclado mecánico RGB con switches silenciosos para desarrolladores"
    }
];

// Elementos del DOM
const listaProductos = document.getElementById('listaProductos');
const contadorProductos = document.getElementById('contadorProductos');

// Función principal: Renderizar lista
function renderizarProductos() {
    listaProductos.innerHTML = '';
    
    productos.forEach((producto, index) => {
        // Crear plantilla dinámicamente
        const li = document.createElement('li');
        li.className = 'producto-item';
        li.innerHTML = `
            <div class="producto-nombre">${producto.nombre}</div>
            <div class="producto-precio">$${producto.precio.toFixed(2)}</div>
            <div class="producto-desc">${producto.descripcion}</div>
        `;
        
        listaProductos.appendChild(li);
    });
    
    // Actualizar contador
    contadorProductos.textContent = `Total: ${productos.length} productos`;
}

// Función agregar nuevo producto
function agregarProducto() {
    const nombre = document.getElementById('nombreProducto').value.trim();
    const precio = parseFloat(document.getElementById('precioProducto').value);
    const descripcion = document.getElementById('descProducto').value.trim();
    
    // Validaciones básicas
    if (!nombre || !descripcion || isNaN(precio) || precio <= 0) {
        alert('⚠️ Completa todos los campos correctamente');
        return;
    }
    
    // Agregar al arreglo
    productos.push({
        nombre: nombre,
        precio: precio,
        descripcion: descripcion
    });
    
    // Limpiar inputs
    document.getElementById('nombreProducto').value = '';
    document.getElementById('precioProducto').value = '';
    document.getElementById('descProducto').value = '';
    
    // Re-renderizar
    renderizarProductos();
    
    // Animación
    const ultimoProducto = listaProductos.lastElementChild;
    ultimoProducto.style.animation = 'fadeInUp 0.5s ease';
}

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', function() {
    renderizarProductos();
});

// Permitir Enter para agregar
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarProducto();
    }
});
