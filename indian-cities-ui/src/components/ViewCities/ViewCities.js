import React from 'react';
import { Redirect } from 'react-router-dom';
import auth from '../../auth';

export class ViewCities extends React.Component {

  constructor(props) {
    super(props);
    this.setUserData = props.setUserData;
    this.state = {
      currentPage: 0,
      currentList: [],
      currentPages: [],
      tokenExpired: false
    };
  }

  updatePage = (page) => {
    if (page === '<') page = this.state.currentPage - 1;
    if (page === '>') page = this.state.currentPage + 1;
    if (page === '<<') page = this.state.currentPage - 5;
    if (page === '>>') page = this.state.currentPage + 5;
    this.fetchCities(page);
  }

  async fetchCities(page) {

    const result = await auth.fetchCities(page);

    if(result.error) {
      await auth.deleteToken(); 
      this.setUserData(false);
      this.setState({...this.state, tokenExpired: true});
    }

    let numbers = [];
    if (result?.result?.totalPages > 1) {
      if (result?.skipBehind) {
        numbers.push('<<');
      }
      if (page > 1) {
        numbers.push('<');
      }
      for (let i = result?.startPage; i <= result?.endPage; i++) {
        numbers.push(i);
      }
      if (page < result?.endPage) {
        numbers.push('>');
      }
      if (result?.skipAhead) {
        numbers.push('>>');
      }
      this.setState({ ...this.state, currentPages: numbers, currentPage: page, currentList: result?.result?.current });
    }
  }

  componentDidMount() {
    this.fetchCities(1);
  }


  render() {
    return this.state.tokenExpired ? <Redirect to={'/login'}/> :
    <div className={'container-fluid'} style={{ alignSelf: 'center', width: '100%' }}>
      <table id='cities' style={{ alignSelf: 'center', width: '100%', borderStyle: 'hidden', margin: 0, borderCollapse: 'collapse', tableLayout: 'fixed', wordWrap: 'break-word' }}>
        <thead style={{ padding: '0.02vw', border: '5px solid black' }}>
          <tr>
            <th>Name</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {this.state.currentList?.map((city, index) => {
            const { _id, name, state } = city
            return (
              <tr key={_id} style={{ padding: '1em', border: '2px solid black', marginHorizontal: '2em' }}>
                <td>{name}</td>
                <td>{state}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div style={{ flexDirection: 'row', textAlign: 'center', paddingTop: '0.75em' }}>
        {this.state.currentPages?.map((number, index) => {
          return (
            <button key={number} style={{ margin: '0.25em', width: '5vw', backgroundColor: this.state.currentPage === number ? 'blue' : 'white', color: this.state.currentPage !== number ? 'blue' : 'white' }}
              onClick={() => this.updatePage(number)}>
              {number}
            </button>
          )
        })}
      </div>
    </div>
  }
}