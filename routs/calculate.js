const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const calculateNumerologySum = require('./numerologyFunction')
const {destinyDescription, soulUrgeDescription, dreamDescription} = require('./descriptions')
const  {DestinyModel, HeartModel, DreamModel}= require("../models/descModel")
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// function calculateNumerologySum(inputString) {
//     const numerologyChart = {
//         A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1, J: 1,
//         K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2, S: 3, T: 4,
//         U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7
//     };
// // Convert input string to uppercase
// const uppercaseString = inputString.toUpperCase();

// // Calculate numeric value for each character
// const charValues = Array.from(uppercaseString, char => numerologyChart[char] || 0);
// const nameNumber = charValues.join("")
// // Calculate compound name number
// const compoundNameNumber = charValues.reduce((sum, value) => sum + value, 0);

// // Calculate destiny number (total sum until single digit)
// let destinyNumber = compoundNameNumber;
// while (destinyNumber > 9) {
//     destinyNumber = Array.from(String(destinyNumber), Number).reduce((sum, digit) => sum + digit, 0);
// }

// // Calculate soul urge number (sum of vowels)
// const soulUrgeNumber = Array.from(uppercaseString).filter(char => 'AEIOU'.includes(char)).map(char => numerologyChart[char] || 0).reduce((sum, value) => sum + value, 0);

// // Calculate heart desire number (sum of vowels until single digit)
// let heartDesireNumber = soulUrgeNumber;
// const masterNumbers = [11, 22, 33];
// while (heartDesireNumber > 9) {
//     heartDesireNumber = Array.from(String(heartDesireNumber), Number).reduce((sum, digit) => sum + digit, 0);
//     // Check if heart desire number is a master number (11, 22, or 33)
//     if (masterNumbers.includes(heartDesireNumber)) {
//         break
//     }
// }

// // Calculate dream number (sum of consonants until single digit)
// let dreamNumber = Array.from(uppercaseString).filter(char => 'BCDFGHJKLMNPQRSTVWXYZ'.includes(char)).map(char => numerologyChart[char] || 0).reduce((sum, value) => sum + value, 0);

// while (dreamNumber > 9) {
//     dreamNumber = Array.from(String(dreamNumber), Number).reduce((sum, digit) => sum + digit, 0);
// }

// return {'compoundNameNumber':compoundNameNumber, 'destinyNumber':destinyNumber, 'soulUrgeNumber':soulUrgeNumber, 'heartDesireNumber':heartDesireNumber, 'dreamNumber':dreamNumber, 'nameNumber': nameNumber};
// }

router.post("/destiny", async (req, res)=>{
    const  {resultKey, content} = req.body
    try{
        const newDestinyDesc = new DestinyModel({
            resultKey: resultKey,
            content: content
        })
        const saveDestinyDesc = await newDestinyDesc.save()
        res.send(saveDestinyDesc)
    } catch (error){
        console.log(error);
        res.status(400).json({error: error.message})
    }
})

router.post("/dream", async (req, res)=>{
    const  {resultKey, content} = req.body
    try{
        const newDreamDesc = new DreamModel({
            resultKey: resultKey,
            content: content
        })
        const saveDreamDesc = await newDreamDesc.save()
        res.send(saveDreamDesc)
    } catch (error){
        console.log(error);
        res.status(400).json({error: error.message})
    }
})

router.post("/heart", async (req, res)=>{
    const  {resultKey, content} = req.body
    try{
        const newHeartDesc = new HeartModel({
            resultKey: resultKey,
            content: content
        })
        const saveHeartDesc = await newHeartDesc.save()
        res.send(saveHeartDesc)
    } catch (error){
        console.log(error);
        res.status(400).json({error: error.message})
    }
})
router.post("/calculate", async (req,res)=> {
    const { name } = req.body;
    const result = calculateNumerologySum(name)

    // const descOne = await DestinyModel.findOne({resultKey: result.destinyNumber})
    // const descTwo = await HeartModel.findOne({resultKey: result.heartDesireNumber})
    // const descThree = await DreamModel.findOne({resultKey: result.dreamNumber})
    const descOne = destinyDescription[result.destinyNumber]
    const descTwo = soulUrgeDescription[result.heartDesireNumber]
    const descThree = dreamDescription[result.dreamNumber]

    try {
        res.render("result", {name, result, descOne: descOne.content, descTwo: descTwo.content, descThree: descThree.content})
        
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }

});

//get
router.get("/",(req, res) => {
    try {
        res.render('index');
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});


module.exports = router;
