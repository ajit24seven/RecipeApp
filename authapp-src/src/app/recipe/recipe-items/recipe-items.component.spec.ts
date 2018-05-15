import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeItemsComponent } from './recipe-items.component';

describe('RecipeItemsComponent', () => {
  let component: RecipeItemsComponent;
  let fixture: ComponentFixture<RecipeItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
