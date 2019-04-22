import React, { Component } from "react";
import { connect } from "react-redux";

export class Results extends Component {

  render() {

    const { films, name, error } = this.props;
    
    if(error.value){
      return (<div className="error-message">{error.errorMessage}</div>)
    } else {
      return (
        <React.Fragment>
          {films.length > 0 && (
            <div className="results">Results for <span className="name">{name}</span></div>
          )}
          <div className="film-row">
            {films.map(film => (
              <div key={film.imdbID} className="film-column-wrapper">
                <img
                  className="film-img"
                  src={film.Poster}
                  alt={film.Title}
                />
                <div className="film-title">
                  {film.Title} - ({film.Year})
                </div>
              </div>
            ))}
          </div>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = ({store:{name, films, error}}) => ({name, films, error});

export default connect(mapStateToProps, null)(Results);
