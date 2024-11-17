/**
 * @file The entry class of the app.
 * @module src/model/Entry
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

import { AlbertiCipher, Alphabet } from 'nardus'

export class Entry {
  /**
   * Title string
   *
   * @type {String}
   */
  #title

  /**
   * Content string
   *
   * @type {String}
   */
  #content

  /**
   * Aplhabet string
   *
   * @type {String}
   */
  #alphabet

  /**
   * Entry encryption flag
   *
   * @type {boolean}
   */
  #encrypted

  constructor(title, content, encrypted = false) {
    this.#title = title
    this.#content = content
    this.#alphabet = new Alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ')
    this.#encrypted = encrypted
  }

  encryptEntry(firstCipherKey, secondCipherKey) {
    if (!this.#encrypted) {
      const cipher = new AlbertiCipher(
        firstCipherKey,
        secondCipherKey,
        this.#alphabet
      )
      this.#encrypted = true
      return (this.#content = cipher.encrypt(this.#content))
    }
  }

  decryptEntry(firstCipherKey, secondCipherKey) {
    if (this.#encrypted) {
      const cipher = new AlbertiCipher(
        firstCipherKey,
        secondCipherKey,
        this.#alphabet
      )
      this.#encrypted = false
      return (this.#content = cipher.decrypt(this.#content))
    }
  }

  isEncrypted() {
    return this.#encrypted
  }

  getContent() {
    return this.#content
  }

  getTitle() {
    return this.#title
  }

  toJSON() {
    return {
      title: this.#title,
      content: this.#content,
      encrypted: this.#encrypted
    }
  }
}
