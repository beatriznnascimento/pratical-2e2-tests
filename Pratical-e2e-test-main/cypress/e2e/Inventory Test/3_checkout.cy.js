import { users, url } from "./Mock";
import { doSignIn } from "./Utils";

describe("Inventory - Products", () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);    
  });

  it.skip("Should do checkout with the correct flow");

  it.skip("Should select some products, go to cart, and go back to continue shopping");

  it.skip("Should not continue checkout with empty delivery information");
});