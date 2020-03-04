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

/*SHORTER FUNCTION WITH ARROWS FUNCTIONS AND CALLBACK FUNCTIONS

Benefit of arrow functions is that they strip away as much extraneous info as possible. With arrow functions, no longer need the
function keyword, parenthesis around parameters, the return keyword or curly braces.  All is need is the fat arrow => and parameter(s).
The arrow function was created to provide a more concise way of creating functions. As well as working with objects and classes easier 
pertaining to handling the 'this' keyword.  

Functions can be used just like any other value. Specifically, functions can be returned from other functions (as seen with Closure).
If functions can be passed around like other values, functions can be passed to other functions. This is the basis of callback functions. 

this function accepts a name and uses template literals to return a capitalized name  returns John
*/
const username = 'john' 
const capitalize = function capitalizeName(name) {          //using variable identifier capitalize to call the function
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`  /*name.charAt(0) - takes 1st letter of name
                                                             chain on the toUppercase method  
                                                             name.slice(1) - gets the rest of the letters in name*/
}

/*since not using the name of the function capitalizeName() to call it, can drop the name of the function. Once dropped, it becomes an 
anonymous function .  */
const capitalize = function(name) {
    return `${name.charAt(0).toUpperCase()}${name.slice(1)}`   
  }

/*program can be converted to an arrow function. Important to remember about arrow functions:
1. arrow functions are function expressions and therefore assigned to a variable.
2. arrow functions are anonymous and can't directly give them a name. 
3. arrow functions do not use any keywords which makes them very easy to write 
4. just need a fat arrow after the parameters which points towards the body */
const capitalize = (name) => {
    return `${name.charAt(0).toUpperCase()}${name.slice(1)}`   
  }

/*can further simplify code. because there is just one parameter, can drop the parenthesis entirely. will need to add back parenthesis if
there are 2 or more parameters, otherwise will result in error.   */
const capitalize = name => {
    return `${name.charAt(0).toUpperCase()}${name.slice(1)}`   
  }

/*Also, if function body is short enough, can make use of an implicit return. Any code following the => will be interpreted as the function
body. So curly braces can be removed. The following program will result in an error:

const capitalize = name => 
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`  

if remove curly braces and keep the return keyword, will result in an error: SyntaxError: Unexpected token 'return'. 

This is because the explicit keyword return does not work with arrow functions. By default there is an implicit return. The resolved
value within the function is always returned.  
*/
const username = 'john' 
const capitalize = name => 
 `${name.charAt(0).toUpperCase()}${name.slice(1)}`   
console.log(capitalize(username))  /*returns John. calls capitalize which calls the anonymous arrow function, passes the argument 
                                    username to the parameter name */

//can put everything on one line. 
const capitalize = name => `${name.charAt(0).toUpperCase()}${name.slice(1)}` //returns John

/*using callbacks to greet the user based upon name provided. callback is just a function called after another function. its 'called back'
from the function that it was used in. callbacks make sure we call one function after the other. the ability to pass a function to another 
function as a callback is called a higher order function. this allows me to create a function as a function argument and it will be called
back in the function that it was referenced and executed in.  functions can be passed to other functions. This is the basis of callback 
functions. 

program is using capitalize function in combination with another function that greets user  using the users capitalized name. 
the greetUser function will return greeting to user using capitalize function and provide greetUser with the name I want capitalized. 
will provide the greetUser function with a parameter for name, and execute the capitalize function within greetUser and pass 
capitalize function the name that it needs. for the 2nd argument of greet user, can provide a callback function. 
the callback function will take the result of capitalize(name) and use it as an argument for itself to return greeting. callback as a 
function will accept the capitalized name. finally return the greeting we get from callback to display user.  */
const username = 'john' 
const capitalize = name => `${name.charAt(0).toUpperCase()}${name.slice(1)}`  //using arrow function. returns John
function greetUser(name, callback) {
  return callback(capitalize(name)) //callback function receives the results of the capitalized function (aka John)
}
//greetUser(username, function(name) {})  //What data does this function receive/what to write as its parameters? Look back to where function is called. function keyword removed and replaced by =>
const result = greetUser(username, (name) => {
    return `Hi there, ${name}` //within callback body, can do whatever with the value
  }) 
console.log(result)  //returns Hi there, John

//can reduce to shorthand
const result = greetUser(username, name => `Hi there, ${name}!`) 

/* Challenge: Rewrite your first function from a previous challenge to be an arrow function. */
function splitBill(amount, numPeople) {
  return `Each person needs to pay ${amount / numPeople}`
}
//rewritten as arrow function.  arrow functions are always anonymous so need to create a variable to store the function
const splitBill = (amount, numPeople) => {
  return `Each person needs to pay ${amount / numPeople}` 
}
//can remove the return keyword and curly brackets to make more concise by putting all on 1 line
const splitBill = (amount, numPeople) => `Each person needs to pay ${amount / numPeople}`
console.log(splitBill(10, 2))  //returns Each person needs to pay 5
console.log(splitBill(10, 4))  //returns Each person needs to pay 2.5
console.log(splitBill(10, 5))  //returns Each person needs to pay 2

/*Stretch goal: Rewrite counting down closure in arrow function form. */
function countdown(startingNumber, step) {
let countFromNum = startingNumber + step 
return function decrease() { //need function to keep track of changing number. Closure keeps track and prevents local variable from being dumped 
  countFromNum -= step 
  return countFromNum 
}}
/*rewritten as arrow function. removed keyword function, created variable countdown to store function, removed name of inner function decrease  */
const countdown = (startingNumber, step) => {
  let countFromNum = startingNumber + step 
  return () => {
    countFromNum -= step 
    return countFromNum 
  }
}
/*the arrow function will by default return the expression if there is only 1 expression inside the body of 
the function. as a result can remover the return statement from inner function and the curly brackets to put the inner function
on one line */
const countdown = (startingNumber, step) => {
  let countFromNum = startingNumber + step 
  return () => countFromNum -= step 
}
const countingDown = countdown(20, 2) 
console.log(countingDown())  //returns 20
console.log(countingDown())  //returns 18
console.log(countingDown())  //returns 16


/*PARTIAL APPLICATION FOR SINGLE-RESPONSIBILITY FUNCTIONS

Instead of having 1 function perform multiple procedures, partial application allows functions to have single, clearly defined 
responsibilities.  Partial application may not be a technique i may use very often but it is a powerful tool to improve role of 
functions, their reusability and separation of concerns. Some functions may need to be split apart because the argument data is not 
tightly coupled and partial application is a valuable pattern/technique to use in this situation. partial application allows me 
to invoke a function once to store data and reuse the data again and again to reduce repetition and confusion in application.  

Will come across higher order functions regularly and they are built into a number of JavaScripts features.


This is the program from Closure section where using variable doubleLike to access the inner function addLike outside the scope 
it was defined. (Recall handleLikePost returns addLike)  Since handleLikePost is returning a function, it is a higher order function.
Closure helps to preserve the likeCount variable between function calls. The argument step that was passed to function was also kept/
preserved because of closure. Closure allows me to keep the step value passed to the outer function around for the next function call.
Meaning it allows me to create this reusable doubleLike function. Every-time function called and because of closure, was able to save the 
step value (in this case 2). This approach to using higher order functions to preserve data thru closures is called Partial Application.
Partial Application refers to the fact that we are applying some but not all of the arguments of the function and waiting for the rest of 
the arguments.  It is also possible to pass an argument to the inner function as well.  
*/
function handleLikePost(step) {
  let likeCount = 0;
  return function addLIke() {
    likeCount += step;
    return likeCount;  
  }
}
const doubleLike = handleLikePost(2);
console.log(doubleLike()); //returns 2
console.log(doubleLike()); //returns 4
console.log(doubleLike()); //returns 6

/*creating function to obtain user's posts and comments in order to like them. function will allow me to combine a given URL and route
to be able to fetch data from to get posts and comments. this program fetches data from a rest API. the benefit of higher order functions 
come into play, particularly with partial application patterns, is that they allow us to have functions with certain values that are 
preserved. Like with the step argument passed to handleLikePost function. With this, allows me to make functions more clear as to what 
they do. They allow me to write better code by allowing functions to have single responsibility. 
*/
function getData(baseUrl, route) {
  fetch(`${baseUrl}${route}`)  //fetch() function accepts base url and route
    .then(response => response.json())  //then callback used to get back the data
    .then(data => console.log(data))  //then callback resolves/returns data, and has the name data
}
getData('https://jsonplaceholder.typicode.com', '/posts')  //calling getData with base url and route to get posts. returns log with posts data
getData('https://jsonplaceholder.typicode.com', '/comments')

/*rewriting with partial application. begin by creating an anonymous inner function within getData and pass in code used to fetch data.
Instead of outer function accepting both arguments for baseUrl and route, the inner function will accept the route argument. 
when calling getData function, whats returned is the inner function. the inner function accepts the argument route. 
so calling getData returns function(), which accepts argument route; function(route)
because of this, can assign a descriptive variable to the generic getData function.  since data will be returned from inner function, can
put the return function in a new reusable variable called getSocialMediaData. This is an immediate benefit with partial application.
With partial application, when i lock in base url with a closure, i get a more clearly defined single responsibility for the function, 
which whenever i use getSocialMedia variable, i know exactly what i will be doing. (base url provided gets both posts and comments data).

so with this application, used partially applied function, passed arguments (base url) into outer function getData.  
i got back a function that locks those values passed in place thru a closure and called it with some other data. a partially applied
function reduces the number of arguments for a function. so basically have 2 separate functions each with their own argument
all while given a pattern for the functions to remember data that is passed to it. 
*/
function getData(baseUrl) { //outer function accepts url argument 
  return function(route) {  //inner function accepts route argument   
    fetch(`${baseUrl}${route}`) //fetch function accepts base url and route
    .then(response => response.json()) //then callback used to get back the data
    .then(data => console.log(data))  //then callback resolves/returns data, and has the name data which is logged to console
  }  
}
const getSocialMediaData = getData('https://jsonplaceholder.typicode.com') //putting function in a reusable variable. base url gets posts and comments
getSocialMediaData('/comments') //calling inner function and providing it with required argument for route. returns all comments
getSocialMediaData('/posts') //returns all posts. 

/*program below extends the partially applied function for it to accept a callback to work with and display the comment or post data. 
this can be done by adding another inner anonymous function and fetch the data within it. through the newly added inner function, can 
pass a callback as a parameter and replace the console.log with the callback, and pass the resulting data to it. passing the 
resulting data to the callback will allow me ability to manipulate the data. 

now with the partially applied function with the new inner anonymous function, instead of getting data from 
getSocialMediaData('/comments') and getSocialMediaData('/posts'), we now get a returned function that takes a callback.
can now assign the new inner function to a new variable when providing the posts and route to the getSocialMediaData variable. 
then pass a callback function to the 2 new functions getSocialMediaPosts and getSocialMediaComments. The data from the 2 new functions
will come in the form of arrays. because of arrays, can iterate over arrays using forEach() method.

when calling getSocialMediaPosts(), notice it accepts a callback; and looking at the callback in the callback function, 
notice the callback .then(data => callback(data))  gets access to the data, which is an array. within the getSocialMediaPosts 
function body, can iterate over the array using the forEach array method; and for each post, console log the post title. this returns 
each of the titles from the post array. 
*/

//program extends the partially applied function for it to accept a callback to work with and display the comment or post data
function getData(baseUrl) {
  return function(route) { 
    return function(callback) { //adding additional inner function and putting fetch functions within it 
      fetch(`${baseUrl}${route}`)
        .then(response => response.json())
        .then(data => callback(data))  //passing the resulting data to the callback which allows for data manipulation
    }     
  }  
}
const getSocialMediaData = getData('https://jsonplaceholder.typicode.com')
const getSocialMediaPosts = getSocialMediaData('/posts') //assigning variable to inner callback function. will get a returned function that takes a callback. data will come in form of an array
const getSocialMediaComments = getSocialMediaData('/comments')

getSocialMediaPosts(posts => { //when calling function, it will accept a callback and callback function gets access to the data.  
  posts.forEach(post => console.log(post.title))  //iterating over the array and logging each of the titles in post array. 
})

//converting series of function declaration to arrow functions (removing function keywords and curly braces)
const getData = baseUrl =>
  route =>
    callback =>  
      fetch(`${baseUrl}${route}`)
        .then(response => response.json())
        .then(data => callback(data))  

//putting on single line:
const getData = baseUrl => route => callback =>  
      fetch(`${baseUrl}${route}`)
        .then(response => response.json())
        .then(data => callback(data))  

/*HOW FUNCTIONS SHOULD BE NAMED

Functions should include a verb/action and a noun, which is the data the action is being performed on. try to omit conjunctions like
a & and. keep verb at beginning followed by noun. keep in present tense. say function out loud and test to see if lay person can understand
what function does. express what action is taking place and to what piece of data within application. make sure i remain consistent with 
the naming conventions. try using action words get, create, update, delete.  
*/
// create a todo
function createTodo() {}
// update a todo
function updateTodo() {}
// check off todo
function checkCompleteTodo() {}
// delete todo
function deleteTodo() {}
// getting a todo
function getTodo() {}
// getting user
function fetchUser() {} /*action verbs are same but providing function with a different prefix. may cause confusion. 
                        update to getUser to keep naming convention consistent */