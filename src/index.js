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
      xIsNext: true, // defaults the first move to be by 'X'
    };
  }

  // When click in a squares to fill them, the state is stored in the Board component
  // rather than in each Square
  handleClick(i) {
    const squares = this.state.squares.slice(); // Call .slice() to copy the squares array instead of mutating the existing array
    
    // Return early and ignore the click if someone has already won the game or if a square is already filled in
    if(calculateWinner(squares) || squares[i]){
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O'; // Alternates each turn between X and O 
    
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext, // Sets the state to the opposite boolean value that xIsNext is currently
    });
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
    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner){
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for(let i=0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
