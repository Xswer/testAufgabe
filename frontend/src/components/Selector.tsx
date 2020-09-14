import React from 'react';

import { DISTINCT_FIELD, GET_AP } from '../queries/Queries';
import { DropDown } from './DropDown';

interface Ap {
  vorname: string;
  nachname: string;
}

export interface Selectable {
  label: string;
  value: string;
}

interface Props {}
interface State {
  title: string;
  stadt: string;
  plz: string;
  ap: string;
}

export default class Selector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
      stadt: '',
      plz: '',
      ap: '',
    };
  }

  setTitle = (value: string) => {
    this.setState({
      ...this.state,
      title: value,
      stadt: '',
      plz: '',
      ap: '',
    });
  };

  setStadt = (value: string) => {
    this.setState({
      ...this.state,
      stadt: value,
      plz: '',
      ap: '',
    });
  };

  setPlz = (value: string) => {
    this.setState({
      ...this.state,
      plz: value,
      ap: '',
    });
  };

  setAp = (value: string) => {
    this.setState({
      ...this.state,
      ap: value,
    });
  };

  convertToSelectableString = (el: string): Selectable | null => {
    if (!el) return null;
    return { label: el, value: el };
  };

  convertToSelectableAp = (el: Ap): Selectable | null => {
    if (!el) return null;
    const vorNachName = `${el.vorname} ${el.nachname}`;
    return {
      label: vorNachName,
      value: vorNachName,
    };
  };

  render() {
    const { title, stadt, plz, ap } = this.state;
    return (
      <div>
        <DropDown
          name="Title"
          value={title}
          query={DISTINCT_FIELD}
          path="distinct"
          convertToSelectable={this.convertToSelectableString}
          variables={{ field: 'title' }}
          setSelected={this.setTitle}
        />

        {title ? (
          <DropDown
            name="Stadt"
            value={stadt}
            query={DISTINCT_FIELD}
            path="distinct"
            convertToSelectable={this.convertToSelectableString}
            variables={{ field: 'stadt', title }}
            setSelected={this.setStadt}
          />
        ) : null}

        {stadt ? (
          <DropDown
            name="Plz"
            value={plz}
            query={DISTINCT_FIELD}
            path="distinct"
            convertToSelectable={this.convertToSelectableString}
            variables={{ field: 'plz', title, stadt }}
            setSelected={this.setPlz}
          />
        ) : null}

        {plz ? (
          <DropDown
            name="Ap"
            value={ap}
            query={GET_AP}
            path="firma[0].ap"
            convertToSelectable={this.convertToSelectableAp}
            variables={{ title, stadt, plz }}
            setSelected={this.setAp}
          />
        ) : null}

        {ap ? <h1>{ap}</h1> : null}
      </div>
    );
  }
}
