// Write JavaScript here and press Ctrl+Enter to execute
class Button extends React.Component {
  
  // handleClick = () => {
  //  this.setState((prevState) => {
  //    return {
  //      counter: prevState.counter + 1
  //     };
  //   });
  // }
  
  render () {
    return (
      <button onClick={this.props.onClickFunction}>{this.props.label}</button>
    );
  }
}

const Result = (props) => {
  return (
    <div>{props.counter}</div>
  );
} 

class App extends React.Component {
  // constructor (props) {
  // super(props);
  // this.state = {counter : 0}
  // }
  
  state = {counter : 0};
  
  incrementValue = () => {
    this.setState((prevState) => ({
      counter: prevState.counter + 1
    }));
  };
  
  decrementValue = () => {
    this.setState((prevState) => ({
      counter : prevState.counter - 1
    }));
  }
  
  render () {
    return (
      <div>
        <Button onClickFunction={this.decrementValue} label="-" />
        <Result counter={this.state.counter}/>
        <Button onClickFunction={this.incrementValue} label="+"/>
      </div>  
    );
  }
}

ReactDOM.render(<App />, mountNode);