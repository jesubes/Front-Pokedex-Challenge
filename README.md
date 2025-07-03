Aplicación Frontend de Pokédex con React y Gestión de Roles
Este es el frontend del proyecto Pokédex Full-Stack. Es una Aplicación de Una Sola Página (SPA) construida con React.js que consume tanto la PokéAPI pública como una API REST privada para la autenticación y gestión de usuarios con diferentes niveles de permiso.

✨ Características Principales
Sección Pública (Accesible para todos)
Pokédex Interactiva: Visualización de los 151 Pokémon originales en una cuadrícula moderna y responsiva.


Vista Detallada: Al hacer clic en un Pokémon, se abre un modal con información completa:

Imagen oficial de alta calidad.

Altura y Peso.

Estadísticas base (HP, Ataque, Defensa, etc.) representadas en barras de progreso.

Sección de Autenticación y Administración
Sistema de Login: Página de inicio de sesión segura que se comunica con el backend para validar credenciales.

Gestión de Sesión con JWT: Manejo del estado de autenticación en toda la aplicación utilizando JSON Web Tokens.

Navegación Dinámica: La barra de navegación se adapta, mostrando opciones diferentes si el usuario está o no autenticado, y si tiene permisos de administrador.

Rutas Protegidas por Rol:

Solo usuarios con rol admin pueden acceder al panel de gestión de usuarios.

Panel de Administración (CRUD de Usuarios):

Interfaz completa para Crear, Leer, Actualizar y Eliminar usuarios del sistema.

Visualización clara de todos los usuarios y sus roles.

Modales intuitivos para la edición, creación y confirmación de acciones destructivas.

🛠️ Tecnologías y Arquitectura
React.js (v18+): Utilizando Hooks y componentes funcionales para una UI moderna y eficiente.

React Router (v6): Para la gestión de rutas del lado del cliente y la creación de una experiencia de navegación fluida.

Tailwind CSS: Framework de CSS "utility-first" para un diseño rápido, personalizable y responsivo sin salir del HTML.

Axios: Cliente HTTP para realizar peticiones a la API del backend de forma limpia y con manejo de interceptores para adjuntar tokens de autenticación.

Context API: Para la gestión del estado global de autenticación (AuthContexto).

🚀 Instalación y Puesta en Marcha
Sigue estos pasos para levantar el cliente en tu entorno local.

1. Requisitos Previos
Node.js: Versión 16.x o superior.

NPM o Yarn: Gestor de paquetes de Node.js.

Backend en Funcionamiento: Es indispensable que el servidor backend del proyecto esté instalado, configurado y corriendo. Este frontend depende de él para funcionar.

2. Pasos de Instalación
a. Clona el repositorio y navega a la carpeta del cliente:

# git clone https://github.com/jesubes/Front-Pokedex-Challenge.git

cd Front-Pokedex-Challenge/frontPokedex


b. Instala las dependencias del proyecto:

npm install

(o yarn install si usas Yarn)

c. Configura las Variables de Entorno:
La aplicación necesita saber la URL de tu API backend. Crea un archivo llamado .env en la raíz de la carpeta /cliente y añade la siguiente línea:

# /cliente/.env

# URL base de la API del backend que está corriendo localmente
VITE_APP_API_BASE_URL=http://localhost:8800/api/


3. Ejecutar la Aplicación
Una vez completada la configuración, inicia el servidor de desarrollo:

npm start

(o yarn start)

Esto abrirá la aplicación en tu navegador, generalmente en http://localhost:5173 

📁 Estructura y Lógica del Proyecto
La organización del código en src/ está diseñada para ser intuitiva y escalable.

api/: Encapsula toda la lógica de comunicación con el exterior. Cada archivo (authServicio.js, usuarioServicio.js) agrupa funciones relacionadas con un recurso específico de la API, haciendo que los componentes sean agnósticos a la implementación de las llamadas HTTP.

contexto/: El corazón del estado global. AuthContexto.js provee un contexto que almacena la información del usuario (usuario), su estado de autenticación (estaAutenticado), y las funciones para iniciarSesion y cerrarSesion. Cualquier componente envuelto en el AuthProveedor puede acceder a esta información usando el hook useAuth().

componentes/: Contiene componentes de UI reutilizables.

layout/: Componentes estructurales como Cabecera.js.

RutaProtegida.js: Un componente de orden superior crucial que envuelve las rutas en App.js. Su lógica es simple pero poderosa: verifica si el usuario está autenticado y si su rol está incluido en la lista de roles permitidos para esa ruta. Si no cumple, lo redirige.

paginas/: Son los componentes que representan una vista o pantalla completa de la aplicación (ej. PokedexPagina.js, LoginPagina.js).

🎨 Recomendaciones de Estilo y Theming
El proyecto utiliza Tailwind CSS con una apariencia oscura fija. 

Aplica clases con el prefijo dark:: Modifica tus componentes para que tengan una apariencia por defecto y una para el modo oscuro.
