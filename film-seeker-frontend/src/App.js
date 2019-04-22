import React, { Component } from "react";
import { connect } from "react-redux";
// Images
import logo from "./logo.svg";
import loader from "./loader.svg";
//Components
import Results from "./components/Results";
import Search from "./components/Search";
//Styles
import "./App.css";

class App extends Component {
  
  render() {
    const { isLoading } = this.props;
    let renderElements;

    if(isLoading) {
      renderElements = (<img src={loader} className="loader" alt="loader"/>)
    } else {
      renderElements = (
        <React.Fragment>
          <Search />
          <Results />
        </React.Fragment>
      );
    }
    return (
      <div className="App">
        <header className="header-wrapper">
          <img src={logo} alt="logo" className="logo" />
        </header>
        <div className="container">
            {renderElements}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({store:{isLoading}}) => ({isLoading});

export default connect(mapStateToProps, null)(App);
