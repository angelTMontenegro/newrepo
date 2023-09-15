// public/js/main.js

// Espera a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Escucha el evento submit del formulario de creación de publicaciones
    const createForm = document.querySelector('#create-form');
    if (createForm) {
      createForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        // Obtiene los valores del formulario
        const title = document.querySelector('#title').value;
        const content = document.querySelector('#content').value;
        const imageUrl = document.querySelector('#imageUrl').value;
  
        // Envía los datos al servidor para crear una nueva publicación
        fetch('/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content, imageUrl }),
        })
          .then((response) => response.json())
          .then((data) => {
            // Redirige a la página de inicio después de crear una publicación
            window.location.href = '/';
          })
          .catch((error) => {
            console.error('Error al crear la publicación:', error);
          });
      });
    }
  });
  