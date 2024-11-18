/**
 * @file The main lopp of the app.
 * @module src/controller/Main
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

import { Entry } from '../model/Entry.js'
import { Journal } from '../model/Journal.js'

/**
 * Main controller class for the application.
 */
export class Main {
  /**
   * View object for user interaction.
   * @type {View}
   */
  #view

  /**
   * Journal object for managing entries.
   * @type {Journal}
   */
  #journal

  /**
   * Creates an instance of Main.
   *
   * @param {View} view - The view instance for user interaction.
   */
  constructor(view) {
    this.#view = view
    this.#journal = new Journal()
  }

  /**
   * Displays the main menu and handles user choices.
   */
  async displayMenu() {
    let running = true
    while (running) {
      const choice = await this.#view.displayMenu()
      running = await this.#handleMenu(choice)
    }
  }

  /**
   * Handles the user's menu choice.
   *
   * @param {string} choice - The user's menu choice.
   * @returns {boolean} Whether to continue running the menu loop.
   */
  async #handleMenu(choice) {
    const createNewEntry = '1'
    const listEntries = '2'
    const quit = 'q'

    switch (choice) {
      case createNewEntry:
        await this.#createNewEntry()
        break
      case listEntries:
        await this.#viewEntriesList()
        break
      case quit:
        await this.#view.quitMessage()
        this.#view.close()
        return false
      default:
        await this.#view.displayInvalidChoiceMessage()
    }
    return true
  }

  /**
   * Creates a new journal entry and adds it to the journal.
   */
  async #createNewEntry() {
    const title = await this.#view.requestTitle()
    const content = await this.#view.requestContent()
    const firstCipherKey = await this.#view.requestFirstCipherKey()
    const secondCipherKey = await this.#view.requestSecondCipherKey()

    const entry = new Entry(title, content)
    entry.encryptEntry(firstCipherKey, secondCipherKey)

    this.#journal.addEntry(entry)
    await this.#view.successMessage()
  }

  /**
   * Displays the list of journal entries and handles user's selection.
   */
  async #viewEntriesList() {
    const entries = this.#journal.getEntries()
    const choice = await this.#view.displayEntries(entries)

    if (choice < 0 || choice >= entries.lengt) {
      await this.#view.displayInvalidChoiceMessage()
      await this.#viewEntriesList()
      return
    }

    const entryToDisplay = entries[choice - 1]

    await this.#displayEntryMenu(entryToDisplay)
  }

  /**
   * Displays the entry menu for a specific entry and handles user choices.
   *
   * @param {Entry} entry - The journal entry to display and manage.
   */
  async #displayEntryMenu(entry) {
    let running = true
    while (running) {
      if (!entry) {
        return false
      }
      const choice = await this.#view.displayEntry(entry)
      running = await this.#handleEntryMenu(choice, entry)
    }
  }

  /**
   * Handles user actions for a specific journal entry.
   *
   * @param {string} choice - The user's choice.
   * @param {Entry} entry - The journal entry to act upon.
   * @returns {boolean} Whether to continue running the entry menu loop.
   */
  async #handleEntryMenu(choice, entry) {
    const decryptEntry = 'd'
    const encryptEntry = 'e'
    const deleteEntry = 'del'

    switch (choice.toLowerCase()) {
      case decryptEntry:
        await this.#decryptEntry(entry)
        break
      case encryptEntry:
        await this.#encryptEntry(entry)
        break
      case deleteEntry:
        this.#journal.deleteEntry(entry)
        await this.#view.returnMessage()
        return false
      case '':
        await this.#view.returnMessage()
        return false
      default:
        await this.#view.displayInvalidChoiceMessage()
    }
    return true
  }

  /**
   * Decrypts the given journal entry.
   *
   * @param {Entry} entry - The journal entry to decrypt.
   */
  async #decryptEntry(entry) {
    const firstCipherKey = await this.#view.requestFirstCipherKey()
    const secondCipherKey = await this.#view.requestSecondCipherKey()

    return entry.decryptEntry(firstCipherKey, secondCipherKey)
  }

  /**
   * Encrypts the given journal entry.
   *
   * @param {Entry} entry - The journal entry to encrypt.
   */
  async #encryptEntry(entry) {
    const firstCipherKey = await this.#view.requestFirstCipherKey()
    const secondCipherKey = await this.#view.requestSecondCipherKey()

    return entry.encryptEntry(firstCipherKey, secondCipherKey)
  }
}
