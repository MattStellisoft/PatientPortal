import appointmentsPage from "../../pageObjects/appointmentsPage";
import homePage from '../../pageObjects/homePage';

describe('The user will view an appointment on the appointments page', () => {
    it('User connects to the appointment page', () => {
      appointmentsPage.visit();
    })
    it('Checks appointment page', () => {
      appointmentsPage.appointmentButton();
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
    it('Will check appointments', () => {
      appointmentsPage.checkAppointments();
    });
    it('User clicks appointment to view', () => {
      appointmentsPage.clickFirstAppointment();
    });
    it('Will test the appointment page', () => {
      appointmentsPage.appointmentPath();
      appointmentsPage.confirmed();
      appointmentsPage.yourAppointment();
      appointmentsPage.appCancelBtn();
    });
})
