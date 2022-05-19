import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: AppComponent;

  beforeEach(() => {
    fixture = new AppComponent();
  })

  it('should create the app', () => {
    expect(fixture).toBeTruthy();
  });

  it(`should have as title 'my-app'`, () => {
    expect(fixture.title).toEqual('my-app');
  });

});