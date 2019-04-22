import React, { Component } from "react";
import { connect } from "react-redux";
// Actions
import { searchFilm } from "../actions/appActions";

export class Search extends Component {
  
  search = ({target:{value}}) => value.length >= 3 ? this.props.searchFilm(value) : null;

  render() {
    return (
      <div className="input-container">
        <input type="text" placeholder="Type in a film name"
          onChange={ev => this.search(ev)}/>
      </div>
    );
  }
}

const mapDispatchToProps = {searchFilm};

export default connect(null, mapDispatchToProps)(Search);
