// Custom commands for Cypress

Cypress.Commands.add('setLocalStorage', (key, value) => {
  cy.window().then(win => {
    win.localStorage.setItem(key, JSON.stringify(value))
  })
})

Cypress.Commands.add('getLocalStorage', (key) => {
  return cy.window().then(win => {
    return JSON.parse(win.localStorage.getItem(key))
  })
})

Cypress.Commands.add('clearLocalStorage', () => {
  cy.window().then(win => {
    win.localStorage.clear()
  })
})

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('logout', () => {
  cy.visit('/settings')
  cy.contains('Logout').click()
})

Cypress.Commands.add('isPWA', () => {
  return cy.window().then(win => {
    return win.matchMedia('(display-mode: standalone)').matches
  })
})

Cypress.Commands.add('checkA11y', () => {
  cy.injectAxe()
  cy.checkA11y()
})

Cypress.Commands.add('waitForLoader', () => {
  cy.get('.animate-spin').should('be.visible')
  cy.get('.animate-spin', { timeout: 10000 }).should('not.exist')
})

Cypress.Commands.add('takeScreenshot', (name) => {
  cy.screenshot(name, { capture: 'viewport' })
})

Cypress.Commands.add('mockAPI', (method, url, response) => {
  cy.intercept(method, url, {
    statusCode: 200,
    body: response
  }).as('apiCall')
})

Cypress.Commands.add('mockAPIError', (method, url, status = 500) => {
  cy.intercept(method, url, {
    statusCode: status,
    body: { error: 'API Error' }
  }).as('apiError')
})