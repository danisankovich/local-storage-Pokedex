var H1 = React.createClass({//by doing this, you can render more typical html patters
  render: function() {
  return(
    <h1>
      Hello <a href="http://github.com">Plunker</a>
    </h1>
    )
  }
})
var H2 = React.createClass({//by doing this, you can render more typical html patters
  render: function() {
  return(
    <h2>
      Hello H2
    </h2>
    )
  }
})

var H2 = React.createClass({
  render: function() {
  return(
    <div>
      <h2>
        Hello h2
      </h2>
      <h3>
        and what about h3?
      </h3>
    </div>
    )
  }
})
var Header = React.createClass({ //this is how you can render both H1 and H2 with one React.render. Just call it on Header
  render: function() {
  return(
    <div>
      <H1 />
      <H2 />
      <H2 />
      <H1 />
      <H2 />
    </div>
    )
  }
})


// var H1 = React.createElement("h1", null, "Hello ", //null is attributes
//   React.createElement("a", {href: 'http://plnkr.co'}, "Plunker")
// );

// var HS = React.createElement("div", null, H1, H1);
//makes a div with two h1 of properties H1 inside it.

// React.render(H1, document.body);
React.render(React.createElement(Header), document.body);
//when rendering a React.createClass, you need that React.createElement().
//or
// React.render(<H1 />, document.body); //is your other option
