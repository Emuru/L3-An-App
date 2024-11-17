/**
 * @file The main lopp of the app.
 * @module src/controller/Main
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

import { MenuOptions } from '../model/MenuOptions.js'
import { Entry } from '../model/Entry.js'
import { Journal } from '../model/Journal.js'

export class Main {
  constructor(view) {
    this.view = view
    this.menuOption = new MenuOptions()
    this.journal = new Journal()
  }

  async displayMenu() {
    let running = true
    while (running) {
      const choice = await this.view.displayMenu(this.menuOption)
      running = await this.handleMenu(choice)
    }
  }

  async handleMenu(choice) {
    switch (choice) {
      case this.menuOption.NEW_ENTRY:
        await this.newEntry()
        break
      case this.menuOption.DELETE_ENTRY:
        await this.listEntriesToDelete()
        break
      case this.menuOption.VIEW_ENTRIES:
        await this.listEntriesToView()
        break
      case this.menuOption.QUIT:
        console.log('Quitting...')
        return false
      default:
        console.log('Invalid choice. Please try again.')
    }
    return true
  }

  async newEntry() {
    await this.handleNewEntry()
  }

  async handleNewEntry() {
    const title = await this.view.requestTitle()
    const content = await this.view.requestContent()
    const firstCipherKey = await this.view.requestFirstCipherKey()
    const secondCipherKey = await this.view.requestSecondCipherKey()

    const entry = new Entry(title, content)
    entry.encryptEntry(firstCipherKey, secondCipherKey)

    this.journal.addEntry(entry)
  }

  async listEntriesToDelete() {
    const entries = this.journal.getEntries()

    const choice = await this.view.displayEntries(entries)

    if (choice < 0 || choice >= entries.lengt) {
      console.log('Invalid choice, please try again.')
      await this.listEntriesToDelete()
      return
    }

    const entryToDelete = choice - 1

    this.journal.deleteEntry(entryToDelete)
  }

  async listEntriesToView() {
    const entries = this.journal.getEntries()
    const choice = await this.view.displayEntries(entries)

    if (choice < 0 || choice >= entries.lengt) {
      console.log('Invalid choice, please try again.')
      await this.listEntriesToView()
      return
    }

    const entryToDisplay = entries[choice - 1]

    await this.displayEntryMenu(entryToDisplay)
  }

  async displayEntryMenu(entry) {
    let running = true
    while (running) {
      if (!entry) {
        return false
      }
      const choice = await this.view.displayEntry(entry)
      running = await this.handleEntryMenu(choice, entry)
    }
  }

  async handleEntryMenu(choice, entry) {
    switch (choice) {
      case 'd':
        await this.decryptEntry(entry)
        break
      case 'e':
        await this.encryptEntry(entry)
        break
      case '':
        console.log('Returning...')
        return
      default:
        await this.view.tryAgain()
    }
    return true
  }

  async decryptEntry(entry) {
    const firstCipherKey = await this.view.requestFirstCipherKey()
    const secondCipherKey = await this.view.requestSecondCipherKey()

    return entry.decryptEntry(firstCipherKey, secondCipherKey)
  }

  async encryptEntry(entry) {
    const firstCipherKey = await this.view.requestFirstCipherKey()
    const secondCipherKey = await this.view.requestSecondCipherKey()

    return entry.encryptEntry(firstCipherKey, secondCipherKey)
  }
}
