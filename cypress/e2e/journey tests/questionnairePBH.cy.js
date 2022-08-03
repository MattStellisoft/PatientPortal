import homePage from "../../pageObjects/homePage";
import assessmentsPage from "../../pageObjects/questionnairePage";
import 'cypress-axe';

describe('User will connect and complete the "Pain Baseline Health" questionnaire', () => {
  it('User connects to the questionnaire page', () => {
    assessmentsPage.visitSite();
  })
  it('User checks the page', () => {
    assessmentsPage.title();
    assessmentsPage.contentTitle();
  })
  it('Will perform accessibility check', () => {
    cy.injectAxe();
    cy.checkA11y();
  });
  it('User will click "Pain Baseline Health"', () => {
    assessmentsPage.clickPBH();
  })
  it('User Reads first page', () => {
    assessmentsPage.pbhPageTitle();
    assessmentsPage.pbhPageTitleSub();
  });
  it('User will click the start button', () => {
    assessmentsPage.clickStartBtn();
  });
  it('User will type answer', () => {
    assessmentsPage.qOneInput();
  });
})