/**
 * @file The percistence class of the app.
 * @module src/model/Persistence
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

import fs from 'fs'
import { Entry } from './Entry.js'

/**
 * Handles saving and loading of journal entries to and from a file.
 */
export class Persistence {
  /**
   * The filename where entries are stored.
   *
   * @type {string}
   */
  #filename

  /**
   * Creates a new Persistence instance.
   */
  constructor() {
    this.#filename = 'entries/entries.json'
  }

  /**
   * Saves the provided entries to the file.
   *
   * @param {Array} entries - The list of entries to save.
   * @throws {Error} If an error occurs during the file write operation.
   */
  save(entries) {
    try {
      fs.writeFileSync(this.#filename, JSON.stringify(entries), 'utf8')
    } catch (error) {
      throw new Error('Error saving to file:' + error)
    }
  }

  /**
   * Loads entries from the file.
   *
   * @returns {Array} The list of entries loaded from the file.
   */
  load() {
    try {
      if (fs.existsSync(this.#filename)) {
        const data = fs.readFileSync(this.#filename, 'utf8')
        const entriesData = JSON.parse(data)
        return entriesData.map(
          (entryData) =>
            new Entry(entryData.title, entryData.content, entryData.encrypted)
        )
      }
    } catch (error) {
      console.error('Error loading from file:' + error)
    }
    return []
  }
}
