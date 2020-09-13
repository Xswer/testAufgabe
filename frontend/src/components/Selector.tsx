import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { DISTINCT_FIELD, GET_AP } from '../queries/Queries';
import DropDown from './DropDown';

interface Ap {
  vorname: string;
  nachname: string;
}

interface Selectable {
  label: string;
  value: string;
}

interface Props {}
interface State {
  titleOptions: Selectable[];
  stadtOptions: Selectable[];
  plzOptions: Selectable[];
  apOptions: Selectable[];
  title: string;
  stadt: string;
  plz: string;
  ap: string;
}

export default class Selector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      titleOptions: [],
      stadtOptions: [],
      plzOptions: [],
      apOptions: [],
      title: '',
      stadt: '',
      plz: '',
      ap: '',
    };
  }

  convertToSelectable(el: string): Selectable {
    return { label: el, value: el };
  }

  setTitle(value: string) {
    const getStadtOptions = useQuery(DISTINCT_FIELD, {
      variables: { field: 'stadt', title: value },
    });
    this.setState({
      ...this.state,
      title: value,
      stadtOptions: getStadtOptions.data.distinct.map(this.convertToSelectable),
      stadt: '',
      plz: '',
      apOptions: [],
    });
  }

  setStadt(value: string) {
    const { title } = this.state;
    const getPlzOptions = useQuery(DISTINCT_FIELD, {
      variables: { field: 'plz', title, stadt: value },
    });
    this.setState({
      ...this.state,
      plzOptions: getPlzOptions.data.distinct.map(this.convertToSelectable),
      stadt: value,
      plz: '',
      apOptions: [],
    });
  }

  setPlz(value: string) {
    const { title, stadt } = this.state;
    const getApOptions = useQuery(GET_AP, {
      variables: { title, stadt, plz: value },
    });
    this.setState({
      ...this.state,
      plz: value,
      apOptions: getApOptions.data.firma.map((el: { ap: Ap }) =>
        this.convertToSelectable(`${el.ap.vorname} ${el.ap.nachname}`),
      ),
    });
  }

  setAp(value: string) {
    this.setState({
      ...this.state,
      ap: value,
    });
  }

  async componentDidMount() {
    const getTitleOptions = useQuery(DISTINCT_FIELD, {
      variables: { field: 'title' },
    });
    this.setState({
      ...this.state,
      titleOptions: getTitleOptions.data.distinct,
    });
  }

  render() {
    const {
      titleOptions,
      stadtOptions,
      plzOptions,
      apOptions,
      ap,
    } = this.state;
    return (
      <div>
        {titleOptions ? (
          <DropDown
            name="Title"
            options={titleOptions}
            setSelected={this.setTitle}
          />
        ) : null}

        {stadtOptions ? (
          <DropDown
            name="Stadt"
            options={stadtOptions}
            setSelected={this.setTitle}
          />
        ) : null}

        {plzOptions ? (
          <DropDown
            name="Plz"
            options={plzOptions}
            setSelected={this.setTitle}
          />
        ) : null}

        {apOptions ? (
          <DropDown name="Ap" options={apOptions} setSelected={this.setTitle} />
        ) : null}

        {ap ? <h1>{ap}</h1> : null}
      </div>
    );
  }
}
