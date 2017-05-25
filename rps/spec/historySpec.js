const { playRound, Round } = require("../src/rps")

function history(ui, roundRepo){
    if (roundRepo.isEmpty()){
        ui.noRounds()
    } else {
        ui.rounds(roundRepo.findAll())
    }
}

fdescribe("history", function () {
    describe("when rounds have been played", function () {
        it("then it sends the rounds to the UI", function () {
            const ui = jasmine.createSpyObj("ui", ["rounds", "displayWinner", "tie", "invalid"])

            const roundRepo = new FakeRoundRepo()

            playRound("rock", "scissors", ui, roundRepo)
            playRound("scissors", "rock", ui, roundRepo)
            playRound("rock", "rock", ui, roundRepo)
            playRound("rock", "sailboat", ui, roundRepo)

            history(ui, roundRepo)

            expect(ui.rounds).toHaveBeenCalledWith([
                new Round("rock", "scissors", "p1"),
                new Round("scissors", "rock", "p2"),
                new Round("rock", "rock", "tie"),
                new Round("rock", "sailboat", "invalid")
            ])
        })

    })

    describe("when no rounds have been played", function () {
        it("then it tells the UI noRounds", function () {
            const ui = jasmine.createSpyObj("ui", ["noRounds"])
            const roundRepo = new FakeRoundRepo()

            history(ui, roundRepo)

            expect(ui.noRounds).toHaveBeenCalled()
        })
    })
})


const FakeRoundRepo = function(){
    let rounds = []

    this.isEmpty = function(){
        return rounds.length === 0
    }

    this.save = function(round){
        rounds.push(round)
    }

    this.findAll = function(){
        return rounds
    }
}

describe("round Repo", function () {
    let roundRepo

    beforeEach(function () {
        roundRepo = new FakeRoundRepo()
    })

    it("is empty when nothing has been saved", function () {
        expect(roundRepo.isEmpty()).toBe(true)
    })

    it("is not empty when rounds have been saved", function () {
        roundRepo.save(new Round())

        expect(roundRepo.isEmpty()).toBe(false)
    })

    it("returns all rounds that have been saved", function () {
        let round = new Round(Math.random())

        roundRepo.save(round)

        expect(roundRepo.findAll()).toEqual([round])
    })

})