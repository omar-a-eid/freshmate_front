import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-pathbar',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './pathbar.component.html',
  styleUrl: './pathbar.component.css'
})
export class PathbarComponent {

  constructor(private router: Router) { }

  getCurrentUrl(): string {
    return this.router.url;
  }

}
