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
named like, which can be called as many times as desired. program preserves likeCount value between function calls. 

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
2. Must call function in different scope than where function was original defined. - can only preserve likeCount when I returned allLike()
from the outer function. By virtue of closure, able to keep the value alive to remember its value. 

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