/* Functions can be thought of as re-usable machines. Functions can accept input and return output. They either perform
an action or returns data or do both. To create a function, use the word function, followed by the name of function,
the input it takes goes between the parenthesis (think of the parenthesis as on opening to the machine to give info machine may need), 
this info (or parameters) are passed to the function body which are between the curly braces. This is where the code we want the function
to perform goes.  Function allows for the reuse of code through out the application. 

function named echo, that will console.log() or repeat the info provided via the parameters.
need to call the function and pass it an argument. the argument will only exist within the scope of the function. all variables made in 
functions only exist within function. this is considered a local variable. 
 */
function echo(input) {
    let greeting  //local variable only visible within scope of function
    console.log(input)  
}
console.log(greeting)  //will get a ReferenceError: greeting is not defined because greeting is scoped to the echo function
echo(42)

//functions can access global variables or variables outside scope of function
let greeting = "Hi"  
function echo(input) {
    console.log(`${greeting} ${input}`) //using template literals to interpolate both greeting and input. returns Hi 42
}
echo(42)

//arguments that are passed to functions must correspond in number and order to the functions parameters. 
function echo(input, greeting) {
    console.log(`${greeting} ${input}`)  
}
echo(42, "Hi") //argument 42 passed to parameter input, argument 'Hi' passed to greeting paramter

/*Functions allow you to take a value from the function scope and put it into an outer scope. 
This is a week solution because the result variable is re-assignable (re-assigned in the function). 
This solution will not work using const result*/
let result
function echo(input, greeting) {
    result = `${greeting} ${input}`  
}
echo(42, "Hi")
console.log(result)

/*A better approach will be to return the string from the echo function using the return keyword. The return keyword allows me to 
put the string immediately into a new variable once the function has been called. This can be done by creating a variable and 
immediately initialize it when function is called. */
function echo(input, greeting) {
    return `${greeting} ${input}`  
   }   
const result = echo(42, "Hi") //creating a variable and initializing it when function is called. 
console.log(result)

//if the return keyword is not defined within function, function will return undefined (null) by default
function echo(input, greeting) {
    `${greeting} ${input}`  
   }   
const result = echo(42, "Hi")
console.log(result) //will return null/undefined because return keyword not within function

//function that accepts a user and his/her message and displays the message 
const user1 = "Reed"
const user2 = "Doug"

function sendUserMessage(user, text) {
  console.log(`User ${user} says: ${text}`)
}
sendUserMessage(user1, 'Hey there')
sendUserMessage(user2, "What's up?")


/*Challenge: Write a function splitBill() that lets you know how much you need to pay to split any bill between you and your friends 
It should return a message with a number.
*/
function splitBill(amount, numPeople) {
    return `Each person needs to pay ${amount / numPeople}`
} 
// Testing your solution
console.log(splitBill(10, 2))
console.log(splitBill(16, 4))
console.log(splitBill(350, 9))

/*CLOSURE */
let likeCount = 0
function handleLikePost() {
  likeCount += 1  //increments likeCount variable by 1
}
handleLikePost()
console.log('like count:', likeCount) //returns like count: 1

/*in this example, you may expect likeCount to increment by one after each call on the function. but each time function is designed
to initialize/re-initialize likeCount to 0, then increment to 1 each time the function is called. Because these are local variables, 
they are dumped/destroyed after the function completes. The solution is to preserve or remember the likeCount between function calls.  */
function handleLikePost() {
    let likeCount = 0
    likeCount += 1  
    console.log('like count:', likeCount)
  } 
handleLikePost() //returns 1
handleLikePost() //expecting 2 but returns 1
handleLikePost() //expecting 3 but returns 1


