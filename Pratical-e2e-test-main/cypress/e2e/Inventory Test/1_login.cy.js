import { users, url } from "./Mock";

describe('Inventory - Login', () => {
    it('Should login with valid credentials', () => {
      cy.visit(url);

      cy.get('[data-test="username"]').type(users.standard_user.username);
      cy.get('[data-test="password"]').type(users.standard_user.password);
      cy.get('[data-test="login-button"]').click();

      cy.contains('Products');
    });
    
    it('Should login with valid credentials and do logout', () => {
      cy.visit(url); 

      cy.get('[data-test="username"]').type(users.standard_user.username);
      cy.get('[data-test="password"]').type(users.standard_user.password);
      cy.get('[data-test="login-button"]').click();
    
      cy.url().should('include', '/inventory.html');
      cy.get('.title').should('have.text', 'Products');
    
      cy.get('#react-burger-menu-btn').click();
      cy.get('#logout_sidebar_link').click();
    
      cy.url().should('include', '/');
      cy.get('[data-test="login-button"]').should('be.visible');
    });

    it('Should not login with invalid credentials', () => {
      cy.visit(url); 

      cy.get('[data-test="username"]').type('invalid_user');
      cy.get('[data-test="password"]').type('wrong_password');
      cy.get('[data-test="login-button"]').click();
    
      cy.get('[data-test="error"]').should('be.visible')
        .and('contain.text', 'Username and password do not match');
    });

    it('Should not allow "locked_out_user" to sign in', () => {
      cy.visit(url); 

      cy.get('[data-test="username"]').type(users.locked_out_user.username);
      cy.get('[data-test="password"]').type(users.locked_out_user.password);
      cy.get('[data-test="login-button"]').click();
    
      cy.get('[data-test="error"]').should('be.visible')
        .and('contain.text', 'Sorry, this user has been locked out.');
    });

    it('Should login with "performance_glitch_user" and wait for the products page to load', () => {
      cy.visit(url); 

      cy.get('[data-test="username"]').type(users.performance_glitch_user.username);
      cy.get('[data-test="password"]').type(users.performance_glitch_user.password);
      cy.get('[data-test="login-button"]').click();
    
      cy.url().should('include', '/inventory.html');
      cy.get('.title', { timeout: 10000 }).should('have.text', 'Products');
    });
  
  })