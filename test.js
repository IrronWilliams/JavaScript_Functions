const userName = 'toquanda'
const capitalize = `${userName.charAt(0).toUpperCase()}${userName.slice(1)}`
console.log(userName)
console.log(capitalize)

const arrowName = 'arrow'

console.log(arrowName)



//function to greet user based upon name passed to it -> try traditional way 1st, then create arrow function

function greetUser(name) {
    return `Hello ${name.charAt(0).toUpperCase()}${name.slice(0)}. Welcome to the traditional function.`
}
const traditional = greetUser('tommy')
console.log(traditional)


/*using variable identifier variable4Function because arrow functions are expressions and are assigned to
variable identifier. variable identifier is in essence calling the unnamed function 


arrow functions do not require the function keyword or function name, or even the parameters
when there is just one parameter. there is no parameters:
    variable identifier = () =>{}

if there is one parameter:
    variable identifier = (parm) =>{}  or variable identifier = parm =>{}
    
if there are 2 parameters: 
    variable identifier = (parm1, parm2) => {}
*/
const namez ='travante'
const variable4Function = name =>  //function returns value, passing value to variable. but need to call variable to run the function. 
    //return 'testing'
      `Hi there ${name.charAt(0).toUpperCase()}${name.slice(1)}. How have you been?`
console.log(variable4Function(namez))

//callback functions allows me to pass a function as an argument
const parm='smitty'
const result = (parm, name) => {
    return `hello ${name}`

}
console.log(result(parm))

//traditional function that compute avg bill amount
function computeTab(amount, numPeople) {
    return `Your portion of the bill is: $${amount/numPeople}`
}
const personOws = computeTab(100, 7)
console.log(personOws)

//arrow function 
const personOws2 = (amount, numPeople) => {
    return `You owe: $${amount/numPeople}`
}
console.log(personOws2(100,2))

const personOws23 = (amount, numPeople) => `Your portion = ${amount/numPeople}`
console.log(personOws23(80, 4))

//function that accepts a number and counts it down by another number 
function countDown(startNum, decreaseNum){
    let finalNumber = startNum
    return function countDown() {
        finalNumber -= decreaseNum
        return finalNumber
    }
}
const finalNumber = countDown(101, 23)
console.log(finalNumber())
console.log(finalNumber())
console.log(finalNumber())
console.log(finalNumber())
console.log(finalNumber())


//arrow function. have outer function that returns inner function. function countDown
const countDownz = (startNum, step) => {
    let stepNum = startNum + step
    return () => stepNum -= step
        //return stepNum
    
}

const stepNumResult = countDownz(100,3)
console.log(stepNumResult())
console.log(stepNumResult())
console.log(stepNumResult())
//const vArrow = () =>{}



// function decrease(num) {
//     return num
// }
// const result1 = (decrease(4))
// console.log(result1)


