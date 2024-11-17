/**
 * @file The view component of the app.
 * @module src/view/View
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

import readline from 'readline'

export class View {
  async displayMenu(menuOption) {
    this.clearConsole()
    console.log('Wooo!')
    console.log('----------------------------')
    console.log(`${menuOption.NEW_ENTRY}. New entry`)
    console.log(`${menuOption.VIEW_ENTRIES}. View entries`)
    console.log(`${menuOption.QUIT}. Quit application`)
    const choice = await this.getInput('Make your choice: ')
    return choice
  }

  getInput(prompt) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    return new Promise((resolve) => {
      rl.question(prompt, (answer) => {
        resolve(answer)
        rl.close()
      })
    })
  }

  async requestTitle() {
    this.clearConsole()
    console.log('Create new entry')
    console.log('----------------------------')
    const title = await this.getInput('Enter title: ')
    return title
  }

  async requestContent() {
    const content = await this.getInput('Enter content: ')
    return content
  }

  async requestFirstCipherKey() {
    const content = await this.getInput(
      'Please enter the first cipher key (any number): '
    )
    return content
  }

  async requestSecondCipherKey() {
    const content = await this.getInput(
      'Please enter the second cipher key (any number): '
    )
    return content
  }

  async displayEntries(entries) {
    this.clearConsole()
    console.log('Wooo! - Entries')
    console.log('----------------------------')
    entries.forEach((entry, index) => {
      console.log(`${index + 1}. ${entry.getTitle()}`)
    })
    console.log('\n')
    const choice = await this.getInput(
      'Please select the entry you wish to display: '
    )
    return choice
  }

  async displayEntry(entry) {
    this.clearConsole()
    console.log('Wooo! - ' + entry.getTitle())
    console.log('----------------------------')
    console.log(entry.getContent())
    console.log('\n')
    let choice = ''
    if (entry.isEncrypted()) {
      choice = await this.getInput('(D)ecrypt or press enter to return: ')
    } else {
      choice = await this.getInput('(E)ncrypt or press enter to return: ')
    }
    return choice
  }

  async tryAgain() {
    return await this.getInput('Invalid choice. Please try again.')
  }

  clearConsole() {
    for (let i = 0; i < 50; i++) {
      console.log('\n')
    }
  }
}
