/// <reference types="cypress" />



describe('This is my first cypress test script', () => {
    // beforeEach(() => {
        // Launch the URL
        const visitLink       = 'https://1423:1423@staging-finance.rabbitinternet.com/en/product/health-insurance/questions'
        const productSelect   = 'IPD/OPD'
        const planSelect      = 'Salary man'
        const newNationality  = 'Philippines'
        const phoneNumber     = '054444444'
        const customPhone     = "div[id='customer_phone']"
        const custFirstName   = '#customer_first_name'
        const nextButton      = " button[type='button']"
        const firstName       = 'Ru'
        const lastName        = 'eL'
        const personEmail     = 'personal@gmail.com'
        const customEmail     = "div[id='customer_email']"
        const genderMale      = 'Male'
        const birthDate       = '01/01/2001'
        const customDob       = "div[id='customer_dob']"
        const planType        = '.SearchCard_search-card__select-container__1tBBr.row>:nth-child(2)> .form-control>:nth-child(2)'
        const insureClearAll  = ':nth-child(7) > .SortFilter_sort-filter__checkboxes__1y8E6.row >:nth-child(2)'
        const insureLocator   = "label[data-test='VIB_TH-label']"
        const insureName      = 'Viriyah Insurance'
        const filterApply     = '.SortFilter_sort-filter__apply-btn-container__32QH6 > .btn'
        const displayResult   = 'div.d-lg-block > .d-flex > :nth-child(2)'
    
    
        it('Check the Rabbit Finance logo if present', () => {
            cy.setCookie('1423', '1423')
            cy.visit(visitLink)
            cy.get("img[alt='Rabbit Finance logo']")
            .should('be.visible')
            
    })

    it('Insurance Category', () => {

        // Insurance header 
        cy.get('.form-section.rounded.mb-md-5:nth-of-type(1) h2')
        .should('be.visible')
        .and('contain.text', 'Insurance')
        .and('have.length', 1)

        //QUESTION : Which product are you looking for?
        cy.get("label[for='product_category']")
        .should('be.visible')
        .and('contain.text', 'Which product are you looking for?')

        // select IPD/OPD
        cy.contains(productSelect).click()

        //QUESTION : Which IPD/OPD plan do you want to be covered?
        cy.get("label[for='product_ipdopd_subcategory']")
        .should('be.visible')
        .and('contain.text', 'Which IPD/OPD plan do you want to be covered?')
        // SELECT : Salary Man
        // cy.get("label[for='product_ipdopd_subcategory-salaryMan']").click()
        cy.contains(planSelect).click()
    

    })
    
    it('Personal Category', () => {
        cy.get('.form-section.rounded.mb-md-5:nth-of-type(2) h2')
        .should('be.visible')
        .and('contain.text', 'Personal')
        .and('have.length', 1)

        //QUESTION : What is your nationality?
        cy.get("label[for='customer_nationality']")
        .should('be.visible')
        .and('contain.text', 'What is your nationality?')

        //Focus Dropdown list
        cy.get("select[name='customer_nationality']").select(newNationality)
        .should('exist', newNationality)

        //Phone Number
        cy.get("label[for='customer_phone']")
        .should('be.visible')
        .and('contain.text', 'What is your phone number?')

        //Phone number textbox
        cy.get("input[placeholder='Ex: 0860000000']").type(phoneNumber)
        .should('contain.value', phoneNumber)
        cy.get(customPhone + nextButton)
        .should('be.visible').click()

        //First Name
        // cy.get("label[for='customer_first_name']").then($labelFirstName => {
        cy.get(custFirstName).then($labelFirstName => {
            const labelModelText = $labelFirstName.text()
            cy.log(labelModelText)
        })
        .should('be.visible')
        .and('contain.text', 'What is your first name?')
        cy.get("input[name='customer_first_name']").type(firstName)
        .should('contain.value', firstName)

        //Last Name
        cy.get("label[for='customer_last_name']")
        .should('be.visible')
        .and('contain.text', 'What is your last name?')
        cy.get("input[name='customer_last_name']").type(lastName)
        .should('contain.value', lastName)

        //next button
        cy.get(custFirstName + nextButton)
        .should('be.visible').click()

        //Email
        cy.get("label[for='customer_email']").should('be.visible')
        .and('contain.text', 'What is your email')
        cy.get("#email").should('be.visible')
        .type(personEmail).and('contain.value', personEmail)
        cy.get(customEmail + nextButton).should('be.visible').click()

        //Gender
        cy.get("label[for='customer_gender']").should('be.visible')
        .and('contain.text', "What is your gender?")
        cy.contains(genderMale).click()

        //BirthDate
        cy.get("label[for='customer_dob']").should('be.visible')
        .and('contain.text', 'What is your date of birth?')
        cy.get("input[name='customer_dob").should('be.visible')
        .type(birthDate).and('contain.value', birthDate)

        //next button
        cy.get(customDob + nextButton)
        .should('be.visible').click()



    })
    it('Privacy Policy', () => {
        cy.contains('Rabbit Finance')
        cy.contains('No consent').should('be.visible').scrollIntoView().click()
        cy.get("#btn-marketing-consent").should('be.visible').scrollIntoView().click()
    })

    it('Verify the selecting product', () => {
        cy.get("label[for='health-category']").should('be.visible')
        .and('contain.text', 'Which product are you looking for?')
        cy.get('#health-category').should('be.visible')
        .and('contain.text', productSelect)
        cy.get(planType).should('be.visible').and('contain.text', planSelect)
    })

    it('Insurer Filter Section', () => {
        cy.wait(3000)
        cy.get(insureClearAll).click().should('be.disabled')
        cy.get(insureLocator).click().should('contain.text', insureName)
        cy.wait(3000)
        cy.get(filterApply).should('be.visible').and('contain.text', 'APPLY').click()
    })

    it('Verify Number of Filtered Insurers', () => {
        Cypress.on('uncaught:exception', (err, runnable) =>{
            return false
        })
        cy.wait(3000)
        cy.get("h2[data-testid='insurer-name']").then(listing => {
            const listingCount = Cypress.$(listing).length
            expect(listing).to.have.length(listingCount)
            cy.log(listingCount)
            cy.get("h2[data-testid='insurer-name']").should('have.length', listingCount)
            cy.get(displayResult).should('contain.text', 'Showing ' + listingCount + ' Plans for ' + productSelect)
        })

    })

    
    // })
})
