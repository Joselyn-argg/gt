import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layouts/MainLayout';
import HomePage from './components/Pages/HomePage';
import ClassesPage from './components/Pages/ClassesPage';
import ClassDetailPage from './components/Pages/ClassDetailPage';
import InfoPage from './components/Pages/InfoPage';
import InfoDetailPage from './components/Pages/InfoDetailPage';
import SavedInfoPage from './components/Pages/SavedInfoPage';
import ContactPage from './components/Pages/ContactPage';
import CartPage from './components/Pages/CartPage';
import UserProfilePage from './components/Pages/UserProfilePage';
import AdminProfilePage from './components/Pages/AdminProfilePage';
import AdminClassesPage from './components/Pages/AdminClassesPage';
import AdminClassFormPage from './components/Pages/AdminClassFormPage';
import AdminInfoPage from './components/Pages/AdminInfoPage';
import AdminInfoFormPage from './components/Pages/AdminInfoFormPage';
import LoginPage from './components/Pages/LoginPage';
import Button from './components/Atomic/Atoms/Button';
import { Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clases" element={<ClassesPage />} />
          <Route path="/clases/:id" element={<ClassDetailPage />} />
          <Route path="/informacion" element={<InfoPage />} />
          <Route path="/informacion/:id" element={<InfoDetailPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Perfil de usuario */}
          <Route path="/perfil" element={<UserProfilePage />} />
          <Route path="/perfil/guardados" element={<SavedInfoPage />} />
          
          {/* Perfil administrador */}
          <Route path="/admin" element={<AdminProfilePage />} />
          <Route path="/admin/clases" element={<AdminClassesPage />} />
          <Route path="/admin/clases/detail" element={<AdminClassFormPage />} />
          <Route path="/admin/clases/detail/:id" element={<AdminClassFormPage />} />
          <Route path="/admin/informacion" element={<AdminInfoPage />} />
          <Route path="/admin/informacion/detail" element={<AdminInfoFormPage />} />
          <Route path="/admin/informacion/detail/:id" element={<AdminInfoFormPage />} />
          
          <Route path="*" element={
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-dark mb-4">¡Oops! 404</h2>
              <p className="text-gray-600 mb-6">Página no encontrada</p>
              <Link to="/">
                <Button variant="primary">Volver al inicio</Button>
              </Link>
            </div>
          } />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;