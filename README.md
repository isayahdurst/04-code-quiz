# 04-code-quiz

This application allows a user to take a timed, multiple choice quiz with four pre-defined questions. If the user clicks the correct guess, they'll move onto the next question. If the user clicks the wrong choice, 10 seconds will be subtracted from their time remaining and they'll move onto the next question. The objective is to complete the quiz as quickly as possible without guessing an incorrect answer. After the quiz is complete, the user can enter their initials and save their score to a highscore leaderboard, where quizzes are ranked in order from highest to lowest score. This leaderboard is saved to localstorage on the user's PC so they'll continue to persist until cleared by the user.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

User Story:

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

Acceptance Criteria:

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
```

### Screenshot

- Quiz Preview [Quiz](./assets/images/quiz-screenshot.png?raw=true "Quiz Start Screen")

### Links

- Live Site URL: [Github](https://isayahdurst.github.io/04-code-quiz)

## My process

I began this project by taking a close look at the mock-up example that was presented inside of the class module. For most assignment's so far, I've taken a different approach to the design than the mock-up when given the chance, but this time I wanted to challenge myself to recreate the mock-up exactly as presented.

To start, I focused on building the HTML and CSS. I created each section of the site as it's own module (or card). There are four cards which display at various times: start, the quiz, quiz results, and highscores. I created each card one at a time and worked on the CSS for each card before moving to the next.

Once the site resembled the mock-up, I started adding functionality to the site. The first thing I focused on was click events to navigate between the different modules. For example, when clicking the start button, the start card should disappear and the quiz card should appear.

Once the navigation worked properly, I began working on loading quiz questions dynamically onto the website. This was a bit more challenging as I had to determine an appropriate data structure for holding the quiz data.

Ultimately, I decided to go with a Map. The decision for using a map rather than a regular JavaScript object came because I wanted to use numbers (and eventually booleans) as keys rather than just strings, which objects are limited to. In this sense, I could store all of the information about a quiz question in a very logical and structured manner. The key:value pairs are outlined below:

'question': 'Quiz question',
1: first choice,
2: second choice,
3: third choice,
4: fourth choice,
'answer': number representing the answer (ex. 3),
true, 'CORRECT! message',
false, 'WRONG! message'

While checking the answer to any given question, I passed an expression into the maps's .get() function which will return either true or false. The expression was "if the answer the user clicked on is equal to map.get(answer)). This returns true or false and then we search the map for true or false keys which return either "Correct" or "Incorrect". What I like about this arrangement is I could store unique messages for these results for each question inside the map and it's very easy to evaluate them without a separate method.

After creating the data structure, I moved on to actually loading the questions to the page using JS. This involved creating elements on the page and appending childs to insert those elements with their corresponding data.

Once all of that was done, I moved onto creating the timer for the quiz. For this, I decided to make the timer an object which uses the setInterval function and can be interacted with at any point of the quiz for manipulation. The object stores information about the time remaining and has a "start", "decreaseTime", and "Stop" function.

Once this was completed, then I finally begain working on storing a user's initials and score into localStorage and rendering those scores to the website. The website first searches for an array stored in localStorage called 'highscores' and if it doesn't find it then it starts with a blank array. If it does find it, it loads those values into an array called 'highscores' and uses those values. When an entry is saved, it is added to the 'highscores' array. Before scores are loaded to the page, they are sorted in order from highest to lowest so that the best scores are displayed at the top.

### Built with

- Semantic HTML5 markup
- CSS
- JavaScript

### What I learned

In this project, I learned much more about Maps. This was my first time successfully implementing them and I'm very pleased with the result. I'll definitely be using them more often and exploring other possibilities they allow for.

A couple challenges I faced which I had to overcome and learn from was: when I tried tracking the time, I originally made a method which started the timer, but I couldn't interact with the method again to stop the timer or decrease the time when a user entered an incorrect guess. Then I realized I should just make an object for the timer and suddenly everything became much easier.

Another challenge was saving the information to local storage. I had to read a lot of documentation about it because my implementation wasn't working and I couldn't figure out what I was doing wrong. The mistake was simple, though: I saved data to localStorage but I wasn't loading the data when the program started, so even though the data was stored, it wasn't being used. To overcome this, I just made sure the app checked localStorage and the problem was solved. Very simple mistake but it costed me a lot of time and I learned I should just consult Google sooner if I have a problem like this.

### Continued development

Regarding this site, there are a couple things I'd improve if I had more time. One of them is, I'd like the final 'correct' or 'incorrect' message to display for 1000ms before the test ends, so a user knows the result of the final question, but without this affecting their score. This is very easy to implement so I'll probably add that by the due date of this assignment.

Another thing which could be improved is the bottom border under the quiz being persistent the entire time. In the mock-up it's only visible for a couple seconds while the answer result is displayed.

FIXED - Sometimes when restarting the quiz, the last-entered initial in the initials text-entry field is still visible. I did a check to remove it but there's a specific way to go through the quiz which will circumvent removal and, whatever that is, I haven't been able to find it. To fix this, I could clear the value when the "start quiz" button is clicked or after the submit button.

## Author

- Github - [@isayahdurst](https://www.github.com/isayahdurst)
- Twitter - [@isayahdurst](https://www.twitter.com/isayahdurst)

## Acknowledgments

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
https://www.w3schools.com/jsref/jsref_map.asp
https://www.w3schools.com/jsref/met_win_setinterval.asp
https://www.codegrepper.com/code-examples/javascript/map+inside+object+javascript
...Others
