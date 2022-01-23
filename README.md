*Project description*
A game done with tutorial provided by Franks Laboratory: https://youtu.be/jl29qI62XPg , https://www.youtube.com/watch?v=MwTQtPGuBmo
A fish game, where you have to navigate your fish through a sea and collect bubbles and avoid other fish

CONTROLS:
Mouse click or screen tap to set direction of movement for the fish

LOG: 23/01/2022 - REFACTOR CODE BRANCH
Started with separation of classes and objects into modules, https://www.youtube.com/watch?v=cRHQNNcYf6s 


LOG: 23/01/2022

GENERAL:
- Basic game loop is done, tutorial is now finished, game is working
- Now I would like to do some branching and adding following features:
  1)Refactor code, separate script.js to "modules" and learn how to export and import
  2)Choose your player, with added player stats example: fish1 will have 3 lives and speed of 10 (whatever the value is) and fish type 2 will have 2 lives and speed 15
  3)Progression through levels with added difficulty
  4)Main Menu with top score values retreived and stored with JSON and sent to server
  5)Mobile and responsive design for the game

ASSETS:
- all assets are now optimised

LOG: 16/01/2022

GENERAL:
- first part of tutorial is done, tomorrow (17/01/2022) I would like to go through the code, comment stuff, rename some variables and fix responsiveness of game

- ASSETS: 
- ogg assets differ in size, they might be optimised
- png images of fish are 4x bigger than they could be, I could simply resize and rewrite the variables in js script, I could enhance performance like this

- GAME LOOP:
- some ideas how to improve they game are: add lifes, add different types of fishes (you could choose fish based on amount of lives and speed as an example), existing SCORE could be bound to a name value and parsed as JSON to database, there could be menu for this game which could show scoreboard with corresponding name and score values.
