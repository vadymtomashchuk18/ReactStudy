// Write JavaScript here and press Ctrl+Enter to execute
class Button extends React.Component {
  
  handleClick = () => {
   this.props.onClickFunction(this.props.value);
  }
  
  render () {
    return (
      <button onClick={this.handleClick}>{this.props.label}{this.props.value}</button>
    );
  }
}

const Result = (props) => {
  return (
    <div>
      {props.counter}
    </div>
  );
} 

class App extends React.Component {
  // constructor (props) {
  // super(props);
  // this.state = {counter : 0}
  // }
  
  state = {counter : 0};
  
  incrementCounter = (value) => {
    this.setState((prevState) => ({
      counter: prevState.counter + value
    }));
  };
  
  decrementCounter = (value) => {
    this.setState((prevState) => ({
      counter : prevState.counter - value
    }));
  }
  
  resetCounter = () => {
    this.setState((prevState) => ({
      counter : 0
    }));
  }
  
  render () {
    return (
      <div>
        <Button label="-" value={1} onClickFunction={this.decrementCounter} />
        <Button label="-" value={5} onClickFunction={this.decrementCounter} />
        <Button label="-" value={10} onClickFunction={this.decrementCounter} />
        <Button label="-" value={100} onClickFunction={this.decrementCounter} />
        <Result counter={this.state.counter}/>
        <Button label="+" value={1} onClickFunction={this.incrementCounter} />
        <Button label="+" value={5} onClickFunction={this.incrementCounter} />
        <Button label="+" value={10} onClickFunction={this.incrementCounter} />
        <Button label="+" value={100} onClickFunction={this.incrementCounter} />
        <p></p>
        <Button label="Reset" onClickFunction={this.resetCounter} />
      </div>  
    );
  }
}

ReactDOM.render(<App />, mountNode);