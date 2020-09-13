import { DocumentNode } from '@apollo/react-hooks';
import React from 'react';
import Select, { ValueType } from 'react-select';

interface Props {
  name: string;
  options: { label: string; value: string }[];
  setSelected(value: string): void;
  query: DocumentNode;
  variables: {
    [key: string]: any;
  };
}

interface State {}

export default class DropDown extends React.Component<Props, State> {
  onChange = (
    res: ValueType<{
      label: string;
      value: string;
    }>,
  ) => {
    console.log(res!);
    this.props.setSelected('123');
    this.setState({});
  };

  render() {
    const { options } = this.props;
    const { onChange } = this;

    return (
      <Select
        name={this.props.name}
        onChange={onChange}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    );
  }
}
