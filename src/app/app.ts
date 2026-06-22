import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GithubWidgetComponent } from './features/dashboard/components/github-widget/github-widget.component';
import { PomodoroComponent } from './features/dashboard/components/pomodoro/pomodoro.component';
import { Theme } from './core/services/theme';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './shared/components/button/button.component';
import { KanbanComponent } from './features/dashboard/components/kanban/kanban.component';
import { WeatherComponent } from './features/dashboard/components/weather/weather.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    GithubWidgetComponent,
    PomodoroComponent,
    ButtonComponent,
    KanbanComponent,
    WeatherComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('devdash');
  themeService = inject(Theme);
}
