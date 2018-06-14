// bit.ly/s-pcs
var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

//Used Bootstrap, Fontawesome and some CSS
const Stars = (props) => {
  // const numberOfStars = 1 + Math.floor(Math.random()*9);
  
  // let stars = [];
  // for (let i = 0; i < numberOfStars; i++) {
  //  stars.push(<i key={i} className="fa fa-star" />);
  // }
  return (
    <div className="col-5">
      {_.range(props.numberOfStars).map(i =>
      <i key={i} className="fa fa-star" />)}
    </div>
  );
}

const Button = (props) => {
  let button;
  switch(props.isAnswerCorrect) {
    case true:
      button =
        <button className="btn btn-success" onClick={props.acceptAnswer} >
          <i className="fa fa-check" />
        </button>;
      break;
    case false:
      button = 
       <button className="btn btn-danger" >
          <i className="fa fa-times" />
        </button>;
      break;
    default:
      button =
        <button className="btn"
                onClick={props.checkAnswer}
                disabled= {props.selectedNumbers.length === 0} >
          =
        </button>;
      break;
  }
  return (
    <div className="col-2">
      {button}
      <br /><br />
      <button className="btn btn-sm btn-warning" onClick={props.redraw} 
              disabled={props.numberOfRedraws === 0} >
        <i className="fa fa-sync-alt" /> {props.numberOfRedraws}
      </button>
    </div>
  );
};

const Answer = (props) => {
  return (
    <div className="col-5">
      {props.selectedNumbers.map((number, i) => 
      <span key={i} onClick={() => (props.unselectNumber(number))} >{number}</span>)}
    </div>
  );
}

const Numbers = (props) => {

  // const arrayOfNumbers = _.range(1,10);
  const numberClassName = (number) => {
    if (props.usedNumbers.indexOf(number) >= 0) {
      return 'used';
    }
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return 'selected';
    }
  }
  return (
    <div className="card text-center">
      <div>
        {Number.list.map((number, i) => 
        <span key={i} className={numberClassName(number)} 
              onClick={() => (props.selectNumber(number))}>
          {number}
        </span>)}
      </div>
    </div>
  );
}

const DoneFrame = (props) => {
  return (
    <div className="text-center">
      <h2>{props.doneStatus}</h2>
      <button className="btn btn-secondary" onClick={props.resetGame} >
        Play Again
      </button>
    </div>
  );
}

class Game extends React.Component {
  static randomNumber = () => 1 + Math.floor(Math.random()*9);
  static initialState = () => ({
    selectedNumbers: [],
    randomNumberOfStars: Game.randomNumber(),
    isAnswerCorrect: null,
    usedNumbers: [],
    numberOfRedraws: 5,
    doneStatus: null,
  });
  state = Game.initialState();
  resetGame = () => {
    this.setState(Game.initialState());
  };
  
  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
      isAnswerCorrect: null,
    }));
  };
  unselectNumber = (clickedNumber) => {
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber),
      isAnswerCorrect: null,
    }));
  };
  checkAnswer = () => {
    this.setState(prevState => ({
      isAnswerCorrect: prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
  };
  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      isAnswerCorrect: null,
      randomNumberOfStars: Game.randomNumber(),
    }), this.updateDoneStatus);
  };
  redraw = () => {
    if (this.state.numberOfRedraws === 0) { return; }
    this.setState(prevState => ({
      randomNumberOfStars: Game.randomNumber(),
      isAnswerCorrect: null,
      selectedNumbers: [],
      numberOfRedraws: prevState.numberOfRedraws - 1
    }), this.updateDoneStatus);
  }
  
  possibleSolutions = ({randomNumberOfStars, usedNumbers}) => {
    const possibleNumbers = _.range(1,10).filter(number =>
      usedNumbers.indexOf(number) === -1
    );
    
    return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
  }
  updateDoneStatus = () => {
    this.setState(prevState => {
      if (prevState.usedNumbers.length === 9) {
        return {doneStatus: 'Allohe, KRASAVCHIK!'};
      }
      if (prevState.numberOfRedraws === 0 && !this.possibleSolutions(prevState)) {
        return { doneStatus: 'Game Over! Looser...'};
      }
    });
  }

  render () {
    const { randomNumberOfStars, 
            selectedNumbers, 
            isAnswerCorrect,
            usedNumbers,
            numberOfRedraws,
            doneStatus, } = this.state;
    return (
      <div className="container">
        <h3>Play Game</h3>
        <div className="row">
          <Stars numberOfStars={randomNumberOfStars} />
          <Button selectedNumbers={selectedNumbers}
                  checkAnswer={this.checkAnswer}
                  acceptAnswer={this.acceptAnswer}
                  redraw={this.redraw}
                  isAnswerCorrect={isAnswerCorrect}
                  numberOfRedraws={numberOfRedraws} />
          <Answer selectedNumbers={selectedNumbers}
                  unselectNumber={this.unselectNumber} />
        </div>
        <br />
        {doneStatus ? 
            <DoneFrame resetGame={this.resetGame} doneStatus={doneStatus} /> :
            <Numbers selectedNumbers={selectedNumbers} 
                 selectNumber={this.selectNumber}
                 usedNumbers={usedNumbers} />
        }
      </div>
    );
  }
}

class App extends React.Component {
  render () {
    return (
      <div>
        <Game />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);