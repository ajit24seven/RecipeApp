import { AuthappSrcPage } from './app.po';

describe('authapp-src App', () => {
  let page: AuthappSrcPage;

  beforeEach(() => {
    page = new AuthappSrcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
