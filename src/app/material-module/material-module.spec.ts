import { MaterialModule } from './material-module';

describe('MaterialModule', () => {
  let materialModuleModule: MaterialModule;

  beforeEach(() => {
    materialModuleModule = new MaterialModule();
  });

  it('should create an instance', () => {
    expect(materialModuleModule).toBeTruthy();
  });
});
