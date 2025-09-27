import {
  Component,
  signal,
  HostListener,
  computed,
  effect,
  inject,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../material/material-module';
import { Storage } from '../services/storage/storage';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, MaterialModule, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  private readonly router = inject(Router);
  private readonly storage = inject(Storage);

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
}
