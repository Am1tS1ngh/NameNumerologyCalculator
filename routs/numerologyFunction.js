function calculateNumerologySum(inputString) {
    const numerologyChart = {
        A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1, J: 1,
        K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2, S: 3, T: 4,
        U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7
    };
// Convert input string to uppercase
const uppercaseString = inputString.toUpperCase();

// Calculate numeric value for each character
const charValues = Array.from(uppercaseString, char => numerologyChart[char] || 0);
const nameNumber = charValues.join("")
// Calculate compound name number
const compoundNameNumber = charValues.reduce((sum, value) => sum + value, 0);
// Calculate destiny number (total sum until single digit)
let destinyNumber = compoundNameNumber;
const masterNumbers = [11, 22, 33];
destinyNumber = masterNumbers.includes(destinyNumber)?destinyNumber:Array.from(String(destinyNumber), Number).reduce((sum, digit) => sum + digit, 0);
while(destinyNumber>9 && !masterNumbers.includes(destinyNumber)){
    destinyNumber = Array.from(String(destinyNumber), Number).reduce((sum, value) => sum + value, 0)
    
}

let soulUrgeNumber = Array.from(uppercaseString).filter(char => 'AEIOU'.includes(char)).map(char => numerologyChart[char] || 0).reduce((sum, value) => sum + value, 0);
while(soulUrgeNumber>9 && !masterNumbers.includes(soulUrgeNumber)){
    soulUrgeNumber = Array.from(String(soulUrgeNumber), Number).reduce((sum, value) => sum + value, 0)
    
}
// Calculate heart desire number (sum of vowels until single digit)
let heartDesireNumber = soulUrgeNumber; 


// Calculate dream number (sum of consonants until single digit)
let dreamNumber = Array.from(uppercaseString).filter(char => 'BCDFGHJKLMNPQRSTVWXYZ'.includes(char)).map(char => numerologyChart[char] || 0).reduce((sum, value) => sum + value, 0);
while (dreamNumber > 9  && !masterNumbers.includes(dreamNumber)) {
    dreamNumber = Array.from(String(dreamNumber), Number).reduce((sum, digit) => sum + digit, 0);
}

return {'compoundNameNumber':compoundNameNumber, 'destinyNumber':destinyNumber, 'soulUrgeNumber':soulUrgeNumber, 'heartDesireNumber':heartDesireNumber, 'dreamNumber':dreamNumber, 'nameNumber': nameNumber};
}


module.exports = calculateNumerologySum;