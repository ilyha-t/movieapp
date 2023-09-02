import React, { Component } from 'react';

import cl from './RatingMark.module.css';

export default class RatingMark extends Component {
  matchRating = (rating) => {
    switch (true) {
      case rating <= 3:
        return cl.rating__0_3;
      case rating > 3 && rating <= 5:
        return cl.rating__3_5;
      case rating > 5 && rating <= 7:
        return cl.rating__5_7;
      default:
        return cl.rating__7;
    }
  };

  trimRating = (originalRating) => {
    let rating = String(originalRating);
    if (rating.length > 3) {
      return rating.slice(0, 3);
    } else {
      return originalRating;
    }
  };

  render() {
    const { rating, customClass = null } = this.props;
    return <div className={`${customClass} ${cl.rating} ${this.matchRating(rating)}`}>{this.trimRating(rating)}</div>;
  }
}
