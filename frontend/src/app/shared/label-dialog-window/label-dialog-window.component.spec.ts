import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelDialogWindowComponent } from './label-dialog-window.component';

describe('LabelDialogWindowComponent', () => {
  let component: LabelDialogWindowComponent;
  let fixture: ComponentFixture<LabelDialogWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelDialogWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelDialogWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
