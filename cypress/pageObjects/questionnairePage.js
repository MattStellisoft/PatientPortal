class assessmentsPage {
    visitSite() {
        cy.visit('http://localhost:3000/questionnaires?testuser=968636876974');
    }
    title() {
        cy.get('span').contains('Home');
        cy.get('#__next > div > div > header > div.bg-gray-100.border-b.border-gray-400 > div > div > nav > ol > li:nth-child(2) > div > a').contains('Your Questionnaires');
    }
    contentTitle() {
        cy.get('p').contains('There are 31 questionnaires that are currently assigned to you');
    }
    assessmentsRemainingValue() {
        cy.get('dd').contains('7');
    }
    scales() {
        cy.get('#__next > div > div > div > div.lg\\:col-span-9 > div.hidden.lg\\:block.max-w-5xl.mx-auto.px-4.lg\\:pb-4.sm\\:px-6.lg\\:px-8 > div > div.bg-orange-600.bg-white.overflow-hidden.border-4.border-black > div > div > div.flex-shrink-0 > svg > path').should('be.visible');
    }
    assessmentsRemaining() {
        cy.get('dt').contains('Number of assessments remaining').parent().parent().parent().parent().parent().should('have.css', 'background-color', 'rgb(234, 88, 12)');
    }
    estimatedTime() {
        cy.get('dt').contains('Estimated time to completion').parent().parent().parent().parent().parent().should('have.css', 'background-color', 'rgb(21, 128, 61)');
    }
    clock() {
        cy.get('#__next > div > div > div > div.lg\\:col-span-9 > div.hidden.lg\\:block.max-w-5xl.mx-auto.px-4.lg\\:pb-4.sm\\:px-6.lg\\:px-8 > div > div.bg-green-700.bg-white.overflow-hidden.border-4.border-black > div > div > div.flex-shrink-0 > svg > path').should('be.visible');
    }
    estimatedTimeValue() {
        cy.get('dd').contains('3 hours');
    }
    nextAssessment() {
        cy.get('dt').contains('Next assessment due in').parent().parent().parent().parent().parent().should('have.css', 'background-color', 'rgb(59, 130, 246)');
    }
    arrow() {
        cy.get('#__next > div > div > div > div.lg\\:col-span-9 > div.hidden.lg\\:block.max-w-5xl.mx-auto.px-4.lg\\:pb-4.sm\\:px-6.lg\\:px-8 > div > div.bg-blue-500.bg-white.overflow-hidden.border-4.border-black > div > div > div.flex-shrink-0 > svg > path').should('be.visible');
    }
    nextAssessmentValue() {
        cy.get('dd').contains('1 day');
    }
    viewingText() {
        cy.get('p').contains('You are viewing 2 of 10 results');
    }
    viewingText2() {
        cy.get('#__next > div > div > div > div.lg\\:col-span-9 > div.bg-white.overflow-hidden > p.lg\\:my-0.my-4.lg\\:pt-4.lg\\:px-0.px-4.text-lg.font-bold').should('have.text', 'You are viewing 2 of 10 results');
    }
    previous() {
        cy.get('a').contains('Previous');
    }
    next() {
        cy.get('a').contains('Next');
    }
    medicalBranch() {
        cy.get('span').contains('Medial Branch Block');
    }
    blockTime() {
        cy.get('#__next > div > div > div > div.lg\\:col-span-9 > div.bg-white.overflow-hidden > ul > li:nth-child(1) > a > span > span > span > span:nth-child(2)').should('have.text', 'Avg. Duration: 3 hours');
    }
    blockDeadline() {
        cy.get('#__next > div > div > div > div.lg\\:col-span-9 > div.bg-white.overflow-hidden > ul > li:nth-child(1) > a > span > span > span > span:nth-child(3)').should('have.text', 'Submission deadline: July 11, 2020');
    }
    previous2() {
        cy.get('#__next > div > div > div > div.lg\\:col-span-9 > div.bg-white.overflow-hidden > nav.bg-white.border-y-4.lg\\:border-x-4.border-black.flex.items-center.justify-between > div > a:nth-child(1)').should('have.text', 'Previous');
    }
    next2() {
        cy.get('#__next > div > div > div > div.lg\\:col-span-9 > div.bg-white.overflow-hidden > nav.bg-white.border-y-4.lg\\:border-x-4.border-black.flex.items-center.justify-between > div > a:nth-child(2)').should('have.text', 'Next');
    }
    frown() {
        cy.get('#__next > div > div > div > div.lg\\:col-span-9 > div.p-12 > div > svg');
    }
    noAssessments() {
        cy.get('h3').contains('There are no digital assessments available right now');
    }
    checkBack() {
        cy.get('p').contains('Please check back soon');
    }
    manAssessment() {
        cy.get('span').contains('Manchester PROMS initial');
    }
    manTime() {
        cy.get('#__next > div > div > div > div.lg\\:col-span-9 > div.bg-white.overflow-hidden > ul > li:nth-child(2) > a > span > span > span > span:nth-child(2)').should('have.text', 'Avg. Duration: 3 hours');
    }
    manDeadline() {
        cy.get('#__next > div > div > div > div.lg\\:col-span-9 > div.bg-white.overflow-hidden > ul > li:nth-child(2) > a > span > span > span > span:nth-child(3)').should('have.text', 'Submission deadline: July 11, 2020');
    }
    branchBlockQuest() {
        cy.get('a').contains('Medial Branch Block');
        cy.get('span').contains('Incomplete').should('have.css', 'background-color', 'rgb(75, 85, 99)');
    }
    clickPBH() {
        cy.get('a').contains('Pain Baseline Health').click();
    }
    pbhPageTitle() {
        cy.get('h1').contains('Pain Baseline Health');
    }
    pbhPageTitleSub() {
        cy.get('p').contains('Mattis amet hendrerit dolor, quisque lorem pharetra. Pellentesque lacus nisi urna, arcu sociis eu. Orcivel lectus nisl eget eget ut consectetur. Sit justo viverra non adipisicing elit distinctio.');
    }
    clickStartBtn() {
        cy.get('button').contains('Start').click();
    }
    qOneInput() {
        cy.get('#main > form > div > div > div.space-y-8.sm\\:space-y-5 > div > div:nth-child(1) > div > div.mt-1.sm\\:mt-0.sm\\:col-span-2 > input').type('Test');
    }
}
export default new assessmentsPage();