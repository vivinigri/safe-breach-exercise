# SafeBreach's home exercise

[Result](https://vivinigri.github.io/safe-breach-exercise/)
## Objective

You'll be implementing a "Yellow Pages" web application. The application consists of a form with a single input field that allows searching for people by their name, age, phone number, or any combination thereof. As there is only a single input field, the application must do its best to parse the search terms entered by its users. John 33 should return all the people who are called John and are 33 years old, while 099373927 Smith should attempt to find a person with the supplied phone number whose name contains "Smith".

## Tools

* `@rematch/core` - for state managing

* `formik` - for forms and validation

* `@testing-library` - for tests

* `gh-pages` - for deploy

## Implementations

* `data/api` - Fake api that simulates a delay and possible errors

* Loading state while data is being fetched

* Query validation and error feedback

* Simulate pagination adding limit to contact's display

* EXTRA: ability to edit and delete contacts from the list