const Round = require("./Round")

function playRound(p1Throw, p2Throw, ui, roundRepo){
    determineResult()

    function determineResult(){
        if (isInvalid(p1Throw) || isInvalid(p2Throw)) {
            ui.invalid()
        } else if (isTie()){
            ui.tie()
        } else if (doesP1Win()
        ){
            roundRepo.save(new Round(p1Throw, p2Throw, "p1"))
            ui.displayWinner("p1")
        } else {
            ui.displayWinner("p2")
        }
    }

    function isInvalid(t) {
        const VALID_THROWS = ["rock", "paper", "scissors"]

        return !VALID_THROWS.includes(t)
    }

    function doesP1Win() {
        return p1Throw === "rock" && p2Throw === "scissors" ||
            p1Throw === "scissors" && p2Throw === "paper" ||
            p1Throw === "paper" && p2Throw === "rock"
    }

    function isTie() {
        return p1Throw === p2Throw
    }
}

module.exports = {
    playRound,
    Round
}