
//prevState is better choise, because setState is asynchronous method
class Button extends React.Component {
  constructor (props) {
    super(props);
    this.state = {counter : 0}
  }
  
  handleClick = () => {
    this.setState((prevState) => {
      return {
        counter: prevState.counter + 1
      };
    });
  }
  
  render () {
    return (
      <button onClick={this.handleClick}>{this.state.counter}</button>
    );
  }
}

ReactDOM.render(<Button />, mountNode);


/// not the best choise change current state (because setState is asynchronous method)
/*class Button extends React.Component {
  constructor (props) {
    super(props);
    this.state = {counter : 0}
  }
  
  handleClick = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  }
  
  render () {
    return (
      <button onClick={this.handleClick}>{this.state.counter}</button>
    );
  }
}

ReactDOM.render(<Button />, mountNode);
**/