/*Solution is to return a function from another function. program calls the addLike function outside the scope it was defined in.
this was accomplished by returning the inner function addLike from the outer function handleLikePost and storing a reference to it 
in a variable entitled like, which can be called as many times as desired. program preserves likeCount value between function calls. 

program returns the inner function addLike from the outer function handleLikePost. when handleLikePost is called it returns 
the function addLike(). a variable called like was created outside of function references the inner function addLike(), which keeps 
track of the incremented +=1  value of likeCount 

the outer function handleLikePost is executed when I call it via the like variable. when outer function is called, it creates an 
instance of the inner function addLike(). the addLike() function has access to any variable declared in the outer scope. 
since I returned addLike() it was provided as the return value for handleLikePost(), which is provided to the like variable. The like 
variable basically calls the addLike() function. The like variable allows me to call the inner function outside the scope it was 
defined in. 

Closure keeps the variable around after handleLikePost is executed. Since the inner function instance is still alive and assigned to like, 
the closure is preserving the likeCount variable. 

Global variables are around for the life of the program. However, local variables have short lives. local variables are created when the 
function is invoked/executed and deleted when the function is finished. Since I am returning the inner function from the outer function, 
the inner function closes over likeCount and keeps the likeCount variable alive. 

Closures have the following criteria:
1. Closures are a property of JavaScript functions - no other data types have closures.
2. Must call function in different scope than where function was original defined.  this means can only preserve likeCount when I 
returned addLike() from the outer function. By virtue of closure, able to keep the value alive to remember its value. 

Closures matter and make functions valuable because they allow us to remember values. Closures allows program to remember and or keep track
of certain values. 
*/

function handleLikePost() {
    let likeCount = 0
    return function addLike() {
      likeCount += 1    
      return likeCount
    }
    //addLike()
    console.log('like count:', likeCount)
  } 
//console.log(handleLikePost()) //returns addLike()...returning addLike() function from the handleLikePost() function
const like = handleLikePost() //assigns the addLike() function we get from calling the handleLikePost() function to variable like
console.log(like()) //returns 1
console.log(like()) //returns 2
console.log(like()) //returns 3

/*Because closure keeps variables alive, I can dynamically make changes to it. can make the likeCount dynamic by passing an argument 
to function  */
function handleLikePost(step) {
    let likeCount = 0
    return function addLike() {
      likeCount += step    
      return likeCount
    }
  //   addLike()
    console.log('like count:', likeCount)
  } 
const doubleLike = handleLikePost(2)
console.log(doubleLike()) //returns 2
console.log(doubleLike()) //returns 4
console.log(doubleLike()) //returns 6

/*Challenge: Write a countdown function with a hard-coded starting number inside closure.
program grabs the value 11 from the outer scope, which becomes part of the closure of the inner function decrease, which means it will
be remembered every time I run the decrease function.  the inner function decrease is run with the variable countingDown. 
countingDown calls the outer function countdown which value is decrease(), which is calling the inner function decrease */
function countdown() {
    let countFromNum = 11 
    return function decrease() {
      countFromNum -= 1 
      return countFromNum 
    }
  }
const countingDown = countdown() 
console.log(countingDown())  //returns 10
console.log(countingDown())  //returns 9
console.log(countingDown())  //returns 8
  
/*Stretch goalA: Write a countdown function that can count from a provided number with a provided step */
function countdown(startingNumber, step) {
    let countFromNum = startingNumber 
    return function decrease() {
      countFromNum -= step 
      return countFromNum 
    }
  }
const countingDown = countdown(11, 1) 
console.log(countingDown())  //returns 10
console.log(countingDown())  //returns 9
console.log(countingDown())  //returns 8

/*Stretch goalB: Write a countdown function that can count from a provided number with a provided step */
function countdown(startingNumber, step) {
    let countFromNum = startingNumber + step  //to start with the number I am actually passing in, will begin with 12
    return function decrease() {
      countFromNum -= step 
      return countFromNum 
    }
  }
const countingDown = countdown(20, 5) 
console.log(countingDown())  //returns 20
console.log(countingDown())  //returns 15
console.log(countingDown())  //returns 10


/*BETTER FUNCTIONS WITH DEFAULT PARAMETERS

Function accepts a number (degrees celsius) and returns degrees fahrenheit
Can specify the number of decimal places using a new string method called toFixed(). toFixed returns a string, 
so need to wrap expression in the Number function, where the results of the expression is passed to the Number function. This 
creates an explicit type conversion from string to number  */

