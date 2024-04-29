import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pathbar',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './pathbar.component.html',
  styleUrl: './pathbar.component.css',
})
export class PathbarComponent {
  currentPath: string | undefined;

  constructor(private router: Router) { }

  getCurrentUrl(): string {
    return this.router.url;
  }

    
}
