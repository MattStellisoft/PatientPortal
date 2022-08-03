class appointmentsPage {
    visitSite() {
        cy.visit('http://localhost:3000/appointment?testuser=968636876974');
    }
    visit() {
        cy.visit('http://localhost:3000/appointments?testuser=968636876973');
    }
    title() {
        cy.get('span').contains('Home');
        cy.get('a').contains('Your Appointments');
    }
    pageHeading() {
        cy.get('h2').contains('Request your next appointment');
    }
    patient() {
        cy.get('dt').contains('Patient');
        cy.get('dd').contains('Margot Foster');
    }
    tableDate() {
        cy.get('dt').contains('Date');
        cy.get('dd').contains('3/6/2022');
    }
    tableTime() {
        cy.get('dt').contains('Time');
        cy.get('dd').contains('14:00');
    }
    clinician() {
        cy.get('dt').contains('Clinician');
        cy.get('dd').contains('Emma Longley');
    }
    tableType() {
        cy.get('dt').contains('Type');
        cy.get('dd').contains('PhysioLine');
    }
    location() {
        cy.get('dt').contains('Location');
        cy.get('dd').contains('Telephone Appointment');
    }
    confirmBtn() {
        cy.get('a').contains('Confirm your appointment').should('have.css', 'background-color', 'rgb(21, 128, 61)');
    }
    clickConfirmBtn() {
        cy.get('a').contains('Confirm your appointment').click();
    }
    checkConfirmURL() {
        cy.url().should('eq', 'http://localhost:3000/confirm');
    }
    rescheduleBtn() {
        cy.get('a').contains('Reschedule your appointment').should('have.css', 'background-color', 'rgb(37, 99, 235)');
    }
    clickRescheduleBtn() {
        cy.get('a').contains('Reschedule your appointment').click();
    }
    checkRescheduleURL() {
        cy.url().should('eq', 'http://localhost:3000/search');
    }
    cancelBtn() {
        cy.get('a').contains('Cancel your appointment').should('have.css', 'background-color', 'rgb(234, 88, 12)');
    }
    clickCancelBtn() {
        cy.get('a').contains('Cancel your appointment').click();
    }
    checkCancelURL() {
        cy.url().should('eq', 'http://localhost:3000/cancel');
    }
    appointmentButton() {
        cy.get('button').contains('Request an appointment').should('have.css', 'background-color', 'rgb(0, 129, 199)');
    }
    clickFirstAppointment() {
        cy.get('a').contains('Telephone appointment with Jordan Lambeek on 02/05/2022, 13:00:00').click();
    }
    checkAppointments() {
        cy.get('#__next > div > div > div > div > div.lg\\:col-span-9 > div > div > div > dl > div:nth-child(2)').contains('In person appointment with Fred Flintstone on 10/06/2022, 10:30:00');
        cy.get('#__next > div > div > div > div > div.lg\\:col-span-9 > div > div > div > dl > div:nth-child(3)').contains('In person appointment with Fred Flintstone on 10/06/2022, 10:30:00');
        cy.get('#__next > div > div > div > div > div.lg\\:col-span-9 > div > div > div > dl > div:nth-child(4)').contains('In person appointment with Fred Flintstone on 10/06/2022, 10:30:00');
        cy.get('#__next > div > div > div > div > div.lg\\:col-span-9 > div > div > div > dl > div:nth-child(5)').contains('In person appointment with Fred Flintstone on 10/06/2022, 10:30:00');
        cy.get('#__next > div > div > div > div > div.lg\\:col-span-9 > div > div > div > dl > div:nth-child(6)').contains('In person appointment with Fred Flintstone on 10/06/2022, 10:30:00');
    }
    appointmentPath() {
        cy.get('#__next > div > div > header > div.bg-gray-100.border-b.border-gray-400 > div > div > nav > ol > li:nth-child(1) > div > a').contains('Home');
        cy.get('#__next > div > div > header > div.bg-gray-100.border-b.border-gray-400 > div > div > nav > ol > li:nth-child(2) > div > a').contains('Your Appointments');
        cy.get(' #__next > div > div > header > div.bg-gray-100.border-b.border-gray-400 > div > div > nav > ol > li:nth-child(3) > div > a').contains('Your Appointment');
    }
    confirmed() {
        cy.get('div').contains('Confirmed');
    }
    yourAppointment() {
        cy.get('h2').contains('Your Appointment');
    }
    appCancelBtn() {
        cy.get('#__next > div > div > div > div > div.lg\\:col-span-9 > div > div > div:nth-child(5) > form > input').contains('Cancel')
    }
}
export default new appointmentsPage();