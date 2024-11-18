/**
 * @file The entry class of the app.
 * @module src/model/Entry
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

import { AlbertiCipher, Alphabet } from 'nardus'

export class Entry {
  /**
   * The title of the entry.
   *
   * @type {string}
   */
  #title

  /**
   * The content of the entry.
   *
   * @type {string}
   */
  #content

  /**
   * The alphabet used for encryption.
   *
   * @type {Alphabet}
   */
  #alphabet

  /**
   * Indicates whether the entry is encrypted.
   *
   * @type {boolean}
   */
  #encrypted

  /**
   * Creates a new Entry.
   *
   * @param {string} title - The title of the entry.
   * @param {string} content - The content of the entry.
   * @param {boolean} - Whether the entry is encrypted.
   */
  constructor(title, content, encrypted = false) {
    this.#title = title
    this.#content = content
    this.#alphabet = new Alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ')
    this.#encrypted = encrypted
  }

  /**
   * Encrypts the entry content if it's not already encrypted.
   *
   * @param {number} firstCipherKey - The first cipher key.
   * @param {number} secondCipherKey - The second cipher key.
   */
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

  /**
   * Decrypts the entry content if it's encrypted.
   *
   * @param {number} firstCipherKey - The first cipher key.
   * @param {number} secondCipherKey - The second cipher key.
   */
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
