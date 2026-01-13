// Elementos del DOM
const formulario = document.getElementById('miFormulario');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

// Campos
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const edadInput = document.getElementById('edad');

// Mensajes de error
const errores = {
    nombre: document.getElementById('error-nombre'),
    email: document.getElementById('error-email'),
    password: document.getElementById('error-password'),
    confirm: document.getElementById('error-confirm'),
    edad: document.getElementById('error-edad')
};

// Validaciones en tiempo real
nombreInput.addEventListener('input', validarNombre);
emailInput.addEventListener('input', validarEmail);
passwordInput.addEventListener('input', validarTodoPassword);
confirmInput.addEventListener('input', validarTodoPassword);
edadInput.addEventListener('input', validarEdad);

resetBtn.addEventListener('click', reiniciarFormulario);
formulario.addEventListener('submit', enviarFormulario);

// Funciones de validación
function validarNombre() {
    const valor = nombreInput.value.trim();
    const esValido = valor.length >= 3;
    
    toggleEstado(nombreInput, esValido, errores.nombre, 
        esValido ? '' : '❌ Nombre debe tener al menos 3 caracteres');
    
    validarFormulario();
}

function validarEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const esValido = emailRegex.test(emailInput.value);
    
    toggleEstado(emailInput, esValido, errores.email,
        esValido ? '' : '❌ Email inválido (ej: usuario@dominio.com)');
    
    validarFormulario();
}

function validarTodoPassword() {
    validarPassword();
    validarConfirmPassword();
}

function validarPassword() {
    const pass = passwordInput.value;
    const tieneNumero = /\d/.test(pass);
    const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const esValido = pass.length >= 8 && tieneNumero && tieneEspecial;
    
    toggleEstado(passwordInput, esValido, errores.password,
        esValido ? '✅ Contraseña válida' : 
        `❌ Mínimo 8 caracteres + ${!tieneNumero?'número':''}${!tieneEspecial?', especial':''}`);
    
    validarFormulario();
}

function validarConfirmPassword() {
    const pass = passwordInput.value;
    const confirm = confirmInput.value;
    const esValido = confirm === pass;
    
    toggleEstado(confirmInput, esValido, errores.confirm,
        esValido ? '✅ Coincide' : '❌ Las contraseñas no coinciden');
    
    validarFormulario();
}

function validarEdad() {
    const edad = parseInt(edadInput.value);
    const esValido = edad >= 18 && !isNaN(edad);
    
    toggleEstado(edadInput, esValido, errores.edad,
        esValido ? '✅ Mayor de edad' : '❌ Debe ser mayor o igual a 18 años');
    
    validarFormulario();
}

// Función helper para cambiar estado visual
function toggleEstado(input, valido, errorElement, mensaje) {
    if (valido) {
        input.classList.add('input-valido');
        input.classList.remove('input-invalido');
        errorElement.textContent = mensaje;
        errorElement.classList.remove('error-visible');
    } else {
        input.classList.add('input-invalido');
        input.classList.remove('input-valido');
        errorElement.textContent = mensaje;
        errorElement.classList.add('error-visible');
    }
}

// Validar formulario completo
function validarFormulario() {
    const todosValidos = 
        nombreInput.classList.contains('input-valido') &&
        emailInput.classList.contains('input-valido') &&
        passwordInput.classList.contains('input-valido') &&
        confirmInput.classList.contains('input-valido') &&
        edadInput.classList.contains('input-valido');
    
    submitBtn.disabled = !todosValidos;
    submitBtn.textContent = todosValidos ? '✅ Enviar Formulario' : '❌ Completar todos los campos';
}

// Reiniciar formulario
function reiniciarFormulario() {
    formulario.reset();
    Object.values(errores).forEach(error => {
        error.textContent = '';
        error.classList.remove('error-visible');
    });
    
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('input-valido', 'input-invalido');
    });
    
    submitBtn.disabled = true;
    submitBtn.textContent = '❌ Completar todos los campos';
}

// Enviar formulario
function enviarFormulario(e) {
    e.preventDefault();
    
    const datos = {
        nombre: nombreInput.value,
        email: emailInput.value,
        edad: edadInput.value
    };
    
    alert(`
🎉 ¡FORMULARIO ENVIADO EXITOSAMENTE!

👤 Nombre: ${datos.nombre}
📧 Email: ${datos.email}
🎂 Edad: ${datos.edad}

✅ Todos los campos validados correctamente
    `);
    
    reiniciarFormulario();
}
