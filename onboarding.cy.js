describe('Onboarding Flow', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('completes full onboarding flow', () => {
    // Splash screen should appear
    cy.contains('AI Automation Hub').should('be.visible')
    
    // Wait for splash to complete and redirect to language
    cy.contains('Choose Your Language', { timeout: 3000 }).should('be.visible')
    
    // Select language
    cy.contains('English').click()
    cy.contains('Continue').click()
    
    // Onboarding screens
    cy.contains('Welcome to AI Automation Hub').should('be.visible')
    cy.contains('Next').click()
    
    cy.contains('AI Assistant Chat').should('be.visible')
    cy.contains('Next').click()
    
    cy.contains('Smart Tools').should('be.visible')
    cy.contains('Next').click()
    
    cy.contains('Daily Insights').should('be.visible')
    cy.contains('Get Started').click()
    
    // Profile setup
    cy.contains('Complete Your Profile').should('be.visible')
    cy.get('input[placeholder="Enter your name"]').type('Test User')
    cy.get('input[placeholder="Select your country"]').type('United States')
    
    // Select goal
    cy.contains('Personal Growth').click()
    
    // Submit
    cy.contains('Get Started').click()
    
    // Should reach home page
    cy.contains('Welcome back').should('be.visible')
  })

  it('skips onboarding if already completed', () => {
    // Set localStorage to simulate completed onboarding
    cy.setLocalStorage('hasSelectedLanguage', 'true')
    cy.setLocalStorage('hasSeenOnboarding', 'true')
    cy.setLocalStorage('hasProfile', 'true')
    
    cy.reload()
    
    // Should go directly to home
    cy.contains('Welcome back').should('be.visible')
  })
})