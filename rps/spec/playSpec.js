const { RPS } = require("../src/rps")
const FakeRoundRepo = require("./FakeRoundRepo")

describe("playRound rules", function () {
    let ui, rps

    beforeEach(function () {
        rps = new RPS(new FakeRoundRepo())
    })

    describe("win rules", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["displayWinner"])
        })

        it("rock versus scissors", function () {
            rps.playRound("rock", "scissors", ui)

            expect(ui.displayWinner).toHaveBeenCalledWith("p1")
        })

        it("scissors versus rock", function () {
            rps.playRound("scissors", "rock", ui)

            expect(ui.displayWinner).toHaveBeenCalledWith("p2")

        })

        it("scissors versus paper", function () {
            rps.playRound("scissors", "paper", ui)

            expect(ui.displayWinner).toHaveBeenCalledWith("p1")
        })

        it("paper versus scissors", function () {
            rps.playRound("paper", "scissors", ui)

            expect(ui.displayWinner).toHaveBeenCalledWith("p2")
        })

        it("paper versus rock", function () {
            rps.playRound("paper", "rock", ui)

            expect(ui.displayWinner).toHaveBeenCalledWith("p1")
        })

        it("rock versus paper", function () {
            rps.playRound("rock", "paper", ui)

            expect(ui.displayWinner).toHaveBeenCalledWith("p2")
        })
    })

    describe("tie rules", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["tie"])
        })

        it("rock v. rock", function () {
            rps.playRound("rock", "rock", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("paper v. paper", function () {
            rps.playRound("paper", "paper", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("scissors v. scissors", function () {
            rps.playRound("scissors", "scissors", ui)

            expect(ui.tie).toHaveBeenCalled()
        })
    })

    describe("invalid rules", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["invalid"])
        })

        it("invalid throw versus valid throw", function () {
            rps.playRound(Math.random(), "rock", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("valid throw versus invalid throw", function () {
            rps.playRound("rock", Math.random(), ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("invalid throw versus the same invalid throw", function () {
            rps.playRound("sailboat", "sailboat", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })
    })
})