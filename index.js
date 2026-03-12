/// <reference types="cypress" />

const { injectAxe } = require('cypress-axe')

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // Add accessibility testing
  on('task', {
    log(message) {
      console.log(message)
      return null
    },
    table(message) {
      console.table(message)
      return null
    }
  })

  // Add code coverage support
  require('@cypress/code-coverage/task')(on, config)

  // Add axe for accessibility testing
  on('before:browser:launch', (browser = {}, launchOptions) => {
    injectAxe()
    return launchOptions
  })

  return config
}