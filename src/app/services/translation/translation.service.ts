import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AvailableLanguage } from '../../interfaces/interfaces';
import { Storage } from '../storage/storage';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translate = inject(TranslateService);
  readonly storage = inject(Storage);

  readonly currentLanguage = signal<AvailableLanguage>('en');
  readonly availableLanguages: AvailableLanguage[] = ['en', 'ru'];

  constructor() {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    const savedLang = this.storage.getLanguage() || 'en';
    this.setLanguage(savedLang);
  }

  setLanguage(lang: AvailableLanguage): void {
    if (this.availableLanguages.includes(lang)) {
      this.translate.use(lang);
      this.currentLanguage.set(lang);
      this.storage.setLanguage(lang);
    }
  }

  toggleLanguage(): void {
    const current = this.currentLanguage();
    const next = current === 'en' ? 'ru' : 'en';
    this.setLanguage(next);
  }
}
