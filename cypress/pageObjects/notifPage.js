class notifPagePO {
    visitSite() {
        cy.visit('http://localhost:3000/notifications');
    }
    arBox() {
        cy.get('dt').contains('Assessments Remaining').parent().parent().parent().parent().parent().should('have.css', 'background-color', 'rgb(234, 88, 12)');
    }
    arText() {
        cy.get('dt').contains('Assessments Remaining');
    }
    arValue() {
        cy.get('div').contains('7');
    }
    ectBox() {
        cy.get('dt').contains('Estimated completion time').parent().parent().parent().parent().parent().should('have.css', 'background-color', 'rgb(21, 128, 61)');
    }
    ectText() {
        cy.get('dt').contains('Estimated completion time')
    }
    ectValue() {
        cy.get('div').contains('3 hours');
    }
    nadiBox() {
        cy.get('dt').contains('Next assessment due in').parent().parent().parent().parent().parent().should('have.css', 'background-color', 'rgb(59, 130, 246)');
    }
    nadiText() {
        cy.get('dt').contains('Next assessment due in');
    }
    nadiValue() {
        cy.get('div').contains('1 day');
    }
    noNotif() {
        cy.get('h3').contains('You have no notifications right now');
    }
    checkBack() {
        cy.get('p').contains('Please check back soon');
    }
}
export default new notifPagePO();