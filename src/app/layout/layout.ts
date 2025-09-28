import {
  Component,
  signal,
  HostListener,
  computed,
  effect,
  inject,
} from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material/material-module';
import { Storage } from '../services/storage/storage';
import { TranslationService } from '../services/translation/translation.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    MaterialModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  private readonly router = inject(Router);
  private readonly storage = inject(Storage);
  private readonly translationService = inject(TranslationService);

  readonly title = signal('NgBank');
  readonly windowWidth = signal(window.innerWidth);
  readonly navOpen = signal(false);

  readonly isDesktop = computed(() => this.windowWidth() > 768);

  constructor() {
    effect(() => {
      if (this.isDesktop()) this.navOpen.set(false);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.windowWidth.set((event.target as Window).innerWidth);
  }

  toggleNav(): void {
    this.navOpen.update((current) => !current);
  }

  closeNav(): void {
    this.navOpen.set(false);
  }

  logout(): void {
    this.storage.clearTokens();
    this.router.navigate(['/login']);
  }

  toggleLanguage(): void {
    this.translationService.toggleLanguage();
  }

  get currentLanguage() {
    return this.translationService.currentLanguage;
  }
}
