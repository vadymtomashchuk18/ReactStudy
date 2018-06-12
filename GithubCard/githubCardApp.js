const Card = (props) => {
  return (
    <div style={{margin: '1em'}}>
      <img width="75" src={props.avatar_url} />
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
          {props.name}
        </div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};

const CardList = (props) => {
  return (
    <div>
      {props.cards.map(card => <Card {...card} />)}
    </div>
  );
}

class Form extends React.Component {
  state = { username : "" }

  handleSubmit = (event) => {
    event.preventDefault();
    //ajax... (fetch or axios)
    axios.get(`https://api.github.com/users/${this.state.username}`)
      .then(resp => {
        this.props.onSubmit(resp.data);
      });
  }
  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            value={ this.state.username }
            onChange={(event) => this.setState({ username: event.target.value })}
            type="text" placeholder="Github username" />
          <button type="submit">Add card</button>
        </form>
      </div>
    );
  };
}

class App extends React.Component {
  state = {
    cards: [
      // {  name: "Marmazuka",
      //   avatar: "https://avatars.githubusercontent.com/u/8445?v=3",
      //   company: "Zalupynka" },
      // { name: "Benny Churka",
      //   avatar: "https://avatars.githubusercontent.com/u/6820?v=3",
      //   company: "Marlov" }
    ]
  };
  
  addNewCard = (cardInfo) => {
  // console.log(cardInfo);
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo)
    })
    );
  }
  
  render () {
    return (
      <div>
        <Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);