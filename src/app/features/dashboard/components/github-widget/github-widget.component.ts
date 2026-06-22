import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { firstValueFrom } from 'rxjs';
import { Github } from '../../../../core/services/github'; // 💥 Importamos esto de RxJS

@Component({
  selector: 'app-github-widget',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './github-widget.component.html',
})
export class GithubWidgetComponent {
  private githubService = inject(Github);

  username = signal<string>('jgarciahweb');

  reposQuery = injectQuery(() => ({
    queryKey: ['github-repos', this.username()],
    // 💥 Convertimos el Observable del servicio en una Promesa usando firstValueFrom
    queryFn: () => firstValueFrom(this.githubService.getUserRepos(this.username())),
    staleTime: 1000 * 60 * 5,
  }));
}
