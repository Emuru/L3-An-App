/**
 * @file The view component of the app.
 * @module src/view/View
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

import readline from 'readline'

/**
 * View class handles user input and output for the application.
 */
export class View {
  /**
   * Creates a new View instance and initializes the readline interface.
   */
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }

  /**
   * Displays the main menu and prompts the user for a choice.
   *
   * @returns {string} The user's menu choice.
   */
  async displayMenu() {
    this.#clearConsole()
    console.log('Wooo!')
    console.log('----------------------------')
    console.log(`1. New entry`)
    console.log(`2. View entries`)
    console.log(`q. Quit application`)
    const choice = await this.getInput('Make your choice: ')
    return choice
  }

  /**
   * Prompts the user for input.
   *
   * @param {string} prompt - The prompt message to display.
   * @returns {Promise<string>} The user's input.
   */
  getInput(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, (answer) => {
        resolve(answer)
      })
    })
  }

  /**
   * Prompts the user to enter a title for a new entry.
   *
   * @returns {Promise<string>} The title entered by the user.
   */
  async requestTitle() {
    this.#clearConsole()
    console.log('Create new entry')
    console.log('----------------------------')
    const title = await this.getInput('Enter title: ')
    return title
  }

  /**
   * Prompts the user to enter content for a new entry.
   *
   * @returns {Promise<string>} The content entered by the user.
   */
  async requestContent() {
    const content = await this.getInput('Enter content: ')
    return content
  }

  /**
   * Prompts the user to enter the first cipher key.
   *
   * @returns {Promise<string>} The first cipher key entered by the user.
   */
  async requestFirstCipherKey() {
    const firstCipherKey = await this.getInput(
      'Please enter the first cipher key (any number): '
    )
    return firstCipherKey
  }

  /**
   * Prompts the user to enter the second cipher key.
   *
   * @returns {Promise<string>} The second cipher key entered by the user.
   */
  async requestSecondCipherKey() {
    const secondCipherKey = await this.getInput(
      'Please enter the second cipher key (any number): '
    )
    return secondCipherKey
  }

  /**
   * Displays a list of entries and prompts the user to select one.
   *
   * @param {Array} entries - The list of entries to display.
   * @returns {Promise<string>} The user's choice.
   */
  async displayEntries(entries) {
    this.#clearConsole()
    console.log('Wooo! - Entries')
    console.log('----------------------------')
    entries.forEach((entry, index) => {
      console.log(`${index + 1}. ${entry.getTitle()}`)
    })
    console.log('\n')
    const choice = await this.getInput(
      'Please select the entry you wish to view or press enter to return: '
    )
    return choice
  }

  /**
   * Displays the content of an entry and offer further interaction.
   *
   * @param {Entry} entry - The entry to display.
   * @returns {Promise<string>} The user's next action choice.
   */
  async displayEntry(entry) {
    this.#clearConsole()
    console.log('Wooo! - ' + entry.getTitle())
    console.log('----------------------------')
    console.log(entry.getContent())
    console.log('\n')

    return await this.requestEntryChoice(entry)
  }

  /**
   * Prompts the user for the next action on an entry.
   *
   * @param {Entry} entry - The entry to act upon.
   * @returns {Promise<string>} The user's action choice.
   */
  async requestEntryChoice(entry) {
    let choice = ''
    if (entry.isEncrypted()) {
      choice = await this.getInput(
        '(d)ecrypt, (del)ete or press enter to return: '
      )
    } else {
      choice = await this.getInput(
        '(e)ncrypt, (del)ete or press enter to return: '
      )
    }
    return choice
  }

  /**
   * Displays a returning message and waits for user to press enter.
   */
  async returnMessage() {
    return await this.getInput('Returning...(Press enter)')
  }

  /**
   * Displays a quitting message and waits for user to press enter.
   */
  async quitMessage() {
    return await this.getInput('Quitting...(Press enter)')
  }

  /**
   * Displays a success message and waits for user to press enter.
   */
  async successMessage() {
    return await this.getInput('Success! (Press enter)')
  }

  /**
   * Displays an invalid choice message and waits for user to press enter.
   */
  async displayInvalidChoiceMessage() {
    return await this.getInput('Invalid choice. Please try again.')
  }

  /**
   * Clears the console.
   */
  #clearConsole() {
    console.clear()
  }

  /**
   * Closes the readline interface.
   */
  close() {
    this.rl.close()
  }
}
