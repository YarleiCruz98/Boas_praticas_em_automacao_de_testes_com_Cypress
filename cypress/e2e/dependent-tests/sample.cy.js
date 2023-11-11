describe('Dependent tests bad practice', () => {
  beforeEach(() => {
    cy.visit('http://notes-serverless-app.com/login')

    cy.get('#email').type(Cypress.env('user_email'), { log: false })
    cy.get('#password').type(Cypress.env('user_password'), { log: false })
    cy.get('button[type="submit"]').click()
    
    cy.contains('h1', 'Your Notes', {timeout: 10000}).should('be.visible')
  })

  it('CRUDs a note', () => {

    //create a note
    cy.contains('Create a new note').click()
    cy.get('#content').type('My note')
    cy.contains('Create').click()

    //assert the note was created and click
    cy.get('.list-group')
      .contains('My note')
      .click()

    //Updade a note
    cy.get('#content').type(' updated')
    cy.contains('Save').click()

    //assert the note was updated
    cy.get('.list-group')
      .should('contain', 'My note updated')
    cy.get('.list-group:contains(My note updated)').should('be.visible')

    //Deletes the note
    cy.get('.list-group a').contains('My note updated').click()
    cy.contains('Delete').click()

        // Asserts the list has at least one item before asserting the note deletion
    // This way, we make sure the list of notes has alredy rendered
    cy.get('.list-group a')
      .its('length')
      .should('be.at.least', 1)

    //assert the note was deleted
    cy.get('.list-group:contains(My note updated)').should('not.exist')
  })
})
