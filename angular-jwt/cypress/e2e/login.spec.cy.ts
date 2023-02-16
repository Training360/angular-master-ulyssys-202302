describe('My First Test', () => {
  it('Login into the app', () => {
    cy.visit('/login')
    cy.contains('Login')
    cy.get('input[name=email]').type('cf@gmail.com')
    cy.get('input[name=password]').type('test')
    cy.get('.col-6 form button[type=submit]').click()
    cy.url().then(url => {
      cy.url().should('contain', 'http://localhost:4200/');
      cy.contains('Logout');
    })
  })
  
  it('Login failed', () => {
    cy.visit('/login')
    cy.contains('Login')
    cy.get('input[name=email]').type('cd@gmail.com')
    cy.get('input[name=password]').type('test')
    cy.get('.col-6 form button[type=submit]').click()
    cy.url().then(url => {
      cy.url().should('contain', 'http://localhost:4200/login');
      cy.contains('Hiba: A megadott adatok helytelenek!');
    })
  })
})
