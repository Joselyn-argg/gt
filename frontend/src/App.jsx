import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layouts/MainLayout';
import HomePage from './components/Pages/HomePage';
import ClassesPage from './components/Pages/ClassesPage';
import ClassDetailPage from './components/Pages/ClassDetailPage';
import ArticlesPage from './components/Pages/ArticlesPage';
import ArticleDetailPage from './components/Pages/ArticleDetailPage';
import ContactPage from './components/Pages/ContactPage';
import CartPage from './components/Pages/CartPage';
import UserProfilePage from './components/Pages/UserProfilePage';
import SavedArticlesPage from './components/Pages/SavedArticlesPage';
import AdminProfilePage from './components/Pages/AdminProfilePage';
import AdminClassesPage from './components/Pages/AdminClassesPage';
import AdminClassFormPage from './components/Pages/AdminClassFormPage';
import AdminArticlesPage from './components/Pages/AdminArticlesPage';
import AdminArticleFormPage from './components/Pages/AdminArticleFormPage';
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
          <Route path="/articulos" element={<ArticlesPage />} />
          <Route path="/articulos/:id" element={<ArticleDetailPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Perfil de usuario */}
          <Route path="/perfil" element={<UserProfilePage />} />
          <Route path="/perfil/guardados" element={<SavedArticlesPage />} />
          
          {/* Perfil administrador */}
          <Route path="/admin" element={<AdminProfilePage />} />
          <Route path="/admin/clases" element={<AdminClassesPage />} />
          <Route path="/admin/clases/detail" element={<AdminClassFormPage />} />
          <Route path="/admin/clases/detail/:id" element={<AdminClassFormPage />} />
          <Route path="/admin/articulos" element={<AdminArticlesPage />} />
          <Route path="/admin/articulos/detail" element={<AdminArticleFormPage />} />
          <Route path="/admin/articulos/detail/:id" element={<AdminArticleFormPage />} />
          
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