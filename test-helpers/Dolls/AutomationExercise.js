import {selectors} from "@playwright/test";

const {expect} = require('@playwright/test')

export class AutomationExercise {
    /**
     * @param {import('@playwright/test').Page} page
     * @param testData array
     */
    constructor(page, testData) {
        this.page = page;
        this.testData = testData;
        selectors.setTestIdAttribute('data-qa')
    }

    // Baseline regression test steps that can be reused

    // Verify that home page loads and is visible successfully
    async goto() {
        await this.page.goto('https://automationexercise.com/');
        await expect(this.page.getByText('Full-Fledged practice website for Automation Engineers')).toBeVisible();
    }

    async navigateToLogin() {
        await this.page.getByLabel(" Signup / Login").click();
        await this.page.getByText("Login to your account");
        await expect(this.page.getByText("New User Signup!")).toHaveCSS('color', '#696763');
    }

    async userSignUp(
        testData = {
            name: 'John Doe',
            email: 'thisIsATest@test.com',
            title: 'Mr.',
            password: 'ILoveVooDoo1',
            birthDate: {
                day: 25,
                month: 'June',
                year: 1988,
            }
        }) {
        await this.navigateToLogin()
        await this.page.getByTestId('signup-name').fill(testData.name);
        await this.page.getByTestId('signup-email').fill(testData.email);
        await expect(this.page.getByRole('heading', {name: 'ENTER ACCOUNT INFORMATION'})).toBeVisible();
        await this.page.getByTestId('id_gender1').click();
        await this.page.getByTestId('password').fill(testData.password);
        await this.page.getByTestId('days').selectOption(testData.birthDate.day);
        await this.page.getByTestId('months').selectOption(testData.birthDate.month);
        await this.page.getByTestId('years').selectOption(testData.birthDate.year);
        await this.page.getByRole("checkbox", {name: 'newsletter'}).click();
        await this.page.getByRole("checkbox", {name: 'optin'}).click();
        await this.page.getByTestId('first_name').fill(testData.name);
        await this.page.getByTestId('last_name').fill(testData.name);
        await this.page.getByTestId('company').fill(testData.name);
        await this.page.getByTestId('address').fill('123 ABC Lane');
        await this.page.getByTestId('country').selectOption('United States');
        await this.page.getByTestId('state').fill("Georgia");
        await this.page.getByTestId('city').fill("Alpharetta");
        await this.page.getByTestId('zipcode').fill('30005');
        await this.page.getByTestId('mobile_number').fill('5155555555');
        await this.page.getByTestId('create-account').click();
        await expect(this.page.getByTestId('account-created')).toHaveText('ACCOUNT CREATED!');
        await this.page.getByTestId('continue-button').click();
        await expect(this.page.getByText(` Logged in as ${testData.name}`)).toBeVisible();
        await this.page.getByText('Delete Account').click();
        await expect(this.page.getByTestId('account-deleted')).toHaveText("ACCOUNT DELETED!")
    }

}