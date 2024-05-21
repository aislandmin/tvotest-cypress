/// <reference types="cypress" />

describe('TVO Test Tuite', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
      cy.visit('/') // baseUrl: 'https://tvolearn.com/' defined in cypress.config.js

      //Navigate to the "Learning Resources (K-12)" dropdown from the header
      cy.get('#AccessibleNav').should('be.visible').contains('Learning Resources (K-12)').click()

      // Generate the random integer in [1, 8]
      const randomIntGrade = Math.floor(Math.random() * 8) + 1
      //Choose a Grade level between 1 and 8 randomly
      cy.get('#SiteNavLabel-learning-resources-k-12').should('be.visible').find('a').contains(`Grade ${randomIntGrade}`).click()

      //Scroll down to the "Learn Forward in the Curriculum" section
      cy.get('.shogun-heading-component').contains('Learn Forward in the Curriculum').scrollIntoView()

      //Get the count of cards in the "Learn Forward in the Curriculum" section
      cy.get('a:visible:contains("Explore Details")').its('length').should('be.greaterThan', 0).then((length) => {
        const cardCount = length
        cy.log('card count: ' + cardCount)

        //Click on any card by generating a random nunber [0, cardCound - 1] as the index of card array
        const randomIntCardNo = Math.floor(Math.random() * cardCount)
        cy.get('a:visible:contains("Explore Details")').eq(randomIntCardNo).click()
      })
    })
  
    //Test case 1 - Verify Content Sections
    it('Should display all main content sections', () => {
      cy.get('.shogun-heading-component').contains('How to Use These Resources').should('be.visible')
      cy.get('.shogun-heading-component').contains('Curriculum Overview').should('be.visible')
      cy.get('.shogun-heading-component').contains('Resources for Learning').should('be.visible')
      cy.get('.shogun-heading-component').contains('Apply the Learning').should('be.visible')
      cy.get('.shogun-heading-component').contains('Vocabulary').should('be.visible')
      cy.get('.shogun-heading-component').contains('Looking for a Different Subject?').should('be.visible')
  
      cy.get('#strandsTop').contains('Learning Activities').should('be.visible')
    })
  
    //Test case 2 - Verify Link Functionality within the Page
    it('Should navigate to correct pages when links are clicked', () => {
      cy.get('a').each($el => {
        const href = $el.prop('href');
        if (href) {
          cy.request(href).its('status').should('eq', 200);
        }
      });
    })
  
    //Test case 3 - Verify Navigation to Subsections within the Page
    it('Should scroll to the correct section when internal navigation links are clicked', () => {
      cy.get('.jumplinks').find('a').each($el => {
          const href = $el.prop('href');
          cy.get($el).click();
          cy.get('#' + href.split('#')[1]).should('exist'); 
      });
    })
    
    //Test case 4 - Verify Search Functionality
    it('Should return correct search results', () => {
      cy.get('#AccessibleNav').find('[data-predictive-search-open-drawer]').click()
      cy.get('#SearchDrawer').find('input[type="text"]').type('algebra{enter}')
      cy.get('.search-results-content').should('contain', 'algebra')
    })
  
    //Test case 5 - Verify Card Functionality of the 'Looking for a Different Subject' section
    it('Should navigate to the correct different subject page when a card is clicked', () => {
      cy.location('pathname').as('pathname')
      cy.get('li.current').as('subject')
  
      cy.get('.section-select-grade').find('div[data-col-grid-mode-on]').find('a').first().click()
  
      cy.location('pathname').should('not.equal', cy.get('@pathname'));
      cy.get('li.current').should('not.contain', cy.get('@subject'));
    });
  
    //Test case 6 - Verify Subscription Functionality with Valid Email Address
    it('Allow users to subscribe to newspaper', () => {
      cy.get('#mce-EMAIL').type('tomtest@gmail.com') 
      cy.get('#mc-embedded-subscribe').click()
      cy.get('#mce-success-response').should('exist')
        .contains('To complete the subscription process, please click the link in the email we just sent you.')
    })
  
    //Test case 7 - Verify Subscription Functionality with Invalid Email Address
    it('Do NOT allow an invalid email address to subscribe to newspaper', () => {
      cy.get('#mce-EMAIL').type('tomtest') 
      cy.get('#mc-embedded-subscribe').click()
      cy.get('.mce_inline_error').should('exist').contains('Please enter a valid email address.')
    })
  })

  context('iphone-6 resolution', () => {
    beforeEach(() => {
      cy.viewport('iphone-6')
      cy.visit('/') // baseUrl: 'https://tvolearn.com/' defined in cypress.config.js

      //Click icon-hamburger to display nav menu
      cy.get('button.js-mobile-nav-toggle.mobile-nav--open:visible').should('exist').click()
      
      //Navigate to the "Learning Resources (K-12)" dropdown from the header
      cy.get('#MobileNav').should('be.visible').find('[data-target="learning-resources-k-12-1"]').click()

      // Generate the random integer in [1, 8]
      const randomIntGrade = Math.floor(Math.random() * 8) + 1
      cy.log(`randomIntGrade: ${randomIntGrade}`)

      //if pink note shows up, close it at first
      cy.get('div.pink_banner').then($el => {
        if ($el.length) {
          cy.log('pink banner shows up')
          cy.get('div.pink_banner_x').click()
        }
      })
      //Choose a Grade level between 1 and 8 randomly
      cy.get('nav.js-menu--is-open.sub-nav--is-open').find('a').contains(`Grade ${randomIntGrade}`).click()

      //Scroll down to the "Learn Forward in the Curriculum" section
      cy.get('.shg-box-content').contains('Learn Forward in the Curriculum').scrollIntoView()

      //Get the count of cards in the "Learn Forward in the Curriculum" section
      cy.get('a:visible:contains("Explore Details")').its('length').should('be.greaterThan', 0).then((length) => {
        const cardCount = length
        cy.log('card count: ' + cardCount)

        //Click on any card by generating a random nunber [0, cardCound - 1] as the index of card array
        const randomIntCardNo = Math.floor(Math.random() * cardCount)
        cy.get('a:visible:contains("Explore Details")').eq(randomIntCardNo).click()
      })
    })

    //Test case 8 - Verify Back-to-Top Arrow
    it('Should show back-to-top arrow when scrolling down, scroll back to the top when clicked', () => {
      cy.get('#bttopBtn').should('not.be.visible')

      cy.scrollTo('bottom')
      cy.wait(500) 

      cy.get('#bttopBtn').should('be.visible')
      cy.get('#bttopBtn').click()
      cy.wait(500) 

      cy.window().its('scrollY').should('equal', 0)
    })

    //Test case 9 - Verify Clickability of "Learning Activities" section
    it('Should NOT be clickable for Learning Activities section', () => {
      cy.get('#la-menu-dialog-dialog_label').should('not.be.visible') //tablet
      cy.get('#strand-tabs').should('not.be.visible') //desktop

      cy.get('div.strands-top-box').find('a').should('not.be.visible') //Not any a link visible to click
    })

    //Test case 10 - Verify Navigation Menu
    it('Should display navigation menu correctly', () => {
      cy.get('#AccessibleNav').should('not.be.visible')

      cy.get('button.js-mobile-nav-toggle.mobile-nav--open:visible').should('exist').click()
      cy.get('#MobileNav').should('be.visible')

      cy.get('button.js-mobile-nav-toggle.mobile-nav--close:visible').should('exist').click()
      cy.get('#MobileNav').should('not.be.visible')
    })
  })
})
