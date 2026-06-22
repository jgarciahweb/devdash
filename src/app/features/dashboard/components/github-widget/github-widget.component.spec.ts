import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubWidgetComponent } from './github-widget.component';

describe('GithubWidgetComponent', () => {
  let component: GithubWidgetComponent;
  let fixture: ComponentFixture<GithubWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GithubWidgetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
