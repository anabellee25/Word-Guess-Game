
	//using a variable and setting all it's attributes within it in order to use the "this" tag.
	
	var friendsHangman = {

     //array of answers
		friendsWords: [
			"chandler",
			"break", 
			"pivot!", 
			"phalange",
			"lobster", 
			"unagi", 
			"tribbiani",
			"smellycat", 
			"paleontologist",
			"masseuse",
			"centralperk", 
			"gunther", 
			"janice",
			"rachel",
			"phoebe",
			"monica",
			"ross",
		  ],

		currentLetter: "",  
		allGuesses: [],
		wrongGuesses: [],
		rightGuesses: [],
		rightGuessesInOrder: [],
		randomWordGen: "",
		eachLetter:[],
	
		isMatch: null,
		isRepeat: null,
	
		guessesLeft: 16,
		losses: 0,
		wins:0,

		// setting all my possible functions below
	
		generateWord: function(){
			//Generate a random index from my array
			var random_num = Math.random() * 17;
			random_num = Math.floor(random_num);
	
			//Assign randomWord to random_num
			this.randomWord = this.friendsWords[random_num];
			//splitting the letters of the random word into an array of letters
			this.eachLetter = this.randomWord.split("");
	
			console.log(this.randomWord + " " + this.eachLetter);
	
			// resetting the guesses array when there is a win/loss
			this.allGuesses = [];
			this.wrongGuesses = [];
			this.rightGuesses = [];
			this.rightGuessesInOrder = [];
			this.guessesLeft = 16;
		},
	   //checking if user repeats guesses
		checkRepeat: function(){
			var repeatCounter = -1;
	
			for (var i=0; i < this.allGuesses.length; i++){
				if (this.currentLetter == this.allGuesses[i]){
					repeatCounter++;
				}
			}

			if (repeatCounter == 0){
				this.isRepeat = false;
			}
			else{
				this.isRepeat = true;
			}
		},
		
		checkMatch: function(){
			var matchCounter = 0;

	       //if the user guesses a letter that is equal to a correct letter, the variable counts up one.
			for (var i=0; i < this.eachLetter.length; i++){
				if (this.currentLetter == this.eachLetter[i]){
					matchCounter++;
				}
			}
			//If counter is zero, the variable becomes false otherwise a match was found and isMatch becomes true.
			if (matchCounter == 0){
				this.isMatch = false;
			}
			else{
				this.isMatch = true;
			}
		},

		match_repeatComparison: function(){
			//If the same key is pressed twice, it is removed from allGuesses.
			if (this.isRepeat == true){
				this.allGuesses.pop(this.currentLetter);
			}
			//Letter has not been guessed and was a wrong guess, put the currentLetter in wrongGuesses variable.
			if (this.isRepeat == false && this.isMatch == false){
				this.wrongGuesses.push(this.currentLetter);
				this.guessesLeft--;
			}
			//Letter has not been guessed and was a correct guess, put the currentLetter in rightGuesses variable.
			if (this.isRepeat == false && this.isMatch == true){
				this.rightGuesses.push(this.currentLetter);
				this.guessesLeft--;
			}
		},
		revealAnswer: function(){
			//If there are no correctGuesses,
			//For the number of letters in the random word, fill the displayed guesses with an underscore.
			if (this.rightGuesses.length == 0){
				for (var i =0; i<this.eachLetter.length; i++){
					this.rightGuessesInOrder[i] = "_";
				}
			}
			else {
				
				for (var i=0; i<this.eachLetter.length; i++){
					//If the displayed guess is not the same as eachletter at index i,
					if (this.rightGuessesInOrder[i] != this.eachLetter[i]){
						//Loop for correctGuesses length number of times,
						for (var j=0; j<this.righttGuesses.length; j++){
							//If the correctGuesses at j is equal to eachLetter at i, the displayedGuess becomes the eachLetter at index i
							if (this.rightGuesses[j] == this.eachLetter[i]){
								this.rightGuessesInOrder[i] = this.eachLetter[i];
							}
							//Otherwise the displayedGuess at index i (corresponding to the word letter's indexes) becomes an underscore.
							else {
								this.rightGuessesInOrder[i] = "_";
							}
						}
					}
				}
			}
		  //using the document.getElementByID thing because the "CASHTAG" wasn't working for me
		  
			document.getElementById("current-word").innerHTML = this.rightGuessesInOrder.join(" ");
			document.getElementById("counter").innerHTML = ("Wins: " + this.wins + "  " + "Losses: " + this.losses);
			document.getElementById("letters-guessed").innerHTML = this.wrongGuesses;
			document.getElementById("guesses-left").innerHTML = this.guessesLeft;
		},

		// tracking wins and losses
		checkProgress: function(){
			var counter = 0;

			//Loop, if a guess is equal to the answer add 1 to the counter.
	
			for (var i=0; i<this.eachLetter.length; i++){
				if (this.rightGuessesInOrder[i] == this.eachLetter[i]){
					counter++;
				}
			}
	
			//If the counter is the length of the random word, the user has won.
			if (counter == this.eachLetter.length){
				alert("Unagi!");
				this.wins++;
				this.generateWord();
			}
			//If the number of guesses remaining is zero, the user has lost.
			if (this.guessesLeft == 0){
				alert("You lose!");
				this.losses++;
				this.generateWord();
			}
		}
	}
	
	var userStartedGame = false;
	
	// Calling all my functions into play 
	document.onkeyup = function() {
	
	//If the user presses the space key 
		if (friendsHangman.currentLetter == " " && userStartedGame == false){
	
	
			userStartedGame = true;
	
		}
	
		friendsHangman.allGuesses.push(friendsHangman.currentLetter);
	
		//Checks to see if the letter has been typed before.
		//Checks to see if the letter matches with one in the chosen random word.
		friendsHangman.checkRepeat();
		friendsHangman.checkMatch();
	
	
		//This function determines which array to push the currentLetter into.
		friendsHangman.match_repeatComparison();
	
	
		//Reveals the correct letter as it is being guessed.
		friendsHangman.revealAnswer();
		console.log(friendsHangman.rightGuessesInOrder);
	
		//Check to see if the game is still in progress
		friendsHangman.checkProgress();
	}
	
	