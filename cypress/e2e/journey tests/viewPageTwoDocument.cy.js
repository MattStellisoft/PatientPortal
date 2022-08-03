import docsPage from '../../pageObjects/docsPage';
import homePage from '../../pageObjects/homePage';
import 'cypress-axe';

describe('User wants to view document', () => {
  it('User Connects to Documents Page', () => {
    docsPage.visitSite();
  })
  it('User clicks "Next Documents"', () => {
    docsPage.nextDocument();
  })
  it('User will check document', () => {
    docsPage.pageTwoDocument();
  })
  //finish test here but page 2 document doesn't work 
})