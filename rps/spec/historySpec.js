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

            const roundRepo = new FakeRoundRepo()

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