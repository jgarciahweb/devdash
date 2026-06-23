# ⚡ DevDash Workspace

Un dashboard de productividad personal y entorno de trabajo avanzado para desarrolladores, construido con **Angular 19+**, **Signals** y **Tailwind CSS v4.0**.

Este proyecto ha sido diseñado bajo la metodología de desarrollo guiado por componentes (Component-Driven Development) y utiliza **TanStack Query** para una gestión de estado del servidor ultra eficiente, optimizando el rendimiento mediante el uso de caché avanzada y peticiones asíncronas optimizadas.

## 🚀 Características Principales

* **GitHub Widget:** Sincronización en tiempo real con la API pública de GitHub. Permite buscar cualquier perfil dinámicamente y expone los últimos repositorios con sus respectivas métricas (estrellas, lenguajes, etc.).
* **Weather Widget (Geolocalización Inversa):** Consume la API nativa de geolocalización del navegador para detectar la ubicación actual del usuario y combina datos asíncronos mediante `Promise.all` para renderizar el nombre de la localidad y sus condiciones climatológicas en tiempo real (con un plan de contingencia elegante si los permisos son denegados).
* **Tablero Kanban Interactivo:** Gestión de tareas pendientes mediante arrastrar y soltar utilizando `@angular/cdk/drag-drop` y persistencia de datos local transparente en el dispositivo (`localStorage`) implementada mediante efectos reactivos.
* **Pomodoro Timer:** Temporizador reactivo para la gestión del tiempo de enfoque y descanso con estados computados matemáticos y formateo dinámico de reloj en formato `MM:SS`.
* **Estrategia Dark Mode Nativa:** Diseñado con la arquitectura moderna de **Tailwind CSS v4.0** basada en variables de CSS puras y un servicio global reactivo que memoriza las preferencias estéticas del usuario.

## 🛠️ Stack Tecnológico

* **Framework:** Angular (Standalone Components + Signals)
* **Estilos:** Tailwind CSS v4.0 (Configuración nativa CSS y directivas `@theme`)
* **Gestión de Datos/Servidor:** TanStack Query (Angular Query Experimental)
* **Interactividad:** Angular CDK (Drag & Drop)
* **Control de Estado:** Sólido uso de `signal()`, `computed()` y `effect()`.

## 📦 Instalación y Despliegue Local

1. Clona el repositorio:
   ```bash
   git clone [https://github.com/jgarciahweb/devdash.git](https://github.com/jgarciahweb/devdash.git)
2. Instala las dependencias
  ```bash
  npm install
3. Inicia el servidor de desarrollo
  ```bash
  npm start
