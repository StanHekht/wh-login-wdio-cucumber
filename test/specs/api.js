describe('webdriver.io page', () => {

    before('should have the right title', () => {
        browser.url('/');
    })

    it('should have the right title', () => {
        browser.setupInterceptor();
        $("[data-qa='sidebar-link-inplay']").click();
        let request = browser.getRequest();
        console.log(typeof request);
        browser.pause(5000);
        // expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js');
    })

    it.skip('searches for WebdriverIO', () => {
        browser.url('https://duckduckgo.com/')

        $('#search_form_input_homepage').setValue('WebdriverIO')
        $('#search_button_homepage').click()

        const title = browser.getTitle()
        console.log('Title is: ' + title)
        // outputs: "Title is: WebdriverIO (Software) at DuckDuckGo"
    })
})
