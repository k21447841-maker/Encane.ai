// Import commands
import './commands'

// Import Cypress Axe for accessibility testing
import 'cypress-axe'

// Hide XHR requests from command log
const app = window.top
if (app) {
  app.console.log = () => {}
}

// Custom error handler
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false prevents Cypress from failing the test
  return false
})

// Add custom logging
Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    cy.task('log', `Test failed: ${test.title}`)
  }
})

// Set default viewport
beforeEach(() => {
  cy.viewport(375, 667) // Mobile viewport
})

// Clear storage before each test
beforeEach(() => {
  cy.clearLocalStorage()
  cy.clearCookies()
  cy.window().then(win => {
    win.sessionStorage.clear()
  })
})