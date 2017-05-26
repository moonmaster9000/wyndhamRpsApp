const Round = require("./Round")

const RPS = function(roundRepo){
    this.history = function (ui){
        if (roundRepo.isEmpty()){
            ui.noRounds()
        } else {
            ui.rounds(roundRepo.findAll())
        }
    }

    this.playRound = function (p1Throw, p2Throw, ui){
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

        function handleInvalidResult() {
            recordRound("invalid")
            ui.invalid()
        }

        function handleTieResult() {
            recordRound("tie")
            ui.tie()
        }

        function handleWinner(winner) {
            recordRound(winner)
            ui.displayWinner(winner)
        }

        function recordRound(result) {
            roundRepo.recordRound(new Round(p1Throw, p2Throw, result))
        }
    }


}


module.exports = {
    RPS,
    Round
}