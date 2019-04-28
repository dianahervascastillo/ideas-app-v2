import React, { Component } from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Card extends Component {
  render() {
    return (
      <div className={classNames('card', this.props.extraClassNames)}>
        {this.props.children}
      </div>
    );
  }
}

Card.propTypes = {
  extraClassNames: PropTypes.string
}

export default Card;
