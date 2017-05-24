const ReactDOM = require("react-dom")
const React = require("react")


class PlayForm extends React.Component {
    constructor(){
        super()
        this.state = {}
    }

    handlePlayFormSubmit(){
        this.setState({message: "INVALID"})
    }

    render(){
        return <div>
            {this.state.message}
            <button onClick={this.handlePlayFormSubmit.bind(this)}></button>
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