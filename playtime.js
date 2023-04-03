//<!-- HTML code for the game -->
<div id="game"></div>

//<!-- JavaScript code to track time played -->
<script>
  const game = document.getElementById("game");
  let startTime, endTime;

  // Start the game and get the start time
  function startGame() {
    startTime = new Date();
    // code to start the game
  }

  // End the game and get the end time
  function endGame() {
    endTime = new Date();
    // code to end the game
    // calculate the time played
    const timePlayed = (endTime - startTime) / 1000; // time played in seconds
    console.log(`Time played: ${timePlayed} seconds`);
  }

  // Add event listeners to start and end the game
  game.addEventListener("click", startGame);
  game.addEventListener("mouseup", endGame);
</script>
