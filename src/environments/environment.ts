export const environment = {
  // BASE_API: 'http://localhost:8080/MiRutina/api',
  BASE_API: (window.location.protocol === 'http:'
              ? 'http://'
              : 'https://')
              + 'proyectomodularbackend-production.up.railway.app/api',
};