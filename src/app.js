/**
 * @file The starting point of the app.
 * @module src/app
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 0.0.1
 */

import { Main } from './controller/Main.js'
import { View } from './view/View.js'

/**
 * Initializes the application and starts the main menu.
 */
const view = new View()
const main = new Main(view)

try {
  main.displayMenu()
} catch (e) {
  console.error('Error: ' + e)
}
