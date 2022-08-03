class homePagePO {
    visitSite() {
        cy.visit('http://localhost:3000/');
    }
    logo() {
        cy.get('#__next > div > header > nav > div > div > div > div.flex-1.flex.items-center > div > img').should('be.visible');
    }
    title() {
        cy.get("h1").contains("Connect Health Patient Portal");
    }
    // gpPracticeLink() {
    //     cy.get("p").contains("Link Your GP Practice");
    // }
    // navMenuHome() {
    //     cy.get('span').contains('Home');
    // }
    // navMenuHomeIcon() {
    //     cy.get('#__next > div > div > div > div > nav > div.pb-8.space-y-1 > a.bg-black.text-white.group.flex.items-center.px-3.py-2.text-sm.font-bold > svg').should('be.visible');
    // }
    // navMenuHomeHighlight() {
    //     cy.get('span').contains('Home').parent().should('have.css', 'background-color', 'rgb(0, 0, 0)');
    // }
    navMenuPathway() {
        cy.get('p').contains('Your Pathway');
        cy.get('p').contains('Track your progress.');
    }
    navMenuNotifIcon() {
        cy.get('#__next > div > div > div > div > nav > div.pb-8.space-y-1 > a:nth-child(2) > svg').should('be.visible');
    }
    navMenuPathwayHighlight() {
        cy.get('p').contains('Your Pathway').parent().should('have.css', 'background-color', 'rgb(0, 0, 0)');
    }
    navMenuAppointments() {
        cy.get('p').contains('Your Appointment')
        cy.get('p').contains('Manage your appointments.');
    }
    navMenuAppointmentsIcon() {
        cy.get('#__next > div > div > div > div > nav > div.pb-8.space-y-1 > a:nth-child(3) > svg').should('be.visible');
    }
    navMenuAppointmentsHighlight() {
        cy.get('p').contains('Your Appointment').parent().should('have.css', 'background-color', 'rgb(0, 0, 0)');
    }
    navMenuDocuments() {
        cy.get('p').contains('Your Documents');
        cy.get('p').contains('View or download your documents.');
    }
    navMenuDocumentsIcon() {
        cy.get('#__next > div > div > div > div > nav > div.pb-8.space-y-1 > a:nth-child(4) > svg').should('be.visible');
    }
    navMenuDocumentsHighlight() {
        cy.get('p').contains('Your Documents').parent().should('have.css', 'background-color', 'rgb(0, 0, 0)');
    }
    navMenuQuest() {
        cy.get('p').contains('Your Questionnaires');
        cy.get('p').contains('Complete your electronic questionnaires.');
    }
    navMenuAssessmentsIcon() {
        cy.get('#__next > div > div > div > div > nav > div.pb-8.space-y-1 > a:nth-child(5) > svg').should('be.visible');
    }
    navMenuQuestHighlight() {
        cy.get('p').contains('Your Questionnaires').parent().should('have.css', 'background-color', 'rgb(0, 0, 0)');
    }
    navMenuExercises() {
        cy.get('p').contains('Your Exercises');
        cy.get('p').contains('View your exercise programmes.');
    }
    navMenuPhysiTrackIcon() {
        cy.get('#__next > div > div > div > div > nav > div.pb-8.space-y-1 > a:nth-child(6) > svg').should('be.visible');
    }
    navMenuExercisesHighlight() {
        cy.get('p').contains('View your excercise programs.').parent().should('have.css', 'background-color', 'rgb(0, 0, 0)');
    }
    healthJourneyTitle() {
        cy.get('h2').contains('Your Connect Health Pathway');
    }
    journeyReferral() {
        cy.get('p').contains('Referral to Connect Health');
    }
    journeyAdvancedInitialAssessment() {
        cy.get('p').contains('Advanced to initial assessment by');
        cy.get('a').contains('Bethany Blake');
    }
    journeyCompletedInitialAssessment() {
        cy.get('p').contains('Completed initial assessment for');
        cy.get('a').contains('Medial Branch Block');
    }
    journeyAdvancedConsultation() {
        cy.get('p').contains('Advanced to consultation by');
        cy.get('a').contains('Bethany Blake');
    }
    journeyCompletedConsultation() {
        cy.get('p').contains('Completed consultation with');
        cy.get('a').contains('Katherine Snyder');
    }
    journeyAdvancedToProms() {
        cy.get('p').contains('Advanced to Manchester Proms Initial Assessment with');
        cy.get('a').contains('Katherine Snyder');
    }
    checkJourneyDates() {
        cy.get('time').contains('Sep 20');
        cy.get('time').contains('Sep 22');
        cy.get('time').contains('Sep 28');
        cy.get('time').contains('Sep 30');
        cy.get('time').contains('Oct 4');
    }
    footerLinks() {
        cy.get('h3').contains('Links');
        cy.get('li').contains('Notifications');
        cy.get('li').contains('Appointments')
        cy.get('li').contains('Digital Assessments');
        cy.get('li').contains('PhysiTrack');
    }
    support() {
        cy.get('h3').contains('Support');
        cy.get('li').contains('Portal Help');
        cy.get('li').contains('Patient FAQs');
        cy.get('li').contains('Contact Us');
    }
    company() {
        cy.get('h3').contains('Company');
        cy.get('li').contains('About');
        cy.get('li').contains('Blog');
        cy.get('li').contains('Jobs');
        cy.get('li').contains('Press');
        cy.get('li').contains('Partners');
    }
    legal() {
        cy.get('h3').contains('Legal');
        cy.get('li').contains('Claim');
        cy.get('li').contains('Privacy');
        cy.get('li').contains('Terms');
    }
    social() {
        cy.get('#__next > div > footer > div.border-t-4.border-black.font-bold > div > div > a:nth-child(1) > svg').should('be.visible');
        cy.get('#__next > div > footer > div.border-t-4.border-black.font-bold > div > div > a:nth-child(2) > svg').should('be.visible');
        cy.get('#__next > div > footer > div.border-t-4.border-black.font-bold > div > div > a:nth-child(3) > svg').should('be.visible');
        cy.get('#__next > div > footer > div.border-t-4.border-black.font-bold > div > div > a:nth-child(4) > svg').should('be.visible');
    }
    more() {
        cy.get('span').contains('More').parent();
    }
    viewNotifications() {
        cy.get('span').contains('View notifications').parent();
    }
    viewHelp() {
        cy.get('span').contains('View help').parent();
    }
    checkMoreMenu() {
        cy.get('a').contains('Your Profile').should('be.visible');
        cy.get('a').contains('Sign in').should('be.visible');
        cy.get('a').contains('Sign out').should('be.visible');
    }
    faq() {
        cy.get('#__next > div > header > nav > div > div > div > div.absolute.inset-y-0.right-0.flex.items-center.pr-2.sm\\:static.sm\\:inset-auto.sm\\:ml-6.sm\\:pr-0 > button:nth-child(1) > svg').click();
        cy.url().should('eq', 'http://localhost:3000/faqs')
    }
    
}
export default new homePagePO();