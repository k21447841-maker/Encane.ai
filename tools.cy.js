describe('AI Tools', () => {
  beforeEach(() => {
    // Set up completed onboarding
    cy.setLocalStorage('hasSelectedLanguage', 'true')
    cy.setLocalStorage('hasSeenOnboarding', 'true')
    cy.setLocalStorage('hasProfile', 'true')
    cy.visit('/home')
  })

  it('uses AI Writer tool', () => {
    cy.contains('AI Writer').click()
    
    // Fill form
    cy.get('input[placeholder*="topic"]').type('Artificial Intelligence')
    cy.contains('Generate Content').click()
    
    // Should show loading then result
    cy.get('.animate-spin').should('be.visible')
    cy.contains('Generated Content', { timeout: 10000 }).should('be.visible')
  })

  it('uses Summarizer tool', () => {
    cy.contains('Summarizer').click()
    
    // Paste text
    cy.get('textarea[placeholder*="Paste"]').type(
      'This is a long text that needs to be summarized. It contains multiple sentences and important information that should be condensed into a shorter version.'
    )
    
    cy.contains('Summarize').click()
    
    // Should show summary
    cy.contains('Summary', { timeout: 10000 }).should('be.visible')
  })

  it('uses Idea Generator', () => {
    cy.contains('Idea Generator').click()
    
    // Select category
    cy.contains('Business Ideas').click()
    cy.contains('Generate Ideas').click()
    
    // Should show ideas
    cy.contains('Generated Ideas', { timeout: 10000 }).should('be.visible')
  })

  it('uses Task Planner', () => {
    cy.contains('Task Planner').click()
    
    // Fill form
    cy.get('input[placeholder*="goal"]').type('Launch a new product')
    cy.contains('Create Plan').click()
    
    // Should show plan
    cy.contains('Your Action Plan', { timeout: 10000 }).should('be.visible')
  })
})