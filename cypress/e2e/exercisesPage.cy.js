import homePage from "../pageObjects/homePage";
import exercisesPage from "../pageObjects/exercisesPage";
import 'cypress-axe';

describe('It will test the PhysiTrack Page', () => {
  it('will connect to the PhysiTrack Page', () => {
      exercisesPage.visitSite();
  });
  it('Will test the page title', () => {
      exercisesPage.title();
  });
  it('Will test the content', () => {
    exercisesPage.branchBlock();
    exercisesPage.manProms();
  })
  it('Will test the navigation menu', () => {
    homePage.navMenuPathway();
    homePage.navMenuAppointments();
    homePage.navMenuDocuments();
    homePage.navMenuQuest();
    homePage.navMenuExercises();
    homePage.navMenuExercisesHighlight();
  })
  it('Will Test the footer links', () => {
    homePage.footerLinks();
    homePage.support();
    homePage.company();
    homePage.legal();
  });
  it('Will test the menu in the top right', () => {
    homePage.more();
    homePage.viewNotifications();
    homePage.viewHelp();
  });
  it('Will test the account menu', () => {
    cy.clickMore();
    homePage.checkMoreMenu();
  })
  it('Will perform accessibility check', () => {
    cy.injectAxe();
    cy.checkA11y();
  })
})