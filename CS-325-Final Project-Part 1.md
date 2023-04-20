COPY AND PASTE OF GOOGLE DOC:

LINK TO GOOGLE DOC:


https://docs.google.com/document/d/1EWNs4MAPuLDfLUxmAvOIVdrFJVdCjalHZKLiv4ngjI0/edit?usp=sharing

MUST USE GOOGLE DOC TO VIEW IMAGES  (BURNOUT CHART, UML, ETC)!
NUMBERING IS ALSO WRONG ON THIS FILE - REFER TO GOOGLE DOC OR PDF!



CS-325 - Final Group Project - Part 1
Brendan Estes, Christian Perry, Hangyu Yao, Mohammad Khan

1. (5pts) Think of a creative name and theme for the Suite of Games. 
The name of our website is: “The Retro Bundle”
It is a collection that showcases three retro games with more that can be added in the future. As such, the theme of the website is also retro/vintage. The three games we plan to include are Pacman, Bomberman, and snake. 

2. (15pts) Convert the ideas and requirements contained in the Project Scenario to User Stories. For each user story, break it down into tasks that need to be completed. 
Christian
User wishes to be able to travel through a maze as pacman with directional keys in order to collect all the yellow orbs. (score 4hrs)
Create class for dots that pacman collects
Create a canvas/ map for the game
The user wishes to be able to click on a link, box, etc. to go to the desired games. (score 2hrs)
Allow interaction with the webpage UI to go to the game selected
The user wishes to be able to see the amount of time to time spent in a given game to know the amount of time spent in the games. (score 2hrs)
Make a timer interface that you can see on the screen
Increment the timer
The users wishes to be able to press the directional keys to be able to move the pacman. (score 2hrs)
Take in user inputs/ event listener for the keys pressed for the direction moved
Show pacman moving by the desired direction
The user wants to add in the ghosts in the game to be able to give pacman the challenge in the game. (score 2hrs)
Add a class called ghost to add the enemy in pacman
Make them move around the maze randomly
The user wants to be able to input a keystroke to be able to move in a direction around the ‘maze’ in order to move around in bomberman. (score 2hrs)
Take in inputs using event listeners to move the bomberman around the maze
Show the movements of the bomberman
The user wants to be able to press a key or click the mouse in order to be able to place a bomb in (bomberman). (score 2hrs)
Take in an event listener from the mouse click that places the bomb for the game
The user wants to be able to record the score everytime a character is destroyed by the bomb in bomberman. Score 2hrs)
Add a part of the UI to hold a score that starts at 0
Increment the numbers everytime pacman eats a dot/ or ghost
The user wants to be able to see the effects from the bomb explosion vertically and horizontally to see the visual effects in the game. (score 8hrs)
Add visual effects of the bombs detination
The user wishes to be able to see the timer on the screen in order to see how much time is left in the game, in order to see how much time is left in the game before the game becomes a draw. (score 4hrs)
Add to the UI that also show the time on the clock counting down to the end of game time that will mean that game is over
Decrement the number to go down till it hits zero, and ends game
The user wishes to be able to see the ‘enemies’ in the bomberman game to be able to have the objective to the game. (score 8hrs)
Create a class of enemies for bomberman
Move them randomly 
The user wishes to be able to see the score to see how far you made it in the game (bomberman). (score 8hrs)
Add to the game UI that allows the score to be seen when the enemies are killed by the bomb
As the user, I want to be able to save a credit/debit card on file for easier purchasing ease. (score 8hrs)
Takes in user’s card credentials
Sends/stores the user’s info into the database system 
The user wishes to be able to access an in-game store in order to buy extras such as skins. (score 16hrs)
Allows the user to click on a shop icon to go to in game store
Allows the credit card company to purchase desired item
Hangyu Yao
As a user, I wish to be able to login through my Google and Facebook accounts so that I don’t need to set up an extra account.(score 4hrs)
Give alternative ways of signing in when signed into other platforms
As a user, I wish to be able to get some "gorgeous" and "high-tech" skins, in order to make me more interested in the game(score 8hrs)
Provide other means customization
Provide the game with different skins for game characters/items and place them in the shop
As a user, I want to be able to click the box or the mute button so that I can adjust the volume of the game.(score 4hrs)
Interactive button that shuts off sounds
As a user, I want to be able to click the pause button so that I can pause the game when I need to leave the game temporarily (score 8hrs)
Add a pause menu
Take in an event that knows to pause whats going on 
As a user, I want the dashboard is a single interface so that I can easily navigate and select games(score 4hrs)
Create a clean UI for the user to see everything clearly
As a user, I want to add a colorblind mode so that I can better distinguish colors(score 8hrs)
Add a settings destination that can be accessed 
Add a colorblind setting in settings, to help with colorblindness
As a user, I want different sound effects for different events so that I can quickly react to game events through sound effects(score 2hrs)
Create and save sound patterns that different events will play
Play the sound when the event was achieved
As a user I want add save points so that I can save my progress and resume playing from the same point later(score 4hrs)
Along to the setting page is adding a save button that is interactable
Takes all of the games data and copies it to a folder, for later retrieval
As a user, I want hidden easter eggs in the game so that I can enjoy finding them(score 4hrs)
Add secret puzzles/ or events that can be achieved
Hide the event to be found
As a user, I want helpful hints so that I can view game details(score 2hrs)
Print an overlay screen to the game that won't get in the way
Print in the overlay ways to get hits or tips in a game
As a user, I want to change keymaps so that I can use familiar keymaps(score 4hrs)
Create a database that holds and saves keys to specific activities
Allow the keys to be changed if desired to do something else
As a user, I want to create a new save so that I can relive the game(score 2hrs)
Create another spot that holds a black game, that allows you to restart the game from the beginning
Brendan Estes
 As a user, I want all games to be available in a single dashboard screen so that it is easy for me to choose what game I want to play. (4 hours)
