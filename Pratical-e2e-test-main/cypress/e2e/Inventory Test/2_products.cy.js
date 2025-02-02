import { users, url } from './Mock';
import { doSignIn } from './Utils';

describe('Inventory - Products', () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);
  });

  it.skip('Should see the product details and add to cart');

  it.skip('Should sort products by price properly (high to low)');

  it.skip('Should sort products by price properly (low to high)');
});
