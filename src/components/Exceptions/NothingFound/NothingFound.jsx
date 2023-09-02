import React, { Component } from 'react';

import cl from './NothingFound.module.css';

export default class NothingFound extends Component {
  render() {
    return (
      <div className={cl.notfound__exception}>
        <img src={this.props.exception.icon} alt="Sad Smile" className={cl.notfound__exception__image} />
        <p className={cl.notfound__exception__descr}>{this.props.exception.descr}</p>
      </div>
    );
  }
}
