describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('Preenche os campos obrigatórios e envia formulário', () => {
    const longText = Cypress._.repeat('Ola', 50)

    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('email@example.com')
    cy.get('#open-text-area').type(longText, { delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter um email inválido', () => {
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('email.com')
    cy.get('#open-text-area').type('Ola')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
})

it('Campo telefone aceita apenas números', () => {
  cy.get('#phone')
    .type('abcde')
    .should('have.value', '')
})

it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => { 
  cy.get('#firstName').type('John')
  cy.get('#lastName').type('Doe')
  cy.get('#email').type('email@email.com')
  cy.get('#open-text-area').type('Ola')
  cy.get('#phone-checkbox').click()
  cy.contains('button', 'Enviar').click()
  cy.get('.error').should('be.visible')
})


it('Preenche e limpa os campos de texto', () => {
  cy.get('#firstName').type('John')
  .should('have.value' , 'John')
  .clear()
  .should('have.value' , '')
})

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
  cy.contains('button', 'Enviar').click()
  cy.get('.error').should('be.visible')
})

it('Envia o formulário com sucesso usando o comando customizado', () => {
  cy.fillMandatoryFieldsAndSubmit()
  cy.get('.success').should('be.visible')
})

it('Seleciona um produto (YouTube) por seu texto', () => {
  cy.get('#product').select('youtube')
  .should('have.value', 'youtube')})

it('Seleciona um produto (mentoria) por seu valor(value)', () => {
  cy.get('select').select('mentoria')
  .should('have.value', 'mentoria')})

it('Seleciona um produto um produto (Blog) por seu índice', () => {
  cy.get('select').select(1)
  .should('have.value', 'blog')})

it.only('Marca o tipo de atendimento "Feedback"', () => {
  cy.get('input[type="radio"][value="feedback"]')
  .check()
  .should('be.checked')
})

it('arca o tipo de atendimento "Feedback"', () => {
  cy.get('input[type="radio"][value="feedback"]')
  .check()
  .should('be.checked')
})

})