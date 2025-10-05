const database1 = [
    {
        question : "What item is affected by gravity?",
        options : ["Bed","Gravel","Bookshelf","Furnace"],
        answer : "Gravel"
    },

    {
        question : "What item breaks your fall damage completely?",
        options : ["Hay Bales","Bed","Water","Leaves"],
        answer : "Water"
    },

    {
        question : "What item is found in the End?",
        options : ["Netherack","Glowstone","Bricks","Shulker Box"],
        answer : "Shulker Box"
    },

    {
        question : "What is found in the Nether?",
        options : ["Piglin","Vindigator","Endermites","None of the above"],
        answer : "Piglin"
    },

    {
        question : "What is the strongest sword?",
        options : ["Iron","Gold","Diamond","Netherite"],
        answer : "Netherite"
    },

    {
        question : "What explodes?",
        options : ["Creeper","Silver Fish","Hoglin","Pillages"],
        answer : "Creeper"
    },

    {
        question : "Which mob is passive?",
        options : ["Villager","Hoglin","Ender Dragon","Spider"],
        answer : "Villager"
    },

];



const DropDown = document.getElementById("drop-down");
const StartButton = document.getElementById("start-btn");
const TimerLabel = document.getElementById("timer-label");
const QuestionLabel = document.getElementById("question");
const OptionContainer = document.getElementById("option-container");
const ScoreLabel = document.getElementById("score-label");
const feedbackLabel = document.getElementById("feedback-label");
const ProgressBar = document.getElementById("progress-bar-fill");
const BgmDropdown = document.getElementById("bgm-dropdown");
const BgmButton = document.getElementById("music_btm");

let CurrentSong = null;
let IsBgmPlaying = false;

// on bgm dropdown change
BgmDropdown.addEventListener('change', () => {
    
    const SelectedSong = BgmDropdown.value;

    // abort the function if the song cannot be found
    if(!SelectedSong) return;

    // stop and reset previous song if it exists
    if(CurrentSong)
    {
        CurrentSong.pause();
        CurrentSong.currentTime = 0;
    }

    // load and play the new song
    CurrentSong = new Audio(SelectedSong);
    CurrentSong.loop = true;
    CurrentSong.volume = 0.2;
    CurrentSong.play();
    IsBgmPlaying = true;
    BgmButton.textContent = "🔊 Music On";

});

BgmButton.addEventListener('click',() => {
    if(IsBgmPlaying)
    {
        CurrentSong.pause();
        BgmButton.textContent = "🔇 Music Off"
        IsBgmPlaying = false;
    }else
    {
        CurrentSong.play();
        BgmButton.textContent = "🔊 Music On"
        IsBgmPlaying = true;
    }
});


StartButton.addEventListener('click', StartQuiz)

let timer;
let question_index = 0;
let score = 0;



function StartQuiz()
{
    DropDown.style.display = 'none';
    StartButton.style.display = 'none';
    LoadQuestion();
}

function LoadQuestion()
{
    if(question_index < database1.length)
    {
        // reset the timer
        TimerLabel.textContent = 15;

        feedbackLabel.textContent = "";

        //adjust progress bar width
        ProgressBar.style.width = `${((question_index + 1) / database1.length) * 100}%`;

        // Load a question from the database
        const CurrentQuestionSet = database1[question_index];
        QuestionLabel.textContent = CurrentQuestionSet.question;

        // remove previous option buttons
        OptionContainer.innerHTML = "";

        // create option buttons
        CurrentQuestionSet.options.forEach((item) => {
            const button = document.createElement("button");
            button.textContent = item;
            button.classList.add('option-btn')
            OptionContainer.appendChild(button);

            button.addEventListener('click', () => {
                DisableAllOptionButtons();
                CheckAnswer(item);
            });
        });


        //turn on the timer
        timer = setInterval(() => {
            TimerLabel.textContent = parseInt(TimerLabel.textContent) - 1

            if(parseInt(TimerLabel.textContent) === 0)
            {
                clearInterval(timer); // turn off the timer
                CheckAnswer(null)
            }

        },1000); 
    } else {
        EndQuiz();
    }
}

function EndQuiz()
{
    if(score < 4)
    {
        QuestionLabel.textContent = "Please try again! You scored below minimum score.";
    }
    else
    {
        QuestionLabel.textContent = "⭐Well done! You completed the quiz!⭐";
    }

    OptionContainer.style.display = 'none';
    feedbackLabel.style.display = 'none';
}

function DisableAllOptionButtons()
{
    const all_option_buttons = document.querySelectorAll('.option-btn');

    all_option_buttons.forEach(button => {
        button.disabled = true;
    });
}   


// item - the player selected option
function CheckAnswer(item)
{
    clearInterval(timer);
    const CurrentQuestionSet = database1[question_index];

    if (item === CurrentQuestionSet.answer)
    {
        score = score = 1;
        message = `Correct! You scored 1 point!`;
    } else if  (item === null)
    {
        message = `Time's up!`;
    } else
    {
        message = `Sorry, your answer is incorrect.`;
    }

    ScoreLabel.textContent = `You scored ${score} points`;
    feedbackLabel.textContent = message;

    // to hold for 2 seconds
    setTimeout (() => {
        question_index = question_index + 1
        LoadQuestion();
    }, 2000)
}

