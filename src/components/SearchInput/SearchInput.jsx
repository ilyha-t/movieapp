import React, { Component } from 'react';
import { Input } from 'antd';

export default class SearchInput extends Component {
  render() {
    return <Input placeholder="Type to search..." onChange={(e) => this.props.onChange(e.target.value)} />;
  }
}
