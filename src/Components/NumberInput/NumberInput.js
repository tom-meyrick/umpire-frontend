import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class NumberInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noPlayers: 2,
      referrer: null,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  //Increment noPlayers - 32 is an arbitrary figure, can be scaled up indefinitely (you might get tired of typing though)

  increment() {
    this.setState({
      noPlayers:
        this.state.noPlayers < 32
          ? this.state.noPlayers * 2
          : this.state.noPlayers,
    });
  }

  //Decrement noPlayers - 2 is set as the lowest value

  decrement() {
    this.setState({
      noPlayers: this.state.noPlayers > 2 ? this.state.noPlayers / 2 : 2,
    });
  }

  // Passes the number of players to setPlayers reducer, reset local state,
  // clears dataFlow array and redirects to /players
  handleClick = (e) => {
    e.preventDefault();
    this.props.handleSubmit({ ...this.state });
    this.setState({
      noPlayers: 2,
    });
    this.props.handleClear();
    this.setState({ referrer: "/players" });
  };

  render() {
    const { noPlayers, referrer } = this.state;
    if (referrer) return <Redirect to={referrer} />;
    return (
      <>
        <div className=" inline-block flex justify-center mt-30">
          <div className="flex-col">
            <div>
              <span className="text-6xl px-10">{noPlayers}</span>
            </div>
            <div className="pt-8 pb-8">
              {/* Decrement button */}
              <button
                className="h-10 w-10 text-2xl m-4"
                onClick={this.decrement}
              >
                -
              </button>
              {/* Increment button */}
              <button
                className="h-10 w-10 text-2xl m-4"
                onClick={this.increment}
              >
                +
              </button>
            </div>
            {/* Submit button and handler */}
            <button
              className="m-6 block bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-55"
              onClick={this.handleClick}
            >
              Submit
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default NumberInput;
