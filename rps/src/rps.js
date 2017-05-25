const Round = require("./Round")

function playRound(p1Throw, p2Throw, ui, roundRepo){
    determineResult()

    function determineResult(){
        if (isInvalid(p1Throw) || isInvalid(p2Throw)) {
            handleInvalidResult()
        } else if (isTie()){
            handleTieResult()
        } else if (doesP1Win()
        ){
            handleWinner("p1")
        } else {
            handleWinner("p2")
        }
    }

    function handleInvalidResult() {
        roundRepo.save(new Round(p1Throw, p2Throw, "invalid"))
        ui.invalid()
    }

    function handleTieResult() {
        roundRepo.save(new Round(p1Throw, p2Throw, "tie"))
        ui.tie()
    }

    function handleWinner(winner) {
        roundRepo.save(new Round(p1Throw, p2Throw, winner))
        ui.displayWinner(winner)
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