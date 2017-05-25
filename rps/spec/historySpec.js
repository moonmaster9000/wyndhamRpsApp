const { RPS, Round } = require("../src/rps")

const FakeRoundRepo = require("./FakeRoundRepo")

describe("history", function () {
    describe("when rounds have been played", function () {
        it("then it sends the rounds to the UI", function () {
            const ui        = jasmine.createSpyObj("ui", ["rounds", "displayWinner", "tie", "invalid"])
            const roundRepo = new FakeRoundRepo()
            const rps       = new RPS(roundRepo)

            rps.playRound("rock", "scissors", ui)
            rps.playRound("scissors", "rock", ui)
            rps.playRound("rock", "rock", ui)
            rps.playRound("rock", "sailboat", ui)

            rps.history(ui)

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
            const roundRepo = new FakeRoundRepo()
            const rps = new RPS(roundRepo)
            const ui = jasmine.createSpyObj("ui", ["noRounds"])

            rps.history(ui)

            expect(ui.noRounds).toHaveBeenCalled()
        })
    })
})

function roundRepoContract(roundRepoClass){
    describe("round Repo", function () {
        let roundRepo

        beforeEach(function () {
            roundRepo = new roundRepoClass()
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
}

roundRepoContract(FakeRoundRepo)