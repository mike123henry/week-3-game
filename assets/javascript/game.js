
{

//global varibals
  var firstGame = true;
  var abcObj ={
    letterAll: [],
    alreadyGuessed:[]
  }
  var wordFindObj ={
    searchWord: "",
    searchWordArray: [],
    searchWordArrayLowerCase: [],
    foundLettersArray: [],
    foundLettersString: "",
    foundLettersArrayToString: function(){
      this.foundLettersString = ""; //reset to ensure it's clear before creating a new one

      for(var x=0;x<this.foundLettersArray.length;x++){
        this.foundLettersString = this.foundLettersString + this.foundLettersArray[x];

      }
    }
  }
  var gameWordsObj={
    gameAlreadyPlayNdx: [],
    gameWordList: [],
    gameArtistList: [],
    gameYouTubeList: [],
    initAlreadyPlayNdx: function(){
      for(var x=0;x<this.gameWordList.length;x++){
        this.gameAlreadyPlayNdx[x] = x;
      }
    }
  }


  var stringAbcGuessed;
  var stringAbcLeft;
  var lettersCorrect;
  var lettersMissed;
  var percentGuessedRight;
  var gamesWon;
  var gamesLost;
  var guessesLeft;
  var percentGamesWon;
  var currentCorrectGuessStreak;
  var longestCorrectGuessStreak;
  var hangmanAreaText;
  var gameCmdTxt;
  var userGuess;
  var gameOver;
  var youWon;
  //var searchWord = "football";
//end gobal variables

//initilization

  //initilizeABC();
  //stringABC();

//end initization

//control of hangman area



//capture Key Clicks
  document.onkeyup = function(event) {
    //wait for space bar hit
    if (event.keyCode === 32 && firstGame === true){
      //initilize first game if space bar hit
      initFirstGame();
      //initFind();
    }
    //if not space bar is it a valid guess
    else if (!gameOver && !(event.keyCode === 32)){
      var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
      var letterAllNdx=abcObj.letterAll.indexOf(userGuess);
      //if vaild guess
      if(abcObj.letterAll.includes(userGuess) === true && abcObj.alreadyGuessed[letterAllNdx] === false){
        evalUserGuess(userGuess , letterAllNdx);
        //update stats

        //update & output hangmanAreaHTML

      }//end if valid guess
    }//end of game not over
    else{ //wait for space bar to continue
      if (event.keyCode === 32){
      //initilize next game if space bar hit
      initNewGame();
      }
    }
  }

//control of stats area

//end control of stats area



//functions

  function updateGuessed(ndx){
    //track the letter guessed
    abcObj.alreadyGuessed[ndx]=true;
    //format the abc strings for output
    stringABC();
    //output new ABC's to screen
    var unGuessedStringText  ="<p id='unGuessedHtml'>" + stringAbcLeft + "</p>" ;
    var guessedStringText = "<p id='allGuessedHtml'>" + stringAbcGuessed + "</p>";
    var guessesLeftText ="<p id= 'guessesLeftHtml'> Tries remaining = " + guessesLeft +"</p>";
    document.querySelector('#unGuessedHtml').innerHTML = unGuessedStringText;
    document.querySelector('#allGuessedHtml').innerHTML = guessedStringText;
    document.querySelector('#guessesLeftHtml').innerHTML = guessesLeftText;
  }//end updateGuessed

  function initilizeABC(){
    abcObj.letterAll= ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    abcObj.alreadyGuessed= [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  } //end of initilizeABC

  function initFirstGame(){

    gamesWon = 0;
    gamesLost = 0;
    percentGamesWon = 0;
    longestCorrectGuessStreak = 0;
    lettersCorrect = 0;
    lettersMissed = 0;
    guessesLeft = 10;
    percentGuessedRight = 0;
    currentCorrectGuessStreak = 0;
    initilizeFirstSearchWord();
    initNewGame();

  } // end of initFirstGame

  function initNewGame(){
    //outputHangmanArea(-1);
    initilizeABC();
    stringABC();
    initilizeSearchWord();
    outputHangmanArea(-1);
    lettersCorrect = 0;
    lettersMissed = 0;
    guessesLeft = 10;
    percentGuessedRight = 0;
    currentCorrectGuessStreak = 0;
    gameOver = false;
  } // end of initNewGame
  function stringABC(){
    stringAbcLeft ="Letters remaining = |";
    stringAbcGuessed="Letters already guessed = |";
    for (var x = 0 ; x < abcObj.letterAll.length;x++){
      if(abcObj.alreadyGuessed[x]==false){
        stringAbcLeft=stringAbcLeft.concat(abcObj.letterAll[x])+"|";
      } // end of if
      else{
        stringAbcLeft=stringAbcLeft.concat(" ")+"|";
        stringAbcGuessed=stringAbcGuessed.concat(abcObj.letterAll[x])+"|";
      } // end of else
    }// end of for
  }//end of stringABC()

  function outputHangmanArea(ndx){
    if(ndx == -1){
      initilizeHangmanArea();
    }
    else{
      //switch on the numbers of missed guesses
      switch (ndx) {
        case 0:
          //nothing changes
          break;
        case 1:
          var line1Text = "<p id='line1Html'>   0</p>";
          document.querySelector('#line1Html').innerHTML = line1Text;
          break;
        case 2:
          var line2Text = "<p id='line2Html'>|</p>";
          document.querySelector('#line2Html').innerHTML = line2Text;
          break;
        case 3:
          var line2Text = "<p id='line2Html'>-| </p>";
          document.querySelector('#line2Html').innerHTML = line2Text;
          break;
        case 4:
          var line2Text = "<p id='line2Html'>-|-</p>";
          document.querySelector('#line2Html').innerHTML = line2Text;
          break;
        case 5:
          var line2Text = "<p id='line2Html'>--|-</p>";
          document.querySelector('#line2Html').innerHTML = line2Text;
          break;
        case 6:
          var line2Text = "<p id='line2Html'>--|--</p>";
          document.querySelector('#line2Html').innerHTML = line2Text;
          break;
        case 7:
          var line2Text = "<p id='line2Html'>>--|--</p>";
          document.querySelector('#line2Html').innerHTML = line2Text;
          break;
        case 8:
          var line2Text = "<p id='line2Html'>>--|--<</p>";
          document.querySelector('#line2Html').innerHTML = line2Text;
          break;
        case 9:
          var line3Text = "<p id='line3Html'>/</p>";
          document.querySelector('#line3Html').innerHTML = line3Text;
          break;
        case 10:
          var line3Text = "<p id='line3Html'>/ \\</p>";
          document.querySelector('#line3Html').innerHTML = line3Text;
          break;
      }
    } //end else not init
      var searchWordText =   "<h2 id='searchWordHtml'>"+ wordFindObj.foundLettersString + "</h2>";
      document.querySelector('#searchWordHtml').innerHTML = searchWordText;

  } //end outputHangmanArea()

  function initilizeSearchWord(){
  //function  initFind(input){
    var currentGameNdx = gameWordsObj.gameAlreadyPlayNdx[Math.floor(Math.random()*gameWordsObj.gameAlreadyPlayNdx.length)];
    //make it so games are not repeted
    // remove the current from the available play list
    gameWordsObj.gameAlreadyPlayNdx.splice(gameWordsObj.gameAlreadyPlayNdx.indexOf(currentGameNdx), 1);
    //reset all the wordFindObj arrays
    if (wordFindObj.searchWordArray.length > 0 ) {
      //reset length of array to 0 to fix issue with long search word leaving junk if followed by short
      for (var i = wordFindObj.searchWordArray.length; i > 0; i--) {
          wordFindObj.searchWordArray.pop();
        }
    }

    if (wordFindObj.foundLettersArray.length > 0 ) {
      //reset length of array to 0 to fix issue with long search word leaving junk if followed by short
      for (var i = wordFindObj.foundLettersArray.length; i > 0; i--) {
        wordFindObj.foundLettersArray.pop();
      }
    }
    if (wordFindObj.searchWordArrayLowerCase .length > 0 ) {
      //reset length of array to 0 to fix issue with long search word leaving junk if followed by short
      for (var i = wordFindObj.searchWordArrayLowerCase .length; i > 0; i--) {
        wordFindObj.searchWordArrayLowerCase .pop();
      }
    }
    //end reset all the wordFindObj arrays
    wordFindObj.searchWordArray = gameWordsObj.gameWordList[currentGameNdx].split("");
    var  tempWord = gameWordsObj.gameWordList[currentGameNdx].toLowerCase();
    wordFindObj.searchWordArrayLowerCase = tempWord.split("");
    for(var x = 0; x < wordFindObj.searchWordArray.length;x++){
      if (wordFindObj.searchWordArray[x] === " ") {
        wordFindObj.foundLettersArray[x] = "  ";
      }
      else{
        wordFindObj.foundLettersArray[x] = "*";
      }
      //wordFindObj.foundLettersString = wordFindObj.foundLettersString + wordFindObj.foundLettersArray[x];
    }//end for
    wordFindObj.foundLettersArrayToString();
    outputHangmanArea(0);
  }//end initFind()

  function evalUserGuess(userGuess,letterAllNdx){
    //is the guess is in the search Word
    if(wordFindObj.searchWordArrayLowerCase.includes(userGuess)){
      var searchWordArrayNdx=wordFindObj.searchWordArrayLowerCase.indexOf(userGuess);
      var searchWordArrayLastNdx=wordFindObj.searchWordArrayLowerCase.lastIndexOf(userGuess);
      //if the guess is in the word we are looking for add the letter to the word and update the abc lines
      wordFindObj.foundLettersArray[searchWordArrayNdx] = wordFindObj.searchWordArray[searchWordArrayNdx];
      wordFindObj.foundLettersArrayToString();
      updateGuessed(letterAllNdx);
      //now check to see if the letter is in multiple places in the search word we are looking for
      if (searchWordArrayNdx !=searchWordArrayLastNdx) {
        //increment searchWordArrayNdx by one and loop through until we get all of this userGuess
        for (var x = searchWordArrayNdx +1 ;x<wordFindObj.searchWordArray.length;x++){
          searchWordArrayNdx = wordFindObj.searchWordArrayLowerCase.indexOf(userGuess, x);
          if(searchWordArrayNdx===-1){
            //when wordFindObj.searchWordArray.indexOf returns -1
            //there are no more of userGuess so break out of the loop
            break;
          }
          wordFindObj.foundLettersArray[searchWordArrayNdx] = wordFindObj.searchWordArray[searchWordArrayNdx];
          wordFindObj.foundLettersArrayToString();
        }
      }
      outputHangmanArea(0); //not a missed guess - don't add to the hangman
      var wasGuessCorrect = true;
      updateStats(wasGuessCorrect);
      //output stats
    }// end of correct guess
    else{
      //else incorrect guess
      //increment fial counter
      lettersMissed++;
      guessesLeft--;
      outputHangmanArea(lettersMissed);
      updateGuessed(letterAllNdx);
      //putput stats
      var wasGuessCorrect = false;
      updateStats(wasGuessCorrect);
    }

  }// end evalUsserGuess()

  function initilizeHangmanArea(){
    hangmanAreaText = "<h2 id='gameCmdHtml'>Choose a letter</h2>" +
      "<p id='line1Html'></p>" +
      "<p id='line2Html'></p>" +
      "<p id='line3Html'> </p>" +
      "<br>"+
      "<h2 id='searchWordHtml'>"+ wordFindObj.foundLettersString + "</h2>"+
      "<br>"+
      "<p id='unGuessedHtml'>" + stringAbcLeft + "</p>" +
      "<p id='allGuessedHtml'>" + stringAbcGuessed + "</p>" +
      "<p id='guessesLeftHtml'> Tries remaining = " + guessesLeft +"</p>"
    document.querySelector('#hangmanAreaHTML').innerHTML = hangmanAreaText;

    var jumbotronSubText = "<div id='jumbotronSubHtml' class='text-center '>Now you've done it!!</div>"
    document.querySelector('#jumbotronSubHtml').innerHTML = jumbotronSubText;
  }
  function updateStats(wasGuessCorrect){
    if (wasGuessCorrect) {
      lettersCorrect++;
      currentCorrectGuessStreak++;
      if (currentCorrectGuessStreak > longestCorrectGuessStreak) {
        longestCorrectGuessStreak = currentCorrectGuessStreak;
      }
    }
    else{
      // lettersMissed++; this is done in evalUserGuess()
      currentCorrectGuessStreak = 0;
    }
    //trap for divide by zero etc.
    if (lettersMissed > 0){
      percentGuessedRight = parseInt(lettersCorrect / (lettersCorrect + lettersMissed)*100);
    }
    else if(lettersCorrect > 0 && lettersMissed === 0){
      percentGuessedRight = 100;
    }
    else{
      percentGuessedRight = 0;
    }
    // is the game won?
    if(wordFindObj.foundLettersString.includes("*")){
      youWon = false;
    }
    else{
      youWon = true;
      firstGame = false;
      gameOver = true;
      gamesWon++;
    }
    //is the game lost
    if(guessesLeft===0){
      gameOver = true;
      firstGame = false;
      gamesLost++;
      youWon = false;
    }

    if (gamesWon > 0 && gamesLost === 0) {
      percentGamesWon  = 100;
    }
    else if (gamesLost > 0) {
      percentGamesWon = parseInt(gamesWon / (gamesWon + gamesLost)*100);
    }
    else  {
      percentGamesWon = 0;
    }
    outputStats();
    if (gameOver === true) {
      gameEnd(youWon);
    }

  }//end updateStats()

  function outputStats(){
    var gamesWonText = "<p id='gamesWonHtml'> You have Won " + gamesWon + " games</p>";
    if (gamesWon === 1 ) {
      gamesWonText = "<p id='gamesWonHtml'> You have Won " + gamesWon + " game</p>"
    };
    var gamesLostText = "<p id='gamesLostHtml'> You have lost " + gamesLost + " games </p>";
    if (gamesLost == 1) {
      gamesLostText = "<p id='gamesLostHtml'> You have lost " + gamesLost + " game </p>"
    };
    var percentGamesWonText = "<p id='percentGamesWonHtml'> Your game winning percentage = " +percentGamesWon+" %</p>";
    var currentCorrectStreakText = "<p id='currentCorrectStreakHtml'> You have currently guessed " + currentCorrectGuessStreak + " letters correctly in a row! </p>";
    if (currentCorrectGuessStreak === 1) {
      currentCorrectStreakText = "<p id='currentCorrectStreakHtml'> You have currently guessed " + currentCorrectGuessStreak + " letter correctly in a row! </p>"
    };
    var longestCorrectStreakText = "<p id='longestCorrectStreakHtml'>Your longest correct streak is " + longestCorrectGuessStreak + " letters  </p>";
    if (longestCorrectGuessStreak === 1) {
      longestCorrectStreakText = "<p id='longestCorrectStreakHtml'>Your longest correct streak is " + longestCorrectGuessStreak + " letter  </p>"
    }

    document.querySelector('#gamesWonHtml').innerHTML = gamesWonText;
    document.querySelector('#gamesLostHtml').innerHTML = gamesLostText;
    if (gamesWon > 0 || gamesLost > 0) {
      document.querySelector('#percentGamesWonHtml').innerHTML = percentGamesWonText;
    }
    document.querySelector('#currentCorrectStreakHtml').innerHTML = currentCorrectStreakText;
    document.querySelector('#longestCorrectStreakHtml').innerHTML = longestCorrectStreakText;

  }// end outputStats()

  function initilizeFirstSearchWord(){
    //this is the hard way!
    //need to add text file reader here.....
    gameWordsObj.gameArtistList = ['3 Doors Down',
                                   'Disturbed',
                                   'Red Sun Rising',
                                   'Bring Me The Horizon',
                                   'Muse',
                                   'SIXX:A.M.',
                                   'Five Finger Death Punch',
                                   'From Ashes To New',
                                   'Papa Roach',
                                   'Deftones'];
    gameWordsObj.gameWordList =['In The Dark',
                                'The Sound Of Silence',
                                'Emotionless',
                                'Happy Song',
                                'Reapers',
                                'Rise',
                                'My Nemesis',
                                'Through It All',
                                'Falling Apart',
                                'Prayers Triangles'];

    gameWordsObj.gameYouTubeList= ['https://www.youtube.com/watch?v=Ch6PtKm_w7w',
                                   'https://www.youtube.com/watch?v=u9Dg-g7t2l4',
                                   'https://www.youtube.com/watch?v=awyBrr0P69A',
                                   'https://www.youtube.com/watch?v=GBRAnuT48qo',
                                   'https://www.youtube.com/watch?v=gcNEC9NaJuE',
                                   'https://www.youtube.com/watch?v=gcNEC9NaJuE',
                                   'https://www.youtube.com/watch?v=heDGwljdmvM',
                                   'https://www.youtube.com/watch?v=5nSmdllDCtU',
                                   'https://www.youtube.com/watch?v=aqYnMSUTFGU',
                                   'https://www.youtube.com/watch?v=Aztiwn17vpE'];
    gameWordsObj.initAlreadyPlayNdx();
  }

  function gameEnd(youWon){

    var gameCmdText = "<h2 id='gameCmdHtml'>Press the Space Bar if you dare to play again</h2>"
    document.querySelector('#gameCmdHtml').innerHTML = gameCmdText;

    var jumbotronSubText = "";

    if (youWon) {
      jumbotronSubText = "<div id='jumbotronSubHtml' class='flash-grn-blk'>WINNER!! WINNER!! WINNER!! WINNER!! WINNER!! WINNER!! WINNER!!</div>"
      document.querySelector('#jumbotronSubHtml').innerHTML = jumbotronSubText;
    }
    else{
      jumbotronSubText = "<div id='jumbotronSubHtml' class='flash-red-blk'>LOSER!!LOSER!!LOSER!!LOSER!!LOSER!!LOSER!!LOSER!!</div>"
      document.querySelector('#jumbotronSubHtml').innerHTML = jumbotronSubText;
    }

  //jumbotronSubText = "<div id='jumbotronSubHtml' class='text-center '>Do you dare??</div>"
  //document.querySelector('#jumbotronSubHtml').innerHTML = jumbotronSubText;
  }

// end functions
}// end of scripts
