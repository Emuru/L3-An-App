/**
 * @file The entry collection class of the app.
 * @module src/model/EntryCollection
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

import fs from 'fs'
import { Entry } from './Entry.js'

export class Journal {
  constructor() {
    this.entries = []
  }

  addEntry(entry) {
    this.entries.push(entry)
  }

  getEntries() {
    return this.entries
  }

  saveToFile(filename) {
    fs.writeFileSync(filename, JSON.stringify(this.entries), 'utf8')
  }

  loadFromFile(filename) {
    if (fs.existsSync(filename)) {
      const data = fs.readFileSync(filename, 'utf8')
      const entriesData = JSON.parse(data)
      this.entries = entriesData.map(
        (entryData) =>
          new Entry(entryData.title, entryData.content, entryData.encrypted)
      )
    }
  }
}