Create a simple and clean way of accessing the games
Create way to access the games
As a user, I need to be able to log into my account so that I can access the webpage (4 hours)
Provide a login page
Take the users credentials 
Save the users credentials into a server to allow them to stay signed in
 As a client, I want a way to have ads on the website so that I can make ad revenue. (8 hours)
Pause the game to allow a video advertisement take over for a given small amount of time
Allow the user to leave the ad after time is up
As a developer, I want the code to be modular so that it is easy to add future games. (16 hours)
Habitually keep the code clean for ease of additions to the game
As a user, I want a leaderboard or scoreboard so that I can see how competitive I am. (4 hours)
Take the users score and sends it to a server
Create a scoreboard that takes all the users’ data and makes a list from highest to lowest
As a user, I want to be able to select the color of my character (if available) so that I can be entertained and can feel I have a level of personalization. (2 hours)
There is a menu to select the amount of customization to a character or item
Create multiple options for customizations and add them into the store or your own inventory
As a client, I want my user's login information to be safe and secure so that my clients feel comfortable using my site. (2 hours)
Users will use personal/private login information
This login information will be accessible (database)
This database and the information inside must be kept safe
As a client, I want only users who are logged in to be able to access and play our games so that I can know who is playing the game and control access. (1 hour)
Database of users is kept
Website recognizes that you are logged in
As an admin, I want a way to access the user account database so that I can delete or ban accounts if needed. (4 hours)
There is an account database
Admins have access to this account database, normal users do not.
There is deletion functionality.
As a client, I want all of my games to look similar aesthetically so that the experience seems cohesive and is not jolting. (8 hours)
The games each have their own individual code regarding styling.
 As a user, I want help screens so that I can find out how to navigate and use the website and access the games. (2 hours)
Needs to be at least a login screen, games selections screen, and (x3) game screens.   
As a user, I want some humor in my error messages so that the mood is lightened. (1 hour)
There are error messages for certain scenarios.
 As a user, I want a replay button, so I can quickly get back into playing the game. (2 hours)
Replay button restarts game but not account or stats.
As a user, I want a simple stop, home, or back button so that I can easily switch between games. (1 hour)
Needs to be a home/main screen to go back to
As a user, I want a way to select the difficulty level so that if I’m new, I can have an easy experience, and if I’ve played before, I can have a challenge. (8 hours)
Different difficulty levels that increase or decrease certain aspects of the different games
 As a user, I want my experience to not be interrupted or affected if someone else creates an account or if a new game is added so that I have a seamless experience. (4 hours)
Users can create accounts and games can be added
Multiple users can be playing the games at the same time on the same website but tracking different accounts.
 As a user, I want my stats to follow me even if I disconnect, log out, or switch to another game so that I can have progression and keep track of how I’ve been doing. (8 hours)
Cookies or some database to keep track of user progress
Scoring system for the games to keep track of
Mohammad Khan
 As a user, I want to be able to delete my account so that my information isn’t stored if I no longer want to be part of this site.  (2 hours)
User information is stored somewhere
Page for account management
 As a developer, I want to make sure the user passwords are based using SHA so that I comply with standards and requirements. (2 hours)
Password database to store user passwords
Users are able to sign up
 As a developer, I want a private interface or dashboard to easily add new games so that I don’t have to do extra coding when it’s time to add a game in the future besides coding the actual game. (4 hours)
