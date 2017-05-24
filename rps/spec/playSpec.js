function play(p1, p2, ui){
    if (!["rock", "paper", "scissors"].includes(p1) || !["rock", "paper", "scissors"].includes(p2)) {
        ui.invalid()
    } else if (p1 === p2){
        ui.tie()
    } else if (p1 === "rock"     && p2 === "scissors" ||
        p1 === "scissors" && p2 === "paper"    ||
        p1 === "paper"    && p2 === "rock"
    ){
        ui.displayWinner("p1")
    } else {
        ui.displayWinner("p2")
    }
}

describe("play", function () {
    let ui

    describe("win scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["displayWinner"])
        })

        it("rock versus scissors", function () {
            play("rock", "scissors", ui)

            expect(ui.displayWinner).toHaveBeenCalledWith("p1")
        })

        it("scissors versus rock", function () {
            play("scissors", "rock", ui)

            expect(ui.displayWinner).toHaveBeenCalledWith("p2")

        })

        it("scissors versus paper", function () {
            play("scissors", "paper", ui)

            expect(ui.displayWinner).toHaveBeenCalledWith("p1")
        })

        it("paper versus scissors", function () {
            play("paper", "scissors", ui)

            expect(ui.displayWinner).toHaveBeenCalledWith("p2")
        })

        it("paper versus rock", function () {
            play("paper", "rock", ui)

            expect(ui.displayWinner).toHaveBeenCalledWith("p1")
        })

        it("rock versus paper", function () {
            play("rock", "paper", ui)

            expect(ui.displayWinner).toHaveBeenCalledWith("p2")
        })
    })

    describe("tie scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["tie"])
        })

        it("rock v. rock", function () {
            play("rock", "rock", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("paper v. paper", function () {
            play("paper", "paper", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("scissors v. scissors", function () {
            play("scissors", "scissors", ui)

            expect(ui.tie).toHaveBeenCalled()
        })
    })

    describe("invalid scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["invalid"])
        })

        it("invalid throw versus valid throw", function () {
            play(Math.random(), "rock", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("valid throw versus invalid throw", function () {
            play("rock", Math.random(), ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("invalid throw versus the same invalid throw", function () {
            play("sailboat", "sailboat", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })
    })
})