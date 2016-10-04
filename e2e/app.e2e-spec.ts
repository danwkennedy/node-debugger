import { NodeDebuggerPage } from './app.po';

describe('node-debugger App', function() {
  let page: NodeDebuggerPage;

  beforeEach(() => {
    page = new NodeDebuggerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
