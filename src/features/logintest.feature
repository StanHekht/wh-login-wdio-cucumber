Feature: William Hill Login Test On Initial Load
    As a William Hill customer
    I want to be able to use its website login functionality

    Scenario: Open Login Modal
        Given I open the url "https://www.williamhill.com/us/nj/bet/"
        And   I pause for 3000ms
        When  I click on the element "[data-qa='neogames-login']"
        Then  I expect that element "[class='mwc-modal-content']" does exist

    Scenario: The login modal should open and contain all required elements
        Given there is an element "[class='mwc-modal-content']" on the page
        Then   I expect that element "#modalTitle" contains the text "SIGN IN"
        And   I expect that element "//mwc-login-header//i" does exist
        And   I expect that element "[class='mwc-close']" does exist
        And   I expect that element "#user" does exist
        And   I expect that element "#password" does exist
        And   I expect that element "#user" is focused
        And   I expect that element "#password" is not focused
        And   I expect that element "#user" is empty
        And   I expect that element "#password" is empty
        And   I expect that the attribute "placeholder" from element "#user" is "Email:"
        And   I expect that the attribute "placeholder" from element "#password" is "Password:"
        And   I expect that element "//*[@class='mwc-modal-content']" contains the text "Forgot Email?"
        And   I expect that element "//*[@class='mwc-modal-content']" contains the text "Forgot Password?"
        And   I expect that element "#submit" does exist
        And   I expect that element "#submit" contains the text "SIGN IN"
        And   I expect that element "//*[@class='mwc-modal-content']" contains the text "Don't have"
        And   I expect that element "//*[@class='mwc-modal-content']" contains the text "Bet With"

    Scenario: "Remember Me" checkbox should work as designed
        Given the attribute "aria-checked" from element "[type='checkbox']" is "false"
        When  I click on the element "//*[@class='mwc-checkbox']/i"
        Then  I expect that the attribute "aria-checked" from element "[type='checkbox']" is "true"
        When  I click on the element "//*[@class='mwc-checkbox']/i"
        Then  I expect that the attribute "aria-checked" from element "[type='checkbox']" is "false"

    Scenario: User should not be able to log in with empty credentials
        Given there is an element "#submit" on the page
        When  I click on the element "#submit"
        Then  I expect that element "//*[@class='mwc-modal-content']" contains the text "Please enter a valid email address"
        And   I expect that element "//*[@class='mwc-modal-content']" contains the text "Password is required"

    Scenario: User should not be able to log in with incorrect credentials
        Given there is an element "#submit" on the page
        When  I add incorrect user email to the inputfield "#user"
        And   I add incorrect user password to the inputfield "#password"
        And   I click on the element "#submit"
        Then  I expect that element "[class='mwc-form-error-message-text']" contains the text "You have entered an incorrect"

    Scenario: User should successfully log in with correct credentials
        Given there is an element "#submit" on the page
        When  I clear the inputfield "#user"
        And   I clear the inputfield "#password"
        And   I add correct user email to the inputfield "#user"
        And   I add correct user password to the inputfield "#password"
        And   I click on the element "#submit"
        Then  I expect that element "[class='myAccountLabel']" contains the text "My Account"


        And   I pause for 5000ms
