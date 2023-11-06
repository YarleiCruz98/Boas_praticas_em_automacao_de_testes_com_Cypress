describe('Code duplication bad practice - repetitive tests', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/search**'
    ).as('getStories')

    cy.visit('https://hackernews-seven.vercel.app')
    cy.wait('@getStories')

    cy.get('input[type="text"]')
      .should('be.visible')
      .and('have.value', 'redux')
      .as('searchField')
      .clear()
  })

  const terms = [
   'reactjs',
   'vuejs' 
  ]

  terms.forEach(element => {
    it(`searches for "${element}"`, () => {
      
      cy.search(element)

      cy.wait('@getStories')

      cy.get('.table-row')
        .should('have.length', 100)
  });
    
  })
})
