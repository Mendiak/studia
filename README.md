# studIA

studIA es una herramienta inteligente diseñada para facilitar la creación de materiales educativos personalizados para educación primaria. Utilizando modelos de lenguaje avanzados, la aplicación permite generar fichas de repaso adaptadas a las necesidades específicas de cada estudiante en segundos.

## Características principales

- Generación automática de ejercicios basados en temas específicos del currículo de primaria.
- Personalización por nivel educativo (desde 1º hasta 6º de primaria).
- Ajuste de dificultad (fácil, medio, difícil).
- Soporte multilingüe (castellano, catalán e inglés).
- Adaptación de género y contexto regional para una mayor relevancia del contenido.
- Interfaz moderna, rápida y fácil de usar.

## Tecnologías utilizadas

- **Framework:** Next.js
- **Inteligencia Artificial:** Google Gemini AI
- **Estilos:** Tailwind CSS
- **Iconografía:** Lucide React
- **Validación:** Zod

## Configuración del proyecto

### Requisitos previos

Asegúrate de tener instalado Node.js en tu sistema.

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Mendiak/studia.git
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env.local` en la raíz del proyecto y añade tu clave de API de Google Gemini y una contraseña de acceso:
   ```env
   GEMINI_API_KEY=tu_clave_aqui
   APP_PASSWORD=tu_contraseña_aqui
   ```

   También se admite `GOOGLE_GENERATIVE_AI_API_KEY` como nombre alternativo para la clave de Gemini.

### Ejecución en desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:3000.

## Objetivo del proyecto

studIA nace con el propósito de ayudar a familias y docentes a crear material de refuerzo de alta calidad de forma instantánea, permitiendo un aprendizaje más dinámico y adaptado al ritmo de cada alumno o alumna.
