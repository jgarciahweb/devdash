import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { firstValueFrom } from 'rxjs';
import { Github, GitHubRepo } from '../../../../core/services/github'; // 💥 Importamos esto de RxJS

@Component({
  selector: 'app-github-widget',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent],
  templateUrl: './github-widget.component.html',
})
export class GithubWidgetComponent {
  private githubService = inject(Github);

  username = signal<string>('jgarciahweb');
  searchInputValue = signal<string>('jgarciahweb');

  reposQuery = injectQuery<GitHubRepo[]>(() => ({
    queryKey: ['github-repos', this.username()],
    queryFn: () => {
      // 💥 Envolvemos la petición en firstValueFrom para mutar el Observable a Promesa
      return firstValueFrom(this.githubService.getUserRepos(this.username()));
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  }));

  updateUser() {
    const trimmed = this.searchInputValue().trim();
    if (trimmed) {
      this.username.set(trimmed);
    }
  }
}
