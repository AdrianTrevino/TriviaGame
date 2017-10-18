// Start button to start the game, linking to a function to "game start"
$('#startButton').on('click', function() {
    game.start();
})

//Reset Button linking to "Reload" which will restart the game. On click function.
$(document).on('click', '#reset', function() {
    location.reload();
})

//Submit button linking to a function to "done" which will mark the game over. On click function.
$(document).on('click', '#submit', function() {
    game.finished();
})

// all previous functions target the document, with the exception to start.


//All the questions inside a variable object that has the right answers written in texts.
// Using this variable in my logic later to check back the answers and cross reference.
var questions = [{
//Question 1
    question: "In the children's book series, where is Paddington Bear originally from?",
    answers: [" India ", " Peru ", " Canada ", " Iceland "],
    correctAnswer: " Peru ",
}, {
//Question 2
    question: "What letter must appear at the beginning of the registration number of all non-military aircraft in the U.S.?",
    answers: [" N ", " A ", " U ", " L "],
    correctAnswer: " N ",
}, {
//Question 3
    question: "'Nephelococcygia' is the practice of doing what?",
    answers: [" Finding Shapes in Clouds ", " Sleeping with your eyes open ", " Breaking glass with your voice ", " Swimming in freezing water "],
    correctAnswer: " Finding Shapes in Clouds "
}, {
//Question 4   
    question: " Which insect shorted out an early supercomputer and inspired the term 'computer bug'?",
    answers: [" Roach ", " Fly ", " Moth ", " Beetle "],
    correctAnswer: " Moth ",
}, {
//Question 5
    question: "Which of these U.S. presidents appeared on the television series Laugh-In?",
    answers: [" Lyndon Johnson ", " Richard Nixon ", " Jimmy Carter ", " Donald Trump "],
    correctAnswer: " Richard Nixon ",
}, {
//Question 6
    question: " What is the first name of George W. Bush? ",
    answers: [" Edmund ", " George ", " Jose ", " Marcus "],
    correctAnswer: " George "
}];

//Counter for the game that will display the correct incorrect and counter numbers in the game
var game = {
    correct: 0,
    incorrect: 0,
    counter: 70,
    
//This start button declares the start function. This will also load the questions on the page
    start: function() {
        timer = setInterval(game.countdown, 1000);
        $('.time-left').prepend('<h2>Time Remaining: <span id="counter"> 70</span> Seconds</h2>');
        //remove the start button here from view
        $(".start-button").remove();
        //for loop to append the questions on the page using an <h2> tag.
        for (var i = 0; i < questions.length; i++) {
            $('.questions').append('<h2>' + questions[i].question + '</h2>');
            //for loop to append answers underneath questions using radio buttons.
            for (var j = 0; j < questions[i].answers.length; j++) {
                $(".questions").append("<input type='radio' name='question-" + i + "'value ='" + questions[i].answers[j] + "'>" + questions[i].answers[j])
            }
        }
        // creating a button to put underneath the "questions" class. It's for my submit.
        $(".questions").append('<br><br><button class="btn btn-secondary btn-md" id="submit">Submit</button>');

    },
//checking for correct answers. This part took me forever, I had to do heavy research here to get this to work. Thank you Rachel for the guidance!
// if else statements add to the correct or incorrect answer counter if conditional is met. 
    finished: function() {
        $.each($("input[name='question-0']:checked"), function() {
                if ($(this).val() == questions[0].correctAnswer) {
                game.correct++;
                } else {
                 game.incorrect++;
                }
            }),
            $.each($("input[name='question-1']:checked"), function() {
                if ($(this).val() == questions[1].correctAnswer) {
                 game.correct++;
                } else {
                 game.incorrect++;
                }
            }),
            $.each($("input[name='question-2']:checked"), function() {
                if ($(this).val() == questions[2].correctAnswer) {
                game.correct++;
                } else {
                game.incorrect++;
                }
            }),
            $.each($("input[name='question-3']:checked"), function() {
                if ($(this).val() == questions[3].correctAnswer) {
                 game.correct++;
                } else {
                 game.incorrect++;
                }
            }),
            $.each($("input[name='question-4']:checked"), function() {
                if ($(this).val() == questions[4].correctAnswer) {
                 game.correct++;
                } else {
                 game.incorrect++;
                }
            }),

            $.each($("input[name='question-5']:checked"), function() {
                if ($(this).val() == questions[5].correctAnswer) {
                 game.correct++;
                } else {
                 game.incorrect++;
                }
            });

        this.results();
    },

    //Function to get the counter working. Counter logic removing time from the in game counter.
    countdown: function() {
        game.counter--;
        $('#counter').html(game.counter);
        //if statement explaining what to do when the game counter equals 0. (run finished function from earlier.)
        if (game.counter <= 0) {
            game.finished();
        }
    },

//Using jquery I am appending direct HTML into my classes from my HTML. I do this at the end to show the results of the game.
	results: function() 
    /// using clearInterval like in class to reset the timer.
    {
        clearInterval(timer);
        //removing the time left and questions part that I appended earlier to make way for cleaner results.
        $('.questions').remove();
        $('.time-left').remove();
        $('.results').append("<h3>Correct: " + this.correct + "</h3>");
        $('.results').append("<h3>Incorrect: " + this.incorrect + "</h3>");
        $('.results').append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    //creating another button for "reset" that links to my reset function.   
        $(".results").append('<br><button class="btn btn-secondary btn-md" id="reset">RESET</button>');

    }
}