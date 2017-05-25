const { playRound, Round } = require("../src/rps")

function history(ui, roundRepo){
    if (roundRepo.isEmpty()){
        ui.noRounds()
    } else {
        ui.rounds(roundRepo.findAll())
    }
}

describe("history", function () {
    fdescribe("when rounds have been played", function () {
        it("then it sends the rounds to the UI", function () {
            const ui = jasmine.createSpyObj("ui", ["rounds", "displayWinner"])

            const roundRepo = {
                isEmpty(){},
                findAll(){},
                save(){}
            }

            playRound("rock", "scissors", ui, roundRepo)

            history(ui, roundRepo)

            expect(ui.rounds).toHaveBeenCalledWith([
                new Round("rock", "scissors", "p1")
            ])
        })

    })

    describe("when no rounds have been played", function () {
        it("then it tells the UI noRounds", function () {
            const ui = jasmine.createSpyObj("ui", ["noRounds"])

            history(ui)

            expect(ui.noRounds).toHaveBeenCalled()
        })
    })
})