function convertTemperature(celsius) {
    // celsius to fahrenheit
  const fahrenheit = celsius * 1.8 + 32 
  return fahrenheit 
}
console.log(convertTemperature(21))  //returns 69.80000000000001

//using toFixed method to control the number of decimal places
function convertTemperature(celsius, decimalPlaces) {
    // celsius to fahrenheit
  const fahrenheit = celsius * 1.8 + 32 
  return Number(fahrenheit.toFixed(decimalPlaces))  //explicit type conversion from string to number
}
console.log(convertTemperature(21, 1))  //returns 69.8

/*If i want to update the function so that decimalPlaces is optional, i can add an if statement. If an argument is not provided, JavaScript
returns an undefined value because it treats the unprovided argument as a variable that has not been initialized.  This approach works but 
the local variable decimalPlaces is being used 2x. Can use short-circuiting to make code more efficient*/
function convertTemperature(celsius, decimalPlaces) {
    // celsius to fahrenheit
  if (!decimalPlaces) {
     decimalPlaces = 1 
  }
  const fahrenheit = celsius * 1.8 + 32 
  return Number(fahrenheit.toFixed(decimalPlaces)) 
}
console.log(convertTemperature(21))  //returns 69.8

/*using short-circuiting. use the or condition to say if decimalPlaces is a falsy value and that argument is not provided, 
then set to default value of 1. the || operator evaluates operands as true (truthy) or false (falsy). if 1st operand is true, it stops 
at first and returns value of 1st operand.
This is a better solution but still has challenge of handling the case of 0 decimals. 
*/
function convertTemperature(celsius, decimalPlaces) {
    // celsius to fahrenheit
    decimalPlaces = decimalPlaces || 1  //did not receive argument for decimalPlaces so a value of undefined is returned, and undefined values
                                        //are falsy. the || operator evaluates 1st operand as false, so it moves to next operand and returns value of 1
  const fahrenheit = celsius * 1.8 + 32 
  return Number(fahrenheit.toFixed(decimalPlaces)) 
}
console.log(convertTemperature(21))  //returns 69.8

/*passing 0 as an argument does not remove decimals because 0 is a falsy value. when 0 is coercised to a boolean, it becomes false, which 
is why I get the default value of 1 decimal places. A better approach to deal with arguments not provided or falsy values passed as 
arguments is to use default parameter values*/
function convertTemperature(celsius, decimalPlaces) {
    // celsius to fahrenheit
  decimalPlaces = decimalPlaces || 1 
  const fahrenheit = celsius * 1.8 + 32 
  return Number(fahrenheit.toFixed(decimalPlaces)) 
}
console.log(convertTemperature(21, 0))  //returns 69.8

/*Default parameter values allows me to say directly on the function parameters that if an argument is not provided and therefore the 
value is undefined within the function (falsy value), the default value for the parameter will be used. The equal operator =, specifies
this. So if decimal places is not provided, the default value will be 1. This allows me to remove the short-circuiting expression  */
function convertTemperature(celsius, decimalPlaces = 1) {
    // celsius to fahrenheit
//   decimalPlaces = decimalPlaces || 1 
  const fahrenheit = celsius * 1.8 + 32 
  return Number(fahrenheit.toFixed(decimalPlaces)) 
}
console.log(convertTemperature(21))  //no argument for decimalPlaces passed, returns 69.8

/*default parameter values is best way to avoid writing conditionals in function to handle falsy and undefined argument values */
function convertTemperature(celsius, decimalPlaces = 1) {
    // celsius to fahrenheit
//   decimalPlaces = decimalPlaces || 1 
  const fahrenheit = celsius * 1.8 + 32 
  return Number(fahrenheit.toFixed(decimalPlaces)) 
}
console.log(convertTemperature(21, 0))  //passing 0 as an argument, returns 70. no longer passing a falsy value to a conditional