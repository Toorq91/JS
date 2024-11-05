// For å kjøre programmet: Start opp CMD -> Skrive cd desktop\smart coding\js\pwgenerator -> trykk enter, deretter skriv -> node.passwordgenerator.js

const fs = require('fs');
const path = require('path');

// Funksjon for å generere et tilfeldig passord basert på innstillinger
function generatePassword(length, useUpperCase, useSpecialChars) {
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()";
    
    let characters = lowerCase + numbers;
    if (useUpperCase) characters += upperCase;
    if (useSpecialChars) characters += specialChars;
    
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

// Funksjon for å skrive brukernavn og passord til en fil i som lagres til en bestemt mappe
function savePasswordToFile(username, password) {
    const folderPath = 'C:/Users/Administrator/Desktop/Smart coding/JS/PWGenerator/New generated passwords';
    const filePath = `${folderPath}/${username}_PW.txt`;

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    const fileContent = `Brukernavn: ${username}\nPassord: ${password}`;
    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`Passordet er lagret i filen: ${filePath}`);
}



// Interaktiv del for å få input fra brukeren
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Sarting password generator script...");


readline.question("Oppgi brukernavnet ditt: ", (username) => {
    readline.question("Oppgi ønsket passordlengde (f.eks. 12): ", (lengthInput) => {
        const length = parseInt(lengthInput, 10);

        readline.question("Skal passordet inneholde store bokstaver? (y/n): ", (upperCaseInput) => {
            const useUpperCase = upperCaseInput.toLowerCase() === 'y';

            readline.question("Skal passordet inneholde spesialtegn? (y/n): ", (specialCharsInput) => {
                const useSpecialChars = specialCharsInput.toLowerCase() === 'y';

                const password = generatePassword(length, useUpperCase, useSpecialChars);
                savePasswordToFile(username, password);

                readline.close();
            });
        });
    });
});