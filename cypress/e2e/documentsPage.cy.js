import docsPage from '../pageObjects/docsPage';
import homePage from '../pageObjects/homePage';
import 'cypress-axe';

describe('It will test the documents page', () => {
  it('Will connect to the documents page', () => {
      docsPage.visitSite();
  });
  it('Will check the title of the page', () => {
      docsPage.title();
  });
  it('Will test the documents page', () => {
    docsPage.carePlan()
  })
  it('Will test the navigation menu', () => {
    homePage.navMenuAppointments();
    homePage.navMenuDocuments();
    homePage.navMenuQuest();
    homePage.navMenuExercises();
  })
  it('Will Test the footer links', () => {
    homePage.footerLinks();
    homePage.support();
    homePage.company();
    homePage.legal();
  });
  it('Will do accessability checks', () => {
    cy.injectAxe();
    cy.checkA11y();
  });
})