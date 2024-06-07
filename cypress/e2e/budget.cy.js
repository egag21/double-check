describe('Budget Checklist', () => {
  it('should add a budget item', () => {
    cy.visit('/');
    cy.get('#itemName').type('Groceries');
    cy.get('#itemAmount').type('100');
    cy.get('button').contains('Add Item').click();
    cy.get('.list-group').should('contain', 'Groceries');
  });
});
