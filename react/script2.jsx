// var H1 = React.createClass({
//   // greeting: "Oh",  //this.greeting
//   greeting: function() {return 'Oh';}, //this.greeting()
//   render: function() {
//     var data = this.props;
//     console.log(data); //list all properties
//     return(
//       <h1>
//         {this.greeting()}, Hello <a href={data.url}>{this.props.title}</a>
//       </h1>
//     )

//   }
// })
var H1 = React.createClass({
  // greeting: "Oh",  //this.greeting
  greeting: function() {return 'Oh';}, //this.greeting()
  render: function() {
    var data = this.props;
    var link = <a href={data.url}>{data.title}</a>;
    console.log(data); //list all properties
    return(
      <h1>
        {this.greeting()}, Hello {link}
      </h1>
    )
  }
})

var H2 = React.createClass({
  render: function() {
  return(
    <div>
      <h2>
        Hello h{1+1} <a href={this.props.url}>{this.props.title}</a>
      </h2>
      <h3>
        and what about h{6-3}?
      </h3>
    </div>
    )
  }
})
var Header = React.createClass({ //this is how you can render both H1 and H2 with one React.render. Just call it on Header
  render: function() {
  return(
    <div>
      <H1 title="plunker" url="http://plnkr.co" />
      <H2 />
      <H1 title="google" url="http://google.com" />
      <H2 title="plunker" url="http://plnkr.co" />
    </div>
    )
  }
})

React.render(<Header />, document.getElementById("react-node"));





>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




var Timer = React.createClass({
  propTypes: { //set the property types (now you have to give a number for starting number. It will still render as NaN)
    startingSeconds: React.PropTypes.number,
  },
  getInitialState: function() {
    return {remainingSeconds: this.props.startingSeconds};
  },
  startTimer: function() {
    clearInterval(this.state.intervalId);
    var self=this;
    this.setState({intervalId: setInterval( function(){
      self.intervalTick(self)

    }, 1000)});
  },
  intervalTick: function() {
    var self = this;
    self.setState({remainingSeconds: self.state.remainingSeconds - 1}, function() {
      if(self.state.remainingSeconds === 0) { //stops the countdown at 1
        clearInterval(self.state.intervalId);
      }
   });
  },
  componentDidMount: function() {
    this.startTimer();
  },
  done: function (){
    return this.state.remainingSeconds === 0; //returns true or false
  },
  handleClick: function() {
    console.log(this.props.startingSeconds)
    this.setState({remainingSeconds: this.props.startingSeconds}, function() {
      this.startTimer();
    });
  },
  setTimer: function() {
    this.setState({ remainingSeconds: 42 }, function() {
      this.startTimer();
    });
  },
  render: function() {
    return(
      //div className is "timer " + "red", but only if done() returns true.
      <div onClick = {this.handleClick} className={`timer ${this.done() ? 'red' : 'black'}`}>
        Timer: {this.state.remainingSeconds}
        <div onCLick= {this.setTimer}>1</div>
        <div onCLick= {this.setTimer}>2</div>
        <div onCLick= {this.setTimer}>3</div>
        <div onCLick= {this.setTimer}>4</div>
        <div onCLick= {this.setTimer}>5</div>
        <div onCLick= {this.setTimer}>6</div>
      </div>
    );
  }
})

var App = React.createClass({
  render: function() {
    // var content = [];
    // for(var i=0; i<this.props.timers.length; i++) {
    //   content.push(<Timer startingSeconds={this.props.timers[i]}/>)
    // }

    var content = this.props.timers.map(function(seconds) {
      return <Timer startingSeconds={seconds} />;
    });
    return(
      <div className="app">
        {content}
      </div>
    );
  }
})

// React.render(<App />, document.getElementById("react-node"));
React.render(<App timers={[5]}/>, document.getElementById("react-node"));
