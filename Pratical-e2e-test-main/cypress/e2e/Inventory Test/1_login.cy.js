import { users, url } from "./Mock";

describe('Inventory - Login', () => {
    it('Should login with valid credentials', () => {
      cy.visit(url);

      cy.get('[data-test="username"]').type(users.standard_user.username);
      cy.get('[data-test="password"]').type(users.standard_user.password);
      cy.get('[data-test="login-button"]').click();

      cy.contains('Products');
    });
    
    it.skip('Should login with valid credentials and do logout');

    it.skip('Should not login with invalid credentials');

    it.skip('Should not allow "locked_out_user" do sign in');

    it.skip('Should login with "performance_glitch_user" and wait the products page loads');
  })