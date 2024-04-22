import { Component } from '@angular/core';

@Component({
  selector: 'app-pathbar',
  standalone: true,
  imports: [],
  templateUrl: './pathbar.component.html',
  styleUrl: './pathbar.component.css'
})
export class PathbarComponent {

//   updateBreadcrumb() {
//     // Get the current page path
//     const path: string = window.location.pathname;

//     // Extract the last part of the path (page name)
//     let pageName: string = path.substring(path.lastIndexOf('/') + 1);

//     // Remove any file extensions (e.g., ".html")
//     pageName = pageName.replace(/\.[^/.]+$/, "");

//     // Update the "wishlist" breadcrumb with the page name
//     const wishlistBreadcrumb: HTMLElement | null = document.getElementById("wishlistBreadcrumb");
//     if (wishlistBreadcrumb) {
//         wishlistBreadcrumb.textContent = pageName;
//     }
// }

// // Call the function when the DOM is fully loaded
// if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", updateBreadcrumb);
// } else {
//     // `DOMContentLoaded` has already occurred, call `updateBreadcrumb` directly
//     updateBreadcrumb();
// }

}
