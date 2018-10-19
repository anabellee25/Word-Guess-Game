
	let currentLetter ="";
	let allGuesses = [];
	let wrongGuess = [];
	let rightGuess = [];
	let rightGuessInOrder = [];

	let friendsWords = [
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
  ];
  
	let randomWord = "";
	let friendsLetters =[];

	let isMatch = null;
	let isRepeat = null;

	let guessesRemaining= 12;
	let loseCount = 0;
  let winCount = 0;

	let generateWord  = (function(){
		var random_num = Math.random() * 17;
		random_num = Math.floor(random_num);

		this.randomWord = this.friendsWords[random_num];
		this.friendsLetters = this.randomWord.split("");

	
		this.allGuesses = [];
		this.wrongGuess = [];
		this.rightGuesses = [];
		this.rightGuessesInOrder = [];
		this.guessesRemaining = 12;
	});

	let checkRepeat = (function(){
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
	});
	let checkMatch = (function(){
		var matchCounter = 0;

		for (var i=0; i < this.friendsLetters.length; i++){
			if (this.currentLetter == this.friendsLetters[i]){
				matchCounter++;
			}
		}
		
		if (matchCounter == 0){
			this.isMatch = false;
		}
		else{
			this.isMatch = true;
		}
	});
	let match_repeatComparison = (function(){
		
		if (this.isRepeat == true){
			this.allGuesses.pop(this.currentLetter);
		}
	
		if (this.isRepeat == false && this.isMatch == false){
			this.wrongGuess.push(this.currentLetter);
			this.guessesRemaining--;
		}
	
		if (this.isRepeat == false && this.isMatch == true){
			this.rightGuess.push(this.currentLetter);
			this.guessesRemaining--;
		}
	});
	let showGuess = (function(){

		if (this.rightGuess.length == 0){
			for (var i =0; i<this.friendsLetters.length; i++){
				this.rightGuessInOrder[i] = "_";
			}
		}
		else {
			for (var i=0; i<this.friendsLetters.length; i++){
			
				if (this.rightGuessInOrder[i] != this.friendsLetters[i]){
					
					for (var j=0; j<this.rightGuess.length; j++){

						if (this.rightGuess[j] == this.friendsLetters[i]){
							this.rightGuessInOrder[i] = this.friendsLetters[i];
						}
					
						else {
							this.rightGuessInOrder[i] = "_";
						}
					}
				}
			}
		}

		$("#current-word").html(this.rightGuessInOrder.join(" "));
		$("#counter").html("Wins: " + this.winCount + "  " + "Losses: " + this.loseCount);
		$("#letters-guessed").html(this.wrongGuess);
		$("#guesses-remaining").html(this.guessesRemaining);
  }); 
  
	let checkProgress = (function(){
		var counter = 0;


		for (var i=0; i<this.friendsLetters.length; i++){
			if (this.rightGuessInOrder[i] == this.friendsLetters[i]){
				counter++;
			}
		}

		if (counter == this.friendsLetters.length){
			alert("You win");
			this.winCount++;
			this.generateWord();
		}
	
		if (this.guessesRemaining == 0){
			alert("You lose!");
			this.loseCount++;
			this.generateWord();
		}
	});

var userStartedGame = false;


document.onkeyup = function(q) {

	if (currentLetter == " " && userStartedGame == false){
		generateWord();

		userStartedGame= true;

	}

	allGuesses.push(currentLetter);
}
