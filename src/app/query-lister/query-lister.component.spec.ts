import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryListerComponent } from './query-lister.component';

describe('QueryListerComponent', () => {
  let component: QueryListerComponent;
  let fixture: ComponentFixture<QueryListerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryListerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QueryListerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
