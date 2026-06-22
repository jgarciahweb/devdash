# 🚀 DevDash – Dashboard de Productividad para Desarrolladores

**DevDash** es un panel de control personalizable diseñado específicamente para desarrolladores. Centraliza tus repositorios de GitHub, tareas pendientes, temporizador Pomodoro y datos meteorológicos locales en una única interfaz unificada, modular y de alto rendimiento.

Este proyecto ha sido desarrollado con un enfoque **100% Frontend (Avanzado)** para demostrar el dominio de arquitecturas modernas en Angular, sistemas de diseño escalables y optimización del estado del servidor.

---

## 🛠️ Stack Tecnológico

*   **Framework:** Angular (v17+) – Utilizando *Signals* para una reactividad fina, flujo de datos optimizado y *Standalone Components*.
*   **Estilos y UI:** TailwindCSS – Sistema de diseño ágil, totalmente personalizado y con soporte nativo para Modo Oscuro.
*   **Aislamiento de Componentes:** Storybook – Desarrollo y documentación de componentes atómicos de forma aislada antes de su integración.
*   **Gestión de Estado y Servidor:** `@tanstack/angular-query` (TanStack Query) – Manejo eficiente de la caché, sincronización en segundo plano y estados de carga/error de las APIs.
*   **Iconografía:** Lucide Angular – Pack de iconos consistente y optimizado para *tree-shaking*.

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue un patrón **Feature-First** (por funcionalidades) combinado con diseño atómico en la carpeta compartida, facilitando la escalabilidad del código.

```text
src/
├── app/
│   ├── core/               # Guardianes, interceptores y servicios globales únicos
│   ├── shared/             # Sistema de diseño (Componentes atómicos reutilizables)
│   │   └── components/
│   │       └── button/     # Componente e historia de Storybook vinculada
│   └── features/           # Módulos y lógica de negocio por funcionalidad
│       ├── dashboard/      # Layout principal del panel
│       ├── github-widget/  # Widget con conexión a API de GitHub
│       └── pomodoro/       # Widget de productividad (Temporizador)
