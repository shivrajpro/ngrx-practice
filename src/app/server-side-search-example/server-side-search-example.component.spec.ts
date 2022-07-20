import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerSideSearchExampleComponent } from './server-side-search-example.component';

describe('ServerSideSearchExampleComponent', () => {
  let component: ServerSideSearchExampleComponent;
  let fixture: ComponentFixture<ServerSideSearchExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerSideSearchExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerSideSearchExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
