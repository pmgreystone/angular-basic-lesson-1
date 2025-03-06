import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerTextDemoComponent } from './inner-text-demo.component';

describe('InnerTextDemoComponent', () => {
  let component: InnerTextDemoComponent;
  let fixture: ComponentFixture<InnerTextDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnerTextDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InnerTextDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
