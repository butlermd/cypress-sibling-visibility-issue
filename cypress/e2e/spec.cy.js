describe('Sibling visibility issue', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('By default, main is visible and nav is not', () => {
    cy.get('main').should('be.visible');
    cy.get('nav').should('not.be.visible');
  });

  it('Clicking the button in main switches to nav view', () => {
    cy.get('main button').click();
    cy.get('nav').should('be.visible');
    cy.get('main').should('not.be.visible');
  });
})