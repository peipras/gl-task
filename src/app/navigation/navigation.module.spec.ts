import { NavigationModule } from './navigation.module';

describe('NavigagtionModule', () => {
  let navigationModule: NavigationModule;

  beforeEach(() => {
    navigationModule = new NavigationModule();
  });

  it('should create an instance', () => {
    expect(navigationModule).toBeTruthy();
  });
});
