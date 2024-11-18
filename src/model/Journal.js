/**
 * @file The journal class of the app.
 * @module src/model/Journal
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

import { Persistence } from './Persinstence.js'

/**
 * Represents a journal containing entries.
 */
export class Journal {
  /**
   * A collection of entries.
   *
   * @type {Array}
   */
  #entries

  /**
   * Handling saving and loading.
   *
   * @type {Persistence}
   */
  #persistence

  /**
   * Creates a new Journal instance.
   */
  constructor() {
    this.#entries = []
    this.#persistence = new Persistence()
    this.#entries = this.#persistence.load()
  }

  /**
   * Adds an entry to the journal.
   *
   * @param {Entry} entry - The entry to add.
   */
  addEntry(entry) {
    this.#entries.push(entry)
    this.#persistence.save(this.#entries)
  }

  /**
   * Deletes an entry from the journal.
   *
   * @param {Entry} entry - The entry to delete.
   */
  deleteEntry(entry) {
    const index = this.#entries.indexOf(entry)
    if (index >= 0 && index < this.#entries.length) {
      this.#entries.splice(index, 1)
      this.#persistence.save(this.#entries)
    }
  }

  /**
   * Retrieves all entries from the journal.
   *
   * @returns {Array} The list of entries.
   */
  getEntries() {
    return this.#entries
  }
}
