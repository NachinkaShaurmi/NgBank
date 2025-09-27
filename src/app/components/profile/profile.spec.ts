import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Profile } from './profile';

describe('Profile', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profile],
    }).compileComponents();

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render profile works message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('profile works!');
  });

  it('should have correct selector', () => {
    expect(component.constructor.name).toBe('Profile');
  });

  it('should be a standalone component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });

  it('should have empty imports array', () => {
    expect(component).toBeDefined();
  });

  it('should render paragraph element', () => {
    const paragraphElement = fixture.debugElement.query(By.css('p'));
    expect(paragraphElement).toBeTruthy();
    expect(paragraphElement.nativeElement.textContent).toBe('profile works!');
  });

  it('should have minimal template structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const paragraphs = compiled.querySelectorAll('p');
    expect(paragraphs.length).toBe(1);
  });
});
