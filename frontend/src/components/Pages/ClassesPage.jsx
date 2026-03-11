import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../Atomic/Molecules/ProductCard';
import Breadcrumbs from '../Atomic/Molecules/Breadcrumbs';

const ClassesPage = () => {
  // Estado para las clases (esto vendrá de una API en el futuro)
  const [classes] = useState([
    { id: 1, nombre: "Iniciación al Slalom", nivel: "iniciante", duracion: 1.5, precio: 15000, imagen: "https://esqueit.com/wp-content/uploads/2018/08/Qu%C3%A9-es-el-freestyle-slalom-1.jpg" },
    { id: 2, nombre: "Técnicas de Freno", nivel: "intermedio", duracion: 1, precio: 12000, imagen: "https://cdn.shopify.com/s/files/1/0753/3432/0395/files/blog_1.webp?v=1753858531" },
    // ... más clases
  ]);

  return (
    <div>
      {/* Migas de pan */}
      <Breadcrumbs />
      
      <h1 className="text-3xl font-bold text-dark mb-6">Nuestras Clases</h1>
      
      {/* Grid de clases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(cls => (
         <Link key={cls.id} to={`/clases/${cls.id}`}>
           <ProductCard item={cls} type="class" />
         </Link>
        ))}
      </div>
    </div>
  );
};

export default ClassesPage;