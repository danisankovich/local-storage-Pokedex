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
    // console.log(this.props.startingSeconds)
    this.setState({remainingSeconds: this.props.startingSeconds}, function() {
      this.startTimer();
    });
  },
  setTimer: function(val) {
    console.log("here")
    this.setState({ remainingSeconds: val }, function() {
      this.startTimer();
    });
  },
  render: function() {
    return(
      <div className={`timer ${this.done() ? 'red' : 'black'}`}>
      <div onClick={this.handleClick} className={`timer ${this.done() ? 'red' : 'black'}`}>
        Timer: {this.state.remainingSeconds}
        <div onClick={this.setTimer.bind(null, 40)}>40</div>
        <div onClick={this.setTimer.bind(null, 41)}>41</div>
        <div onClick={this.setTimer.bind(null, 42)}>42</div>
        <div onClick={this.setTimer.bind(null, 43)}>43</div>
        <div onClick={this.setTimer.bind(null, 44)}>44</div>
        <div onClick={this.setTimer.bind(null, 45)}>45</div>
      </div>
    );
  }
});

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
