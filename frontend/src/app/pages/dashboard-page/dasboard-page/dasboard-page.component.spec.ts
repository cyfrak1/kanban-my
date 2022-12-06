import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardPageComponent } from './dasboard-page.component';

describe('DasboardPageComponent', () => {
  let component: DasboardPageComponent;
  let fixture: ComponentFixture<DasboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasboardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
