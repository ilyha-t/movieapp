import React, { Component } from 'react';

import cl from './DoubleLoader.module.css';

export default class DoubleLoader extends Component {
  parentClasses = this.props.className;
  render() {
    return (
      <div className={`${cl.loadingio__spinner} ${this.parentClasses}`}>
        <div className={cl.ldio__ptkpihnu5r}>
          <div></div>
          <div></div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}
