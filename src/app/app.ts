import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import translationsEN from '../assets/i18n/en.json';
import translationsRU from '../assets/i18n/ru.json';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly title = signal('NgBank');
  private translate = inject(TranslateService);

  constructor() {
    this.translate.setTranslation('en', translationsEN);
    this.translate.setTranslation('ru', translationsRU);
    this.translate.setFallbackLang('en');
    this.translate.use('en');
  }
}
