import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// Square no longer keeps its own state; 
// It receives its value from its parent Board and informs its parent when it's clicked. 
    // Componenets like this are called 'Controlled Components'
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // Constructor to initialize the state
  constructor(props) {
    super(props); // Need to explicitly call super() when defining the constructor of a subclass
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  // When click in a squares to fill them, the state is stored in the Board component
  // rather than in each Square
  handleClick(i) {
    const squares = this.state.squares.slice(); // Call .slice() to copy the squares array instead of mutating the existing array
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
