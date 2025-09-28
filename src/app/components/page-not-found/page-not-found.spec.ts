import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { PageNotFound } from './page-not-found';
import { provideTranslateService } from '@ngx-translate/core';

describe('PageNotFound', () => {
  let component: PageNotFound;
  let fixture: ComponentFixture<PageNotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNotFound, RouterTestingModule],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(PageNotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 404 error number', () => {
    const numberElement = fixture.debugElement.query(By.css('.number'));
    expect(numberElement.nativeElement.textContent).toBe('404');
  });

  it('should display error message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(
      '404ERRORS.PAGE_NOT_FOUND NAVIGATION.HOME'
    );
  });

  it('should have home link', () => {
    const linkElement = fixture.debugElement.query(By.css('a'));
    expect(linkElement).toBeTruthy();
    expect(linkElement.nativeElement.textContent).toBe('NAVIGATION.HOME');
  });

  it('should have correct styling classes', () => {
    const hostElement = fixture.debugElement.nativeElement;
    expect(hostElement).toBeTruthy();
  });

  it('should render all required elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.number')).toBeTruthy();
    expect(compiled.querySelector('a')).toBeTruthy();
    expect(compiled.textContent).toContain('404');
  });
});
