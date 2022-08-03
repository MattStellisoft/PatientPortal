class physitrackPage {
    visitSite() {
        cy.visit('http://localhost:3000/exercises?testuser=968636876974');
    }
    title() {
        cy.get('p').contains('There are 10 exercise programs assigned to you');
    }
    buttonText() {
        cy.get('span').contains('Click on the button to create your PhysioNow account.');
    }
    createButton() {
        cy.get('a').contains('Create account');
    }
    heading() {
        cy.get('h3').contains('Your Stats');
    }
    totalActivities() {
        cy.get('dt').contains('Total Activities Completed');
        cy.get('div').contains('71,897');
        cy.get('span').contains('70,946');
        cy.get('div').contains('12%').should('have.css', 'background-color', 'rgb(220, 252, 231)');
    }
    avgSuccess() {
        cy.get('dt').contains('Avg. Success Rate');
        cy.get('div').contains('58.16%');
        cy.get('span').contains('56.14%');
        cy.get('div').contains('2.02%').should('have.css', 'background-color', 'rgb(220, 252, 231)');
    }
    avgTimeTaken() {
        cy.get('dt').contains('Avg. Time Taken');
        cy.get('div').contains('24.57%');
        cy.get('span').contains('28.62%');
        cy.get('div').contains('4.05%').should('have.css', 'background-color', 'rgb(254, 226, 226)');
    }
    branchBlock() {
        cy.get('a').contains('Medial Branch Block');
    }
    manProms() {
        cy.get('a').contains('Manchester PROMS initial');
    }
}
export default new physitrackPage();