describe('Browser testing bad practice - anchor href', () => {
  beforeEach(() => {
    cy.visit('https://notes-serverless-app.com')
  })

  it('validate that the element have the right value and not have a target', () => {
    cy.contains('.nav a', 'Login')
      .should('have.attr', 'href', '/login')
      .and('not.have.attr', 'target')
  })

})
