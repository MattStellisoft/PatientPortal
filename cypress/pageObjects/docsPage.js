class docsPage {
    visitSite() {
        cy.visit('http://localhost:3000/documents?testuser=968636876973')
    }
    title() {
        cy.get('p').contains('You have 6 documents available to view');
    }
    results() {
        cy.get('p').contains('You are viewing 3 of 10 results');
    }
    previous() {
        cy.get('a').contains('Previous');
    }
    next() {
        cy.get('a').contains('Next');
    }
    referralLetter() {
        cy.get('p').contains('Referral Appointment Letter');
    }
    referralCD() {
        cy.get('p').contains('Created on ');
        cy.get('time').contains('January 3, 2020');
    }
    followupLetter() {
        cy.get('p').contains('Follow-up Appointment Letter');
    }
    followupCD() {
        cy.get('p').contains('Created on ');
        cy.get('time').contains('January 20, 2020');
    }
    dischargeLetter() {
        cy.get('p').contains('Discharge Letter');
    }
    dischargeCD() {
        cy.get('p').contains('Created on ');
        cy.get('time').contains('February 2, 2020');
    }
    nodAvailable() {
        cy.get('h3').contains('There are no documents available right now');
        cy.get('p').contains('Please check back soon');
    }
    carePlan() {
        cy.get('#main > div > div:nth-child(2) > div > dl > div:nth-child(1) > dt > a').should('have.text', 'Care Plan sent Tuesday, 10 May 2022');
        cy.get('#main > div > div:nth-child(2) > div > dl > div:nth-child(2) > dt > a').should('have.text', 'Care Plan sent Thursday, 12 May 2022');
        cy.get('#main > div > div:nth-child(2) > div > dl > div:nth-child(3) > dt > a').should('have.text', 'Care Plan sent Thursday, 12 May 2022');
        cy.get('#main > div > div:nth-child(2) > div > dl > div:nth-child(4) > dt > a').should('have.text', 'Care Plan sent Thursday, 12 May 2022');
        cy.get('#main > div > div:nth-child(2) > div > dl > div:nth-child(5) > dt > a').should('have.text', 'Care Plan sent Thursday, 12 May 2022');
    }
    carePlan1() {
        cy.get('#main > div > div:nth-child(2) > div > dl > div:nth-child(1) > dt > a').click();
    }
    may10Document() {
        cy.get('#main > div.react-pdf__Document > div:nth-child(1) > canvas').should('be.visible');
        cy.get('#main > div.react-pdf__Document > div:nth-child(2) > canvas').should('be.visible');
        cy.get('#main > div.react-pdf__Document > div:nth-child(3) > canvas').should('be.visible');
    }
    downloadBtnClick() {
        cy.get('button').contains('Download').click();
    }
    checkDownload() {
        cy.readFile('cypress/downloads/CarePlan.pdf').should('exist');
    }
    nextDocument() {
        cy.get('#main > div > div:nth-child(3) > div > nav > dl > div > dt > div.flex.items-center > span').click();
    }
    pageTwoDocument() {
        cy.get('#main > div > div:nth-child(2) > div > dl > div > dt > a').should('have.text', 'Care Plan sent Thursday, 12 May 2022');
        cy.get('#main > div > div:nth-child(2) > div > dl > div > dt > a').click();
    }
}
export default new docsPage();