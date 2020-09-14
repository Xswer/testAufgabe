import { useQuery, DocumentNode } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Select, { ValueType } from 'react-select';
import _ from 'lodash';
import { Selectable } from './Selector';

interface Props {
  name: string;
  value: string;
  query: DocumentNode;
  path: string;
  variables: {
    [key: string]: any;
  };
  setSelected(value: string): void;
  convertToSelectable(el: any): Selectable | null;
}

export function DropDown(props: Props) {
  const onChange = (
    res: ValueType<{
      label: string;
      value: string;
    }>,
  ) => {
    // @ts-ignore
    const { label } = res as Selectable;
    props.setSelected(label);
  };

  const getOptions = useQuery(props.query, {
    variables: props.variables,
  });

  const { loading, error, data } = getOptions;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const options = _.get(data, props.path)?.map(props.convertToSelectable);

  return (
    <Select
      name={props.name}
      value={{
        label: props.value || props.name,
        value: props.value || props.name,
      }}
      onChange={onChange}
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
}
