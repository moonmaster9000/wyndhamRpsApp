function play(p1, p2, ui){
    determineOutcome()

    function determineOutcome(){
        if (invalid(p1) || invalid(p2)) {
            ui.invalid()
        } else if (tie()){
            ui.tie()
        } else if (p1Wins()
        ){
            ui.displayWinner("p1")
        } else {
            ui.displayWinner("p2")
        }
    }

    function invalid(t) {
        const VALID_THROWS = ["rock", "paper", "scissors"]

        return !VALID_THROWS.includes(t)
    }

    function p1Wins() {
        return p1 === "rock" && p2 === "scissors" ||
            p1 === "scissors" && p2 === "paper" ||
            p1 === "paper" && p2 === "rock"
    }

    function tie() {
        return p1 === p2
    }
}

module.exports = {
    play
}