import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-pathbar',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './pathbar.component.html',
  styleUrl: './pathbar.component.css',
})
export class PathbarComponent {
  currentPath: string | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to router events
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getCurrentPath();
      });
  }

  getCurrentPath(): void {
    this.currentPath = this.router.url;

    // Remove leading slash
    if (this.currentPath.startsWith('/')) {
      this.currentPath = this.currentPath.substr(1);
    }
  }
}
