import docsPage from '../../pageObjects/docsPage';
import homePage from '../../pageObjects/homePage';
import 'cypress-axe';

describe('User wants to view document', () => {
  it('User Connects to Documents Page', () => {
    docsPage.visitSite();
  })
  it('User clicks the first document', () => {
    docsPage.carePlan1();
  })
  it('User will check document', () => {
    docsPage.may10Document();
  })
  it('User downloads document', () => {
    docsPage.downloadBtnClick();
    docsPage.checkDownload();
  })
})