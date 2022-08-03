import appointmentsPage from "../pageObjects/appointmentsPage";
import homePage from "../pageObjects/homePage";
import 'cypress-axe';

describe('This will test the appointments page', () => {
  it('Will connect to the appointments page', () => {
    appointmentsPage.visit();
  })
  it('Will check the page title', () => {
    appointmentsPage.title();
  })
  it('Will test the heading', () => {
    appointmentsPage.pageHeading();
  })
  it('Will test the request an appointment button', () => {
    appointmentsPage.appointmentButton();
  });

  it('Will test the navigation menu', () => {
    homePage.navMenuPathway();
    homePage.navMenuAppointments();
    homePage.navMenuAppointmentsHighlight();
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
  it('Will test the menu in the top right', () => {
    homePage.more();
    homePage.viewNotifications();
    homePage.viewHelp();
  });
  it('Will test the account menu', () => {
    cy.clickMore();
    homePage.checkMoreMenu();
  })
  it('Will peform accessibility check', () =>{
    cy.injectAxe();
    cy.checkA11y();
  })
})