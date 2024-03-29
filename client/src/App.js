import React, { Component } from 'react';
// components
import Header from './components/Header';
import Nav from './components/Nav';
// pages
import Main from './pages/Main';
// api
import API from './utils';
// stylesheets
import './App.css';

class App extends Component {

  state = {
    authed: false,
    display: <Main />
  }

  auth = () => {
    var password = prompt("Enter Password:");
    if (password === "farley") {
      this.setState({
        authed: true,
      })
    }
  };

  changeDisplay = (page) => {
    this.setState({
      display: page,
    })
  }

  dropDatabase = () => {
    let conf = window.confirm("Are you really sure you want to drop the database?");
    if (conf) {
      API.dropDatabase().then(() => {
        alert("Database Dropped");
        window.location.reload();
      })
    }
  }

  render() {
    return (
      <div className="container p-3">
        <Header />
        <Nav auth={() => this.auth()} dropDatabase={this.dropDatabase} changeDisplay={this.changeDisplay} authed={this.state.authed} />
        {this.state.display}
      </div>
    );
  }
}

export default App;
