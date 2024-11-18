Testrapport
=============

| Test               | UC1  |
| ------------------ | :--: |
| TC1.1              | 1/OK |
| TC1.2              | 1/OK |
| TC1.2.1            | 1/OK |
| TC1.2.2            | 1/OK |
| COVERAGE & SUCCESS | 4/OK |

### TC1.1 Skapa dagboksinlägg

Use case: UC1 Skapa inlägg.

Scenario: Skapa ett inlägg till dagboken.

Huvudscenariot i UC1 testas när användaren väljer 1 på huvudmenyn, får besvara fyra prompter.

Precondition: No preconditions.

#### Test steps

* Starta appen
* Du ser huvudmenyn.
* Tryck på 1-tangenten.
* Du ser en prompt.
* Skriv in önskad titel och tryck på enter.
* Du ser en prompt.
* Skriv in önskat innehåll och tryck på enter.
* Du ser en prompt.
* Skriv in 1.
* Du ser en prompt.
* Skriv in 2.

### Expected

* När användaren har följt stegen kommer ett nytt inlägg ha skapats och sparats till fil.

### TC1.2 Visa lista över inlägg

Use case: UC1 Visa lista.

Scenario: Visa lista över samtliga dagboksinlägg.

Huvudscenariot i UC1 testas när användaren väljer 2 på huvudmenyn och ser en lista över inläggstitlar.

Precondition: No preconditions.

#### Test steps

* Starta appen
* Du ser huvudmenyn.
* Tryck på 2-tangenten.
* Du ser en lista över samtliga inläggstitlar i dagboken.

### Expected

* När användaren har följt stegen kommer hen presenteras för alla inläggstitlar i dagboken.

### TC1.2.1 Välja ett inlägg från listan att läsa

Use case: UC1 Välja inlägg.

Scenario: Visa lista över samtliga dagboksinlägg och välj ett inlägg att läsa.

Huvudscenariot i UC1 testas när användaren väljer 2 på huvudmenyn och ser en lista över inläggstitlar och sedan väjer 1 för att visa det första inlägget.

Precondition: No preconditions.

#### Test steps

* Starta appen
* Du ser huvudmenyn.
* Tryck på 2-tangenten.
* Du ser en lista över samtliga inläggstitlar i dagboken.
* Tryck på 1-tangenten.
* Du ser dagboksinlägget med titel i klartext och innehållet krypterat.

### Expected

* När användaren har följt stegen kommer hen presenteras för alla inläggstitlar i dagboken och sedan valt ett inlägg att läsa.

### TC1.2.2 Dekryptera innehåll

Use case: UC1 Dekryptera innehåll.

Scenario: Visa lista över samtliga dagboksinlägg, välj ett inlägg att läsa samt dekryptera innehållet.

Huvudscenariot i UC1 testas när användaren väljer 2 på huvudmenyn och ser en lista över inläggstitlar, väjer 1 för att visa det första inlägget och sedan trycker på d på tangentbordet. Användaren möts

Precondition: No preconditions.

#### Test steps

* Starta appen
* Du ser huvudmenyn.
* Tryck på 2-tangenten.
* Du ser en lista över samtliga inläggstitlar i dagboken.
* Tryck på 1-tangenten.
* Du ser dagboksinlägget med titel i klartext och innehållet krypterat.
* Tryck på d.
* Du ser en prompt.
* Skriv in 1.
* Du ser en prompt.
* Skriv in ytterligare 2.
* Du ser innehållet i klartext.

### Expected

* När användaren har följt stegen kommer hen presenteras för alla inläggstitlar i dagboken, valt ett inlägg att läsa och sedan kunnat läsa det i klartext efter dekryptering.