Limited access to private data/interface through admin account
Built-in expectation for more games and links to be added.
 As a client, I want an admin panel when I log in so that I can easily complete all of the different admin functions available to me. (4 hours)
Difference between admin and standard account
Database to note said difference
 As a user, I want a way to download or save the website and games in some capacity so that I can access them even if I don’t have internet. (4 hours)
Page to download games
Download button
Way to upload games/files to be uploaded
Way for game to be a singular game/launch game file
  As a client, I want the website and games to be able to run as an app on a phone (iOS and android) so that we can reach a larger market. (16 hours)
App compatiable
 As a user, I want to be able to get email notifications if there is an update or new game added so that I can keep up to date and aware of the latest games the site has to offer. (4 hours)
User signs up with email
Admin has way to send email to every user






3. (3pts) Use Planning Poker to assign “story points” to each user story. 
Next to each story is an assigned hours/points using the planning poker scale used in the class exercise


4. (3pts) Determine a strategy for prioritizing the user stories and put them in order accordingly. 
	
	After discussing among the different group members, we found that the strategy we should take for prioritizing user stories is to first focus on critical tasks that are vital to the running of our website and the games. Sitting down and taking time to discuss the different user stories is preferred. We are flexible with our prioritization, and it may change depending on the amount of time we have available. 

	The best 10:
The user wishes to be able to click on a link, box, etc. to go to the desired games. (score 2hrs)
As a user, I want to be able to click the box or the mute button so that I can adjust the volume of the game.(score 4hrs) 
As a user, I want the dashboard is a single interface so that I can easily navigate and select games(score 4hrs) 
The user wishes to be able to see the amount of time to time spent in a given game to know the amount of time spent in the games. (score 2hrs)
 The user wishes to be able to see the timer on the screen in order to see how much time is left in the game, in order to see how much time is left in the game before the game becomes a draw. (score 4hrs) 
The user wants to be able to input a keystroke to be able to move in a direction around the ‘maze’ in order to move around. (score 2hrs) 
As a user, I want helpful hints so that I can view game details(score 2hrs) 
As a user, I want different sound effects for different events so that I can quickly react to game events through sound effects(score 2hrs) 
The user wants to be able to see the effects from the bomb explosion vertically and horizontally to see the visual effects in the game. (score 8hrs) 
As a user, I want to add a colorblind mode so that I can better distinguish colors(score 8hrs) 

5. (5pts) Assume that the project will be done in 10 sprints (we will only do 3 sprints) and create a burndown chart. 
Starting at 137 hours = total of all 50 user stories added up.


6. (5pts) Start a common GitHub for this project. 
https://github.com/BrendanEstes/CS325002FinalTeamProject 



7. (5pts) Discuss the structure of the project with your teammates and decide together on an effective architecture. 
As mentioned by Dr. Matta in class, we have not covered effective architecture and as such do not need to answer this question. However, the structure of our project is based on us having constant communication and multiple online meeting each week in order to gauge progress and assist others. We also plan to start from the ground and work up. This means we will start with getting a general webpage with three different selections and then move on to implementing the games, then more specifics about the games etc. Throughout this time, we will also focus on building up an account system so that our users can log in, and then once both systems are ready we can integrate them.

8. (5pts) To the extent possible, create a UML class diagram showing the structure of the proposed suite of games. 


9. (4pts) Compile your prioritized list of user stories, tasks, and story points; a 1-page discussion of how you will structure completion of the project; your UML class diagram, and your burndown chart into a pdf file and submit on Moodle.
“For the project discussion (question 9), discuss things like how you will prioritize user stories, how you will divide the work, how you will make your project cool, etc.”

We plan to have a flexible view towards our user stories. There are some that are especially important and will need to be prioritized at all costs. However, there are others that can swapped out for another in the event a task is taking too long. Some examples of tasks that will be prioritized no matter what are those that are essential to the project and to our website. For example, we know that we need to prioritize user stories that focus on the user simply being able to get and play the game. This includes making things such as the home menu with the selection of games. Other user stories that introduce aspects such as customization or smaller game mechanics, while interesting, are not as much of a priority. From our point of view, there is no reason to focus on stories that modify the game, if we can't even play the game or access the website in the first place. In terms of dividing work, we think it is best to sit down together and look at our list of user stories, from there we can decide what stories we want to work on, assess their score from planning poker, and assign each individual user stories to work on based on the score, assigning them so that the scores are equal for each team member. Finally, in terms of how to make the project cool, we think it is best to focus on our retro theme. Having an interesting background and colors that fit our retro theme will already give our site and advantage. On top of this, we also want to give our users a certain level of customization. Whether this is purely game-related (character color), or also website-related (change background) is undecided, but customization will be important to help make our site more “cool”.
