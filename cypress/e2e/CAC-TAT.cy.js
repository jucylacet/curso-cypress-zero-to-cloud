describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('Preenche os campos obrigatórios e envia formulário', () => {
    cy.clock() //congela o tempo do navegador
    const longText = Cypress._.repeat('Ola', 30)

    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('email@example.com')
    cy.get('#open-text-area').type(longText, { delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
    cy.tick(3000) // avançar o tempo 3 segundos
    cy.get('.success').should('not.be.visible')
  })

  it('Exibe mensagem de erro ao submeter um email inválido', () => {
    cy.clock() //congela o tempo do navegador

    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('email.com')
    cy.get('#open-text-area').type('Ola')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(3000) // avançar o tempo 3 segundos
    cy.get('.success').should('not.be.visible')
})

it('Campo telefone aceita apenas números', () => {
  cy.get('#phone')
    .type('abcde')
    .should('have.value', '')
})

it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => { 
  cy.clock() //congela o tempo do navegador
  
  cy.get('#firstName').type('John')
  cy.get('#lastName').type('Doe')
  cy.get('#email').type('email@email.com')
  cy.get('#open-text-area').type('Ola')
  cy.get('#phone-checkbox').click()
  cy.contains('button', 'Enviar').click()
  cy.get('.error').should('be.visible')

  cy.tick(3000) // avançar o tempo 3 segundos
  cy.get('.success').should('not.be.visible')
})


it('Preenche e limpa os campos de texto', () => {
  cy.get('#firstName').type('John')
  .should('have.value' , 'John')
  .clear()
  .should('have.value' , '')
})

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
  cy.clock() //congela o tempo do navegador
  cy.contains('button', 'Enviar').click()
  cy.get('.error').should('be.visible')
  cy.tick(3000) // avançar o tempo 3 segundos
  cy.get('.success').should('not.be.visible')
})

it('Envia o formulário com sucesso usando o comando customizado', () => {
  cy.clock() //congela o tempo do navegador
  cy.fillMandatoryFieldsAndSubmit()
  cy.get('.success').should('be.visible')
  cy.tick(3000) // avançar o tempo 3 segundos
  cy.get('.success').should('not.be.visible')
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

it('Marca o tipo de atendimento "Feedback"', () => {
  cy.get('input[type="radio"][value="feedback"]')
  .check()
  .should('be.checked')
})

it('Marca cada tipo de atendimento', () => {
  cy.get('input[type="radio"]')
  .each((typeOfservice) => {
    cy.wrap(typeOfservice)
    .check()
    .should('be.checked')
  })
})

it('Marca ambos checkboxes, depois desmarca o último', () => {
  cy.get('input[type="checkbox"]').check()
  .should('be.checked')
  .last().uncheck().should('not.be.checked')
})

it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => { 
  cy.get('#firstName').type('John')
  cy.get('#lastName').type('Doe')
  cy.get('#email').type('email@email.com')
  cy.get('#open-text-area').type('Ola')
  cy.get('#phone-checkbox').check()
  cy.contains('button', 'Enviar').click()
  cy.get('.error').should('be.visible')
})

it('Seleciona um arquivo da pasta fixtures', () => {
  cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
  .should((input) => {
    expect(input[0].files[0].name).to.equal('example.json')
  })
})

it('Seleciona um arquivo simulando um drag-and-drop', () => {
  cy.get('#file-upload')
  .selectFile('cypress/fixtures/example.json', {
    action: 'drag-drop'})
  .should((input) => {
    expect(input[0].files[0].name).to.equal('example.json')
  })
})

it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
  cy.fixture('example.json').as('sampleFile')
  cy.get('#file-upload')
  .selectFile('@sampleFile')
  .should((input) => {
    expect(input[0].files[0].name).to.equal('example.json')
  })
})

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
  cy.contains('a', 'Política de Privacidade')
  .should('have.attr', 'href', 'privacy.html')
  .and('have.attr', 'target', '_blank') //Segunda verificação para garantir que o link abre em outra aba
})

it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
  cy.contains('a', 'Política de Privacidade')
  .invoke('removeAttr', 'target')
  .click()
  
  cy.contains('h1', 'CAC TAT - Política de Privacidade')
  .should('be.visible')
})

it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
})

it('preenche o campo da área de texto usando o comando invoke', () => {
  cy.get('#open-text-area')
  .invoke('val', 'Ola')
  .should('have.value', 'Ola')
})

it('faz uma requisição HTTP', () => {
  cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
  .as('getRequest')
  .its('status')
  .should('eq', 200)

  cy.get('@getRequest')
  .its('statusText')
  .should('eq', 'OK')

  cy.get('@getRequest')
  .its('body')
  .should('include', 'CAC TAT')
})

it.only('desafio ache o GATO', () => {
  cy.get('#cat')
  .invoke('show')
  .should('be.visible')
  
  cy.get('#title')
  .invoke('text', 'CAT TAT')
})

})