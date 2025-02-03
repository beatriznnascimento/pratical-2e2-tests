import { users, url } from "./Mock";
import { doSignIn } from "./Utils";

describe("Inventory - Products", () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);    
  });

  it("Should do checkout with the correct flow", () => {
    cy.visit(url);
  
    cy.get('[data-test="username"]').type(users.standard_user.username);
    cy.get('[data-test="password"]').type(users.standard_user.password);
    cy.get('[data-test="login-button"]').click();
  
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  
    cy.get('.shopping_cart_link').click();
  
    cy.get('.cart_item').should('have.length', 2);
  
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('12345');

    cy.get('[data-test="continue"]').click();
  
    cy.get('.cart_item').should('have.length', 2);

    cy.get('[data-test="finish"]').click();

    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
  });

  it("Should select some products, go to cart, and go back to continue shopping", () => {
    cy.visit(url);
  
    cy.get('[data-test="username"]').type(users.standard_user.username);
    cy.get('[data-test="password"]').type(users.standard_user.password);
    cy.get('[data-test="login-button"]').click();
  
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  
    cy.get('.shopping_cart_link').click();
  
    cy.get('.cart_item').should('have.length', 2);
  
    cy.get('[data-test="continue-shopping"]').click();
  
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
  });
  
  it("Should not continue checkout with empty delivery information", () => {
    cy.visit(url);
  
    cy.get('[data-test="username"]').type(users.standard_user.username);
    cy.get('[data-test="password"]').type(users.standard_user.password);
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    cy.get('.shopping_cart_link').click();

    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="error"]').should('be.visible')
      .and('contain.text', 'Error: First Name is required');
  });
  
});