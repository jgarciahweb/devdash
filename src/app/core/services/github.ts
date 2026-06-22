import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

@Service()
export class Github {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.github.com';

  getUserRepos(username: string): Observable<GitHubRepo[]> {
    return this.http.get<GitHubRepo[]>(`${this.baseUrl}/users/${username}/repos?sort=updated&per_page=5`);
  }
}
