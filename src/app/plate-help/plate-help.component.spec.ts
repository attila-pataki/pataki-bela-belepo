import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateHelpComponent } from './plate-help.component';

describe('PlateHelpComponent', () => {
  let component: PlateHelpComponent;
  let fixture: ComponentFixture<PlateHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlateHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlateHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
