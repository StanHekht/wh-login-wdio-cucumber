
let faker = require('faker');
require('dotenv').config();

describe('WH Login Modal', () => {
    before('should visit homepage and open login modal', () => {
        browser.url('/');
        let elem = $("[data-qa='neogames-login']");
        elem.waitForClickable();
        elem.click();
    })

    it('should have login modal expanded', () => {
        let loginModalElem = $("[class='mwc-modal-content']");
        expect(loginModalElem).toBeDisplayed();
    })

    it('should have all modal elements present', () => {
        let modalTitleElem = $("#modalTitle");
        expect(modalTitleElem).toHaveText("SIGN IN");

        let chatIconElem = $("//mwc-login-header//i");
        expect(chatIconElem).toBeDisplayed();

        let closeButtonElem = $("[class='mwc-close']");
        expect(chatIconElem).toBeDisplayed();

        let userNameInputElem = $("#user");
        expect(userNameInputElem).toBeDisplayed();

        let userPasswordInputElem = $("#password");
        expect(userPasswordInputElem).toBeDisplayed();

        let modalContentElem = $("//*[@class='mwc-modal-content']");
        expect(modalContentElem).toHaveTextContaining("Forgot Email?");
        expect(modalContentElem).toHaveTextContaining("Forgot Password?");
        expect(modalContentElem).toHaveTextContaining("Don't have");
        expect(modalContentElem).toHaveTextContaining("Bet With");

        let submitButtonElem = $("#submit");
        expect(submitButtonElem).toBeDisplayed();
        expect(submitButtonElem).toHaveText("SIGN IN");
    })

    it('should have user input field focused', () => {
        let userNameInputElem = $("#user");
        let userPasswordInputElem = $("#password");
        expect(userNameInputElem).toBeFocused();
        expect(userPasswordInputElem).not.toBeFocused();
    })

    it('should have user and passwod input fields blank with placeholder text', () => {
        let userNameInputElem = $("#user");
        let userPasswordInputElem = $("#password");

        expect(userNameInputElem).toHaveValue("");
        expect(userPasswordInputElem).toHaveValue("");

        expect(userNameInputElem).toHaveAttribute("placeholder", "Email:");
        expect(userPasswordInputElem).toHaveAttribute("placeholder", "Password:");
    })

    it('have remember me checkbox works as designed', () => {
        let checkboxElem = $("[type='checkbox']");
        let checkboxLinkElem = $("//*[@class='mwc-checkbox']/i");

        expect(checkboxElem).toHaveAttribute("aria-checked", "false");

        checkboxLinkElem.waitForClickable();
        checkboxLinkElem.click();

        expect(checkboxElem).toHaveAttribute("aria-checked", "true");
    })

    it('should not allow user to log in with blank credentials', () => {
        let userNameInputElem = $("#user");
        let userPasswordInputElem = $("#password");
        let submitButtonElem = $("#submit");
        let modalContentElem = $("//*[@class='mwc-modal-content']");

        submitButtonElem.waitForClickable();
        submitButtonElem.click();

        expect(modalContentElem).toHaveTextContaining("Please enter a valid email address");
        expect(modalContentElem).toHaveTextContaining("Password is required");
    })

    it('should not allow user to log in with incorrect credentials', () => {
        let userNameInputElem = $("#user");
        let userPasswordInputElem = $("#password");
        let submitButtonElem = $("#submit");
        let errorMessageElem = $("[class='mwc-form-error-message-text']");

        userNameInputElem.setValue(faker.internet.email());
        userPasswordInputElem.setValue(faker.internet.password());

        submitButtonElem.waitForClickable();
        submitButtonElem.click();

        expect(errorMessageElem).toHaveTextContaining("You have entered an incorrect");

        userNameInputElem.clearValue();
        userPasswordInputElem.clearValue();
    })

    it('should allow user to log in with correct credentials', () => {
        let userNameInputElem = $("#user");
        let userPasswordInputElem = $("#password");
        let submitButtonElem = $("#submit");
        let myAccountElem = $("[class='myAccountLabel']");

        userNameInputElem.setValue(process.env.EMAIL);
        userPasswordInputElem.setValue(process.env.PASSWORD);

        submitButtonElem.waitForClickable();
        submitButtonElem.click();

        expect(myAccountElem).toHaveTextContaining("My Account");
    })

    it('should allow user to log out', () => {
        let userNameInputElem = $("#user");
        let userPasswordInputElem = $("#password");
        let submitButtonElem = $("#submit");
        let myAccountElem = $("[class='myAccountLabel']");
        let logoutHeaderElem = $('#modalTitle');
        let logoutCloseElem = $("[class*='mwc-close']");

        let accountButton = $('[data-qa="neogames-account"]');
        accountButton.waitForClickable();
        accountButton.click();

        let logoutButton = $('[data-qa="neogames-logout"]');
        logoutButton.waitForClickable();
        logoutButton.click();

        expect(logoutHeaderElem).toHaveText("LOGGED OUT");

        logoutCloseElem.waitForClickable();
        logoutCloseElem.click();

        browser.pause(3000);
    })
})
