const LoginPage = require('../../pageobjects/login.page');

let faker = require('faker');
require('dotenv').config();

describe('WH Login Modal', () => {
    before('should visit homepage and open login modal', () => {
        browser.url('/');
        LoginPage.loginButton.waitForClickable();
        LoginPage.loginButton.click();
    })

    it('should have login modal expanded', () => {
        expect(LoginPage.loginModalElem).toBeDisplayed();
    })

    it('should have all modal elements present', () => {
        expect(LoginPage.modalTitleElem).toHaveText("SIGN IN");
        expect(LoginPage.chatIconElem).toBeDisplayed();
        expect(LoginPage.closeButtonElem).toBeDisplayed();
        expect(LoginPage.userNameInputElem).toBeDisplayed();
        expect(LoginPage.userPasswordInputElem).toBeDisplayed();
        expect(LoginPage.modalContentElem).toHaveTextContaining("Forgot Email?");
        expect(LoginPage.modalContentElem).toHaveTextContaining("Forgot Password?");
        expect(LoginPage.modalContentElem).toHaveTextContaining("Don't have");
        expect(LoginPage.modalContentElem).toHaveTextContaining("Bet With");
        expect(LoginPage.submitButtonElem).toBeDisplayed();
        expect(LoginPage.submitButtonElem).toHaveText("SIGN IN");
    })

    it('should have user input field focused', () => {
        expect(LoginPage.userNameInputElem).toBeFocused();
        expect(LoginPage.userPasswordInputElem).not.toBeFocused();
    })

    it('should have user and passwod input fields blank with placeholder text', () => {
        expect(LoginPage.userNameInputElem).toHaveValue("");
        expect(LoginPage.userPasswordInputElem).toHaveValue("");
        expect(LoginPage.userNameInputElem).toHaveAttribute("placeholder", "Email:");
        expect(LoginPage.userPasswordInputElem).toHaveAttribute("placeholder", "Password:");
    })

    it('have remember me checkbox works as designed', () => {
        expect(LoginPage.checkboxElem).toHaveAttribute("aria-checked", "false");

        LoginPage.checkboxLinkElem.waitForClickable();
        LoginPage.checkboxLinkElem.click();

        expect(LoginPage.checkboxElem).toHaveAttribute("aria-checked", "true");
    })

    it('should not allow user to log in with blank credentials', () => {
        LoginPage.submitButtonElem.waitForClickable();
        LoginPage.submitButtonElem.click();

        expect(LoginPage.modalContentElem).toHaveTextContaining("Please enter a valid email address");
        expect(LoginPage.modalContentElem).toHaveTextContaining("Password is required");
    })

    it('should not allow user to log in with incorrect credentials', () => {
        LoginPage.userNameInputElem.setValue(faker.internet.email());
        LoginPage.userPasswordInputElem.setValue(faker.internet.password());

        LoginPage.submitButtonElem.waitForClickable();
        LoginPage.submitButtonElem.click();

        expect(LoginPage.errorMessageElem).toHaveTextContaining("You have entered an incorrect");

        LoginPage.userNameInputElem.clearValue();
        LoginPage.userPasswordInputElem.clearValue();
    })

    it('should allow user to log in with correct credentials', () => {
        LoginPage.userNameInputElem.setValue(process.env.EMAIL);
        LoginPage.userPasswordInputElem.setValue(process.env.PASSWORD);

        LoginPage.submitButtonElem.waitForClickable();
        LoginPage.submitButtonElem.click();

        expect(LoginPage.myAccountElem).toHaveTextContaining("My Account");
    })

    it('should allow user to log out', () => {
        LoginPage.accountButton.waitForClickable();
        LoginPage.accountButton.click();

        LoginPage.logoutButton.waitForClickable();
        LoginPage.logoutButton.click();

        expect(LoginPage.logoutHeaderElem).toHaveText("LOGGED OUT");

        LoginPage.logoutCloseElem.waitForClickable();
        LoginPage.logoutCloseElem.click();

        browser.pause(3000);
    })
})
