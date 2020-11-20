/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage {
    /**
     * define selectors using getter methods
     */
    get loginButton () {return $("[data-qa='neogames-login']") }
    get loginModalElem () { return $("[class='mwc-modal-content']") }
    get modalTitleElem () { return $("#modalTitle") }
    get chatIconElem () { return $("//mwc-login-header//i") }
    get closeButtonElem () { return $("[class='mwc-close']") }
    get userNameInputElem () { return $("#user") }
    get userPasswordInputElem () { return $("#password") }
    get submitButtonElem () { return $("#submit") }
    get modalContentElem () { return $("//*[@class='mwc-modal-content']") }
    get checkboxElem () { return $("[type='checkbox']") }
    get checkboxLinkElem () { return $("//*[@class='mwc-checkbox']/i") }
    get errorMessageElem () { return $("[class='mwc-form-error-message-text']") }
    get myAccountElem () { return $("[class='myAccountLabel']") }
    get logoutHeaderElem () { return $('#modalTitle') }
    get logoutCloseElem () { return $("[class*='mwc-close']") }
    get accountButton () { return $('[data-qa="neogames-account"]') }
    get logoutButton () { return $('[data-qa="neogames-logout"]') }


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    login (username, password) {
        this.inputUsername.setValue(username);
        this.inputPassword.setValue(password);
        this.btnSubmit.click();
    }

}

module.exports = new LoginPage();
