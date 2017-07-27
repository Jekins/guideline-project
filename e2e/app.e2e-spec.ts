import { GuidesProjectPage } from './app.po';

describe('guides-project App', () => {
  let page: GuidesProjectPage;

  beforeEach(() => {
    page = new GuidesProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
