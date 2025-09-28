import { signal, computed } from '@angular/core';

describe('Layout Logic', () => {
  it('should initialize signals with default values', () => {
    const title = signal('NgBank');
    const windowWidth = signal(window.innerWidth);
    const navOpen = signal(false);

    expect(title()).toBe('NgBank');
    expect(navOpen()).toBe(false);
    expect(typeof windowWidth()).toBe('number');
  });

  it('should toggle navigation state', () => {
    const navOpen = signal(false);

    expect(navOpen()).toBe(false);

    navOpen.update((current) => !current);
    expect(navOpen()).toBe(true);

    navOpen.update((current) => !current);
    expect(navOpen()).toBe(false);
  });

  it('should close navigation', () => {
    const navOpen = signal(true);
    navOpen.set(false);
    expect(navOpen()).toBe(false);
  });

  it('should detect desktop screen size', () => {
    const windowWidth = signal(1024);
    const isDesktop = computed(() => windowWidth() > 768);

    expect(isDesktop()).toBe(true);

    windowWidth.set(600);
    expect(isDesktop()).toBe(false);
  });

  it('should update window width', () => {
    const windowWidth = signal(1024);

    windowWidth.set(800);
    expect(windowWidth()).toBe(800);
  });

  it('should handle computed values correctly', () => {
    const windowWidth = signal(1024);
    const isDesktop = computed(() => windowWidth() > 768);

    expect(isDesktop()).toBe(true);

    windowWidth.set(500);
    expect(isDesktop()).toBe(false);

    windowWidth.set(1200);
    expect(isDesktop()).toBe(true);
  });

  it('should maintain signal reactivity', () => {
    const navOpen = signal(false);
    let callCount = 0;

    const derived = computed(() => {
      callCount++;
      return navOpen() ? 'open' : 'closed';
    });

    expect(derived()).toBe('closed');
    expect(callCount).toBe(1);

    navOpen.set(true);
    expect(derived()).toBe('open');
  });
});
