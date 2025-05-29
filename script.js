// Función para abrir la invitación (sobre) y reproducir la música
function abrirInvitacion() {
    const envelope = document.getElementById('envelope');
    const invitacion = document.getElementById('invitacion');
    const musica = document.getElementById('musica');

    if (!envelope.classList.contains('open')) {
        // Abrir el sobre solo si aún no está abierto
        envelope.classList.add('open');

        setTimeout(() => {
            envelope.style.display = 'none';
            invitacion.style.display = 'block';

            // Reproducir música al abrir la invitación
            if (musica.paused) {
                musica.play();
            }
        }, 1000);
    } else {
        // Si el sobre ya está abierto, solo controlar la música
        if (musica.paused) {
            musica.play();
        } else {
            musica.pause();
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const sello = document.getElementById("seal");
    if (sello) {
        sello.addEventListener("click", abrirInvitacion);
    }

    // Iniciar contador y cargar datos del invitado al cargar la página
    iniciarContador();
    cargarDatosInvitado();
});

// Función para obtener datos de invitados (sin inputs)
import { invitados } from './invitados.js';  // Ajusta la ruta según tu estructura de archivos
function cargarDatosInvitado() {
    const params = new URLSearchParams(window.location.search);
    const invitadoId = params.get('id');

    if (!invitadoId) {
        alert('ID de invitado no encontrado en el enlace.');
        return;
    }

    const invitado = invitados[invitadoId];

    if (invitado) {
        document.getElementById('nombreInvitado').innerText = invitado.nombre;
        document.getElementById('cantidadPases').innerText = `Pases: ${invitado.pases}`;
    } else {
        alert('Invitado no encontrado.');
    }
}


// Función para iniciar el contador de la fecha del evento
function iniciarContador() {
    const eventoFecha = new Date("September 27, 2025 00:00:00").getTime();

    setInterval(() => {
        const ahora = new Date().getTime();
        const diferencia = eventoFecha - ahora;

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        document.getElementById("dias").innerText = dias;
        document.getElementById("horas").innerText = horas;
        document.getElementById("minutos").innerText = minutos;
        document.getElementById("segundos").innerText = segundos;
    }, 1000);
}

// Función para abrir el lightbox solo al hacer clic en una imagen de la galería
function changePhoto(element) {
    const mainPhotoModal = document.getElementById('main-photo-modal');
    mainPhotoModal.src = element.src;
    openModal();
}

// Función para mostrar el modal
function openModal() {
    const modal = document.getElementById('photo-modal');
    modal.style.display = 'flex';
}

// Función para cerrar el modal
function closeModal(event) {
    if (event.target.id === 'photo-modal' || event.target.className === 'close') {
        const modal = document.getElementById('photo-modal');
        modal.style.display = 'none';
    }
}

// Fade-in effect cuando los elementos se hacen visibles al hacer scroll
document.addEventListener("DOMContentLoaded", function() {
    const elementsToFade = document.querySelectorAll('.fade-in-element');

    const observerOptions = {
        threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToFade.forEach(element => {
        observer.observe(element);
    });
});

// Función para confirmar la asistencia
function confirmarAsistencia() {
    const invitado = "Ana Pérez"; 
    const pases = 3; 

    const mensaje = `Hola, soy ${invitado} y confirmo mi asistencia con ${pases} pases para los quince de Samantha. ¡Gracias por la invitacion! 🎉`;
    const numeroTelefono = '50254678462';

    const enlaceWhatsapp = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(mensaje)}`;
    window.open(enlaceWhatsapp, '_blank');
}

// Función para abrir Waze o Google Maps
function elegirAplicacion() {
    const enlaceWaze = 'https://waze.com/ul/h9fxdtmyzr';

    window.open(enlaceGoogleMaps, '_blank');
    setTimeout(() => {
        window.open(enlaceWaze, '_blank');
    }, 1000);
}

function elegirAplicacionOtraDireccion() {
    const enlaceWaze = 'https://waze.com/ul/h9fxdtmyzr';

    window.open(enlaceGoogleMaps, '_blank');
    setTimeout(() => {
        window.open(enlaceWaze, '_blank');
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
    // Mostrar/ocultar formulario
    const mostrarFormularioBtn = document.getElementById("mostrarFormularioBtn");
    const formularioDeseo = document.getElementById("formularioDeseo");
  
    mostrarFormularioBtn.addEventListener("click", () => {
      formularioDeseo.style.display =
        formularioDeseo.style.display === "none" ? "block" : "none";
    });
  
    // Mostrar/ocultar deseos
    const verDeseosBtn = document.getElementById("verDeseosBtn");
    const wishesContainer = document.getElementById("wishesContainer");
    let deseosVisibles = false;
  
    verDeseosBtn.addEventListener("click", async () => {
      if (!deseosVisibles) {
        wishesContainer.innerHTML = "<p>Cargando deseos...</p>";
        wishesContainer.style.display = "block";
  
        const dbRef = firebase.database().ref("buenos_deseos");
        dbRef.once("value", (snapshot) => {
          wishesContainer.innerHTML = "";
  
          if (!snapshot.exists()) {
            wishesContainer.innerHTML =
              "<p>No hay deseos aún. Sé el primero 💌</p>";
          } else {
            snapshot.forEach((childSnapshot) => {
              const data = childSnapshot.val();
              wishesContainer.innerHTML += `
                <div class="wish-card">
                  <strong>${data.nombre}</strong><br/>
                  <em>${data.mensaje}</em>
                </div>
              `;
            });
          }
  
          verDeseosBtn.textContent = "Ocultar buenos deseos";
          deseosVisibles = true;
        });
      } else {
        wishesContainer.innerHTML = "";
        wishesContainer.style.display = "none";
        verDeseosBtn.textContent = "Ver buenos deseos";
        deseosVisibles = false;
      }
    });
  });
  