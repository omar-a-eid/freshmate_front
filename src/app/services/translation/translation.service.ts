import { Inject, Injectable, LOCALE_ID } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  lang() {
    return this.locale;
  }

  isAr(): boolean {
    return this.locale == "ar";
  }
}
