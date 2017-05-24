const { playRound } = require("../src/rps")

describe("playRound rules", function () {
    let ui

    describe("win rules", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["displayWinner"])
        })

        it("rock versus scissors", function () {
            playRound("rock", "scissors", ui)

            expect(ui.displayWinner).toHaveBeenCalledWith("p1")
        })

        it("scissors versus rock", function () {
            playRound("scissors", "rock", ui)

            expect(ui.displayWinner).toHaveBeenCalledWith("p2")

        })

        it("scissors versus paper", function () {
            playRound("scissors", "paper", ui)

            expect(ui.displayWinner).toHaveBeenCalledWith("p1")
        })

        it("paper versus scissors", function () {
            playRound("paper", "scissors", ui)

            expect(ui.displayWinner).toHaveBeenCalledWith("p2")
        })

        it("paper versus rock", function () {
            playRound("paper", "rock", ui)

            expect(ui.displayWinner).toHaveBeenCalledWith("p1")
        })

        it("rock versus paper", function () {
            playRound("rock", "paper", ui)

            expect(ui.displayWinner).toHaveBeenCalledWith("p2")
        })
    })

    describe("tie rules", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["tie"])
        })

        it("rock v. rock", function () {
            playRound("rock", "rock", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("paper v. paper", function () {
            playRound("paper", "paper", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("scissors v. scissors", function () {
            playRound("scissors", "scissors", ui)

            expect(ui.tie).toHaveBeenCalled()
        })
    })

    describe("invalid rules", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["invalid"])
        })

        it("invalid throw versus valid throw", function () {
            playRound(Math.random(), "rock", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("valid throw versus invalid throw", function () {
            playRound("rock", Math.random(), ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("invalid throw versus the same invalid throw", function () {
            playRound("sailboat", "sailboat", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })
    })
})