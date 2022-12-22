/// <reference types="Cypress" />
describe('Jio Order Spec', () => {
  it('test1  - jio order verification', () => {

    // P!n@2021
    // 410210
    // 1234
    cy.visit('https://jiomart-partner.jmphostx3.de/sections/landing-page');
    cy.get('.loginless-menus > :nth-child(2) > span').click();
    cy.get('.segment-chooser.selected').click();
    cy.get('.jm-btn').click();
    cy.get('.login-tabs > :nth-child(2) > .tab-content').click();
    cy.get('#username').type('nishant.tomer01@gmail.com');
    cy.get('#password').type('P!n@2021');
    cy.get('.jm-btn').click();

    cy.get('#field').click({ force: true });
    cy.wait(3000);
    cy.get('#field[data-v-6c494012]').type(410210, { force: true });

    cy.get('.pincodeContainer > .address', { timeout: 3_000 }).should('have.text', ' Kamothe, Maharashtra ');
    cy.get('.right-icons > .input').click({ force: true });
    cy.get('.category-slider-header > .title', { timeout: 5_000 }).should('have.text', 'Categories');
    cy.get('.wishlist-icon > .icon-top').click();

    //click on first item from wishlist page
    cy.get(':nth-child(1) > .outer-container > .cat-item').click();
    cy.get('body').then($body => {
      if ($body.find('.qty-minus').length > 0) {
        cy.get('.qty-minus').click();
      }
    })

    cy.get('.add-to-cart-btn').click();
    cy.get('.cart-icon > .icon-top').click();

    //click on confirm button on cart page
    cy.get('.jm-btn').click();

    // select the address radio button
    cy.get('.radio-left').click();

    //click on confirm on address selection page
    cy.get('.jm-btn').click();

    //click on jio credit radio button
    cy.get(':nth-child(2) > label > .payment-single').click();

    //click on confirm button on payment page
    cy.get('.jm-btn').click();

    cy.get('.page > .title').should('have.text', ' Review Order ');
    //click on confirm on review order page
    cy.get('.jm-btn').scrollIntoView({ easing: 'linear' }).click();


    cy.origin('https://api-blackbox.epaylater.in/*', () => {
      //type otp
      cy.get('.form-control').type(1234);

      //click continue
      cy.get('#continueButton').click();
    })

    // continue on review payment button
    cy.origin('https://api-blackbox.epaylater.in/txn/summary', () => {
      cy.get('.deskPrimary').click();
    });

    cy.get('.label-one', { timeout: 7_000 }).should('have.text', 'Success!');
  })
})
