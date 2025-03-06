import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuralDirectivesComponentComponent } from './structural-directives-component.component';

describe('StructuralDirectivesComponentComponent', () => {
  let component: StructuralDirectivesComponentComponent;
  let fixture: ComponentFixture<StructuralDirectivesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StructuralDirectivesComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StructuralDirectivesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
