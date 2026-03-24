-- =============================================
-- DML (Data Manipulation Language)
-- Datos de prueba y población inicial de tablas
-- =============================================

-- =============================================
-- INSERTAR USUARIOS DE EJEMPLO
-- =============================================
INSERT INTO usuarios (nombre, apellido, email, password, tipo_usuario) VALUES
('Admin', 'Principal', 'admin@escuela.cl', '$2a$10$encrypted_password_here', 'admin'),
('Usuario', 'Normal', 'usuario@ejemplo.cl', '$2a$10$encrypted_password_here', 'usuario');

-- ============================================
-- INSERTAR CLASES DE PATINAJE
-- ============================================
INSERT INTO clases (nombre, nivel, duracion, precio, cupos, descripcion, imagen, categorias) VALUES
('Patinaje Básico Infantil', 'Principiante', 1.5, 15000, 10, 
 'Clase perfecta para niños que inician en el patinaje. Aprenderán equilibrio, pasos básicos y seguridad.', 
 '/images/clase-basica.jpg', '{Infantil,Principiante}'),

('Patinaje Intermedio', 'Intermedio', 1.5, 20000, 8,
 'Para patinadores con experiencia. Mejorarás técnica, velocidad y realizarás piruetas simples.',
 '/images/clase-intermedia.jpg', '{Intermedio,Técnica}'),

('Entrenamiento Competitivo', 'Avanzado', 2.0, 35000, 5,
 'Intenso entrenamiento para competencias. Técnica avanzada, velocidad y resistencia.',
 '/images/clase-competitiva.jpg', '{Avanzado,Competencia}'),

('Patinaje Artístico', 'Intermedio', 1.5, 25000, 6,
 'Aprende movimientos artísticos, coreografías y expresión corporal sobre patines.',
 '/images/clase-artistica.jpg', '{Intermedio,Artístico}'),

('Hockey sobre Patines', 'Intermedio', 2.0, 28000, 12,
 'Técnicas específicas para hockey: drible, tiros, defensa y juego en equipo.',
 '/images/clase-hockey.jpg', '{Hockey,Deporte}'),

('Patinaje Recreativo Adultos', 'Principiante', 1.5, 18000, 15,
 'Clase relajada para adultos que quieren aprender o recordar cómo patinar.',
 '/images/clase-adultos.jpg', '{Adultos,Recreativo}');

-- ============================================
-- INSERTAR ARTÍCULOS INFORMATIVOS
-- ============================================
INSERT INTO articulos (titulo, subtitulo, autor, contenido, imagen, categoria) VALUES
('Cómo elegir los mejores patines', 'Guía completa para principiantes', 'Coach Juan Pérez',
 'Al elegir patines es importante considerar el tamaño, comodidad y tipo de patinaje que realizarás. Los patines deben ajustarse bien sin dejar puntos de presión. Es recomendable probar varios modelos antes de hacer una compra final. Consulta con expertos en tiendas especializadas para obtener mejores recomendaciones.',
 '/images/articulo-patines.jpg', 'Equipo'),

('Seguridad en el patinaje: Protecciones esenciales', 'Protégete mientras aprendes', 'Dra. María López',
 'El uso de protecciones es fundamental. Se recomienda usar casco, protectores de muñecas, codos y rodillas. Estos elementos pueden prevenir lesiones graves. Asegúrate de que todas tus protecciones estén en buen estado y se ajusten correctamente a tu cuerpo.',
 '/images/articulo-seguridad.jpg', 'Seguridad'),

('Ejercicios de calentamiento antes de patinar', 'Prepárate correctamente', 'Entrenador Carlos Ruiz',
 'Realizar un calentamiento adecuado es esencial para evitar lesiones. Recomendamos: trotar 5 minutos, estiramiento dinámico, ejercicios de movilidad de tobillos y caderas. Un buen calentamiento prepara tus músculos y articulaciones para el esfuerzo físico.',
 '/images/articulo-calentamiento.jpg', 'Entrenamientos'),

('Historia del patinaje sobre ruedas', 'De la antigüedad a hoy', 'Historiador Roberto Silva',
 'El patinaje sobre ruedas tiene orígenes que se remontan al siglo XVIII en Holanda. A través de los años ha evolucionado en diferentes disciplinas: velocidad, artístico, hockey y freestyle. Hoy en día es un deporte olímpico reconocido mundialmente.',
 '/images/articulo-historia.jpg', 'Historia'),

('Técnica vs Velocidad: ¿Cuál es más importante?', 'Construyendo bases sólidas', 'Coach Andrea González',
 'Muchos patinadores novatos se enfocaban en la velocidad, pero la técnica es la base fundamental. Una buena técnica te permitirá patinar más rápido y seguro. Invierte tiempo en aprender correctamente los movimientos básicos antes de intentar alcanzar altas velocidades.',
 '/images/articulo-tecnica.jpg', 'Técnica'),

('Nutrición para patinadores competitivos', 'Alimentación estratégica', 'Nutricionista Sofía Martínez',
 'Los patinadores competitivos necesitan una nutrición balanceada. Es importante consumir carbohidratos complejos, proteínas y mantenerse hidratado constantemente. Una buena alimentación mejora tu rendimiento y acelera la recuperación muscular después del entrenamiento.',
 '/images/articulo-nutricion.jpg', 'Salud');

-- =============================================
-- NOTAS IMPORTANTES
-- =============================================
-- NOTA 1: Las contraseñas en la tabla de ejemplo están marcadas como placeholder
--         En producción deben ser hashes seguros (bcrypt)
-- NOTA 2: Los artículos están optimizados para búsquedas por categoría
-- NOTA 3: Las clases tienen cupos limitados para control de inscripciones
-- NOTA 4: La tabla usuarios_articulos permanece vacía inicialmente y se 
--         poblará cuando los usuarios guarden artículos
