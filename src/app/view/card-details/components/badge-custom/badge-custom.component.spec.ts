import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeCustomComponent } from './badge-custom.component';

describe('BadgeCustomComponent', () => {
  let component: BadgeCustomComponent;
  let fixture: ComponentFixture<BadgeCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeCustomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BadgeCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
