# 🎵 Reproductor Multimedia con React y Tailwind CSS

Este proyecto consiste en el desarrollo de un **reproductor multimedia reutilizable** capaz de manejar tanto archivos de audio como de video. Se ha creado utilizando **React** y estilizado con **Tailwind CSS** como parte del módulo _M9 - Disseny d'Interfícies Web_.

## 🎯 Objetivo

Desarrollar un componente `MediaPlayer` reutilizable en React que permita:

- Reproducir archivos de audio y video
- Usar controles personalizados (sin los del navegador)
- Controlar el volumen
- Estilizarlo de forma responsive con Tailwind CSS

---

## ⚙️ Configuración Inicial

1. Crear el proyecto con [Create React App](https://create-react-app.dev/):

```bash
npx create-react-app reproductor-media
cd reproductor-media
npm install -D tailwindcss
npx tailwindcss init
🧩 Estructura de Componentes
MediaPlayer.js
Componente principal que acepta las siguientes props:

type: "audio" o "video"

src: URL o path del archivo multimedia

Incluye botones personalizados para:

Reproducir

Pausar

Detener

Ajustar el volumen con un slider

App.js
Uso de MediaPlayer para renderizar uno o más reproductores con distintos tipos de archivos.

🖼 Estilos con Tailwind
Se han aplicado clases de Tailwind para:

Diseño responsive

Botones personalizados (bg-blue-500, rounded, etc.)

Layout centralizado y adaptativo

Control deslizante estilizado

🧪 Pruebas y Validación
✅ Se ha probado con diferentes archivos de audio (.mp3) y video (.mp4)
✅ Diseño adaptable a diferentes tamaños de pantalla
✅ Funcionalidad completa de los controles implementada sin errores
