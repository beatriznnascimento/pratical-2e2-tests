import { users, url } from './Mock';
import { doSignIn } from './Utils';

describe('Inventory - Products', () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);
  });

  it('Should see the product details and add to cart', () => {
    cy.visit(url);

    cy.get('[data-test="username"]').type(users.standard_user.username);
    cy.get('[data-test="password"]').type(users.standard_user.password);
    cy.get('[data-test="login-button"]').click();

    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');

    cy.get('.inventory_item').first().find('.inventory_item_name').click();

    cy.get('.inventory_details_name').should('be.visible');

    cy.get('[data-test^="add-to-cart"]', { timeout: 10000 })
        .should('be.visible')
        .click();

    cy.get('.shopping_cart_badge').should('contain.text', '1');
});

  it.skip('Should sort products by price properly (high to low)');

  it.skip('Should sort products by price properly (low to high)');
});
