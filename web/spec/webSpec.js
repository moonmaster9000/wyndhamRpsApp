const ReactDOM = require("react-dom")
const React = require("react")


class PlayForm extends React.Component {
    constructor(){
        super()
        this.state = {}
    }

    invalid(){
        this.setState({message: "INVALID"})
    }

    tie(){
        this.setState({message: "TIE"})
    }

    displayWinner(player){
        this.setState({message: `${player} WINS!`})
    }

    handlePlayFormSubmit(){
        this.props.playRound(this.state.p1Throw, this.state.p2Throw, this)
    }

    captureInput(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return <div>
            {this.state.message}
            <input type="text" name="p1Throw" onChange={this.captureInput.bind(this)}/>
            <input type="text" name="p2Throw" onChange={this.captureInput.bind(this)}/>
            <button onClick={this.handlePlayFormSubmit.bind(this)}/>
        </div>
    }
}

describe("play form", function () {
    beforeEach(function () {
        setupDOM()
    })

    describe("when the playRound request tells us that the round was invalid", function () {
        beforeEach(function () {
            mountApp(function(p1Throw, p2Throw, ui){
                ui.invalid()
            })
        })

        it("then we display INVALID on the screen", function () {
            expect(pageText()).not.toContain("INVALID")

            submitForm()

            expect(pageText()).toContain("INVALID")
        })
    })

    describe("when the playRound request tells us that the round was tie", function () {
        beforeEach(function () {
            mountApp(function(p1Throw, p2Throw, ui){
                ui.tie()
            })
        })

        it("then we display TIE on the screen", function () {
            expect(pageText()).not.toContain("TIE")

            submitForm()

            expect(pageText()).toContain("TIE")
        })
    })

    describe("when the playRound request tells us that p1 wins", function () {
        beforeEach(function () {
            mountApp(function(p1Throw, p2Throw, ui){
                ui.displayWinner("p1")
            })
        })

        it("then we display p1 WINS! on the screen", function () {
            expect(pageText()).not.toContain("p1 WINS!")

            submitForm()

            expect(pageText()).toContain("p1 WINS!")
        })
    })

    describe("when the playRound request tells us that p2 wins", function () {
        beforeEach(function () {
            mountApp(function(p1Throw, p2Throw, ui){
                ui.displayWinner("p2")
            })
        })

        it("then we display p2 WINS! on the screen", function () {
            expect(pageText()).not.toContain("p2 WINS!")

            submitForm()

            expect(pageText()).toContain("p2 WINS!")
        })
    })

    it("sends the user input to playRound", function () {
        const playRoundSpy = jasmine.createSpy("playRoundSpy")

        mountApp(playRoundSpy)

        fillIn("p1Throw", "p1 throw")
        fillIn("p2Throw", "p2 throw")

        submitForm()

        expect(playRoundSpy).toHaveBeenCalledWith("p1 throw", "p2 throw", jasmine.any(Object))
    })

    function fillIn(inputName, inputValue) {
        let input = document.querySelector(`input[name='${inputName}']`)
        input.value = inputValue
        input.dispatchEvent(new Event("input", {bubbles: true, cancelable: false}))
    }


    afterEach(function () {
        teardownDOM()
    })

    function teardownDOM() {
        domFixture.remove()
    }

    let domFixture

    function setupDOM() {
        domFixture = document.createElement("div")
        domFixture.id = "testApp"
        document.querySelector("body").appendChild(domFixture)
    }

    function mountApp(playRound) {
        ReactDOM.render(
            <PlayForm playRound={playRound}/>,
            domFixture
        )
    }

    function pageText() {
        return domFixture.innerText;
    }

    function submitForm() {
        document.querySelector("button").click()
    }
})