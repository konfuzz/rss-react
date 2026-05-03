import { Component } from "react";

interface Props {
  shouldThrow?: boolean;
}

export class TestErrorButton extends Component<Props> {
  state = { throwError: false };

  handleClick = () => {
    this.setState({ throwError: true });
  }

  render() {
    if (this.state.throwError) {
      throw new Error("Test error from button! Please reload the page.");
    }

    return (
      <button onClick={this.handleClick} className="test-error-btn">
        🧪 Simulate Error
      </button>
    );
  }
}