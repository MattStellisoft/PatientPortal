import homePage from "../pageObjects/homePage";
import assessmentsPage from "../pageObjects/questionnairePage";
import 'cypress-axe';

describe('It will test the Assessments Page', () => {
  it('Will connect to the assessments Page', () => {
    assessmentsPage.visitSite();
  })
  it('Will verify the title', () => {
    assessmentsPage.title();
  })
  it('Will test questionnaire titles', () => {
    assessmentsPage.contentTitle();
  })
  it('Will test the navigation menu', () => {
    homePage.navMenuPathway();
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
  it('Will perform accessibility check', () => {
    cy.injectAxe();
    cy.checkA11y();
  });
})