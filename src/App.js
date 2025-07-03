
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProveedor } from './contexto/AuthContexto';
import PokedexPagina from './paginas/PokedexPagina';
import LoginPagina from './paginas/LoginPagina';
import GestionUsuariosPagina from './paginas/admin/GestionUsuariosPagina';
import Cabecera from './componentes/layout/Cabecera';
import RutaProtegida from './componentes/RutaProtegida';

function App() {
  return (
    // El AuthProveedor envuelve toda la app para que cualquier componente
    // pueda acceder al estado de autenticación.
    <AuthProveedor>
      <Router>
        <div className="bg-gray-900 min-h-screen font-sans text-white">
          <Cabecera />
          <main className="container mx-auto p-4 md:p-auto">
            <Routes>
              {/* Rutas Públicas */}
              <Route path="/login" element={<LoginPagina />} />

              {/* Rutas Privadas */}
              {/* logueados */}
              <Route
                path="/"
                element={
                  //no defino 'roles', cualquier usuario logeado
                  <RutaProtegida >
                    <PokedexPagina />
                  </RutaProtegida>
                }
              />

              {/* Solo admin */}
              <Route
                path="/admin/usuarios"
                element={
                  <RutaProtegida roles={['admin']}>
                    <GestionUsuariosPagina />
                  </RutaProtegida>
                }
              />

              {/* Ruta para cualquier otra URL no definida */}
              <Route path="*" element={<h1>404: Página No Encontrada</h1>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProveedor>
  );
}

export default App;
