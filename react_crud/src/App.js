import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "React Simple CRUD Application",
      act: 0,
      index: "",
      datas: []
    };
  }

  componentDidMount() {
    this.refs.name.focus();
  }

  fSubmit = e => {
    e.preventDefault();
    console.log("try");

    let datas = this.state.datas;
    // to receive values from our form
    let name = this.refs.name.value;
    let address = this.refs.address.value;

    if (this.state.act === 0) {
      // add new item
      let data = {
        name,
        address
      };
      datas.push(data);
    } else {
      // update existing item
      let index = this.state.index;
      datas[index].name = name;
      datas[index].address = address;
    }

    this.setState({
      datas: datas,
      act: 0
    });

    // once data is submitted we must reset the form
    this.refs.myForm.reset();
    this.refs.name.focus();
  };

  // Remove item
  fRemove = i => {
    let datas = this.state.datas;
    // splice is used to delete the item from our object
    datas.splice(i, 1);
    //  update our state object
    this.setState({
      datas: datas
    });
    this.refs.myForm.reset();
    this.refs.name.focus();
  };

  // Edit item
  fEdit = i => {
    let data = this.state.datas[i];
    // take the form and set the data inside of it to be equal to the data at the position 'i'
    this.refs.name.value = data.name;
    this.refs.address.value = data.address;

    // after this submit function will run the if statement
    this.setState({
      act: 1,
      index: i
    });

    this.refs.name.focus();
  };

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h1>{this.state.title}</h1>
        <form ref="myForm" className="myForm">
          <input
            type="text"
            ref="name"
            placeholder="your name"
            className="formField"
          />
          <input
            type="text"
            ref="address"
            placeholder="your address"
            className="formField"
          />
          <button onClick={this.fSubmit} className="myButton">
            Submit
          </button>
        </form>
        <pre>
          {datas.map((data, i) => (
            <li key={i} className="myList">
              {i + 1}. {data.name}, {data.address}
              <button onClick={() => this.fRemove(i)} className="myListButton">
                Remove
              </button>
              <button onClick={() => this.fEdit(i)} className="myListButton">
                Edit
              </button>
            </li>
          ))}
        </pre>
      </div>
    );
  }
}

export default App;
