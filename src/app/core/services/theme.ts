import { effect, Service, signal } from '@angular/core';

@Service()
export class Theme {
  // Signal que vigila si el modo oscuro está activo
  darkMode = signal<boolean>(
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  constructor() {
    // Los efectos (effects) ejecutan código automáticamente cuando sus signals cambian
    effect(() => {
      const isDark = this.darkMode();
      const root = window.document.documentElement;

      if (isDark) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  toggleTheme() {
    this.darkMode.update(dark => !dark);
  }
}
