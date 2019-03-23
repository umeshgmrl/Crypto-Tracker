import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    currencies: null,
    page: 1,
    perPage: 20,
    totalPages: 5
  };

  decrementPage = () => {
    const { page } = this.state;
    this.setState(
      {
        page: page - 1
      },
      () => {
        this.fetchCurrencies();
      }
    );
  };

  incrementPage = () => {
    const { page } = this.state;
    this.setState(
      {
        page: page + 1
      },
      () => {
        this.fetchCurrencies();
      }
    );
  };

  changePerPage = event => {
    this.setState(
      {
        perPage: event.target.value
      },
      () => {
        this.fetchCurrencies();
      }
    );
  };

  fetchCurrencies = () => {
    const { page, perPage } = this.state;
    fetch(
      `https://api.udilia.com/coins/v1/cryptocurrencies?page=${page}&perPage=${perPage}`
    )
      .then(rawData => rawData.json())
      .then(data => {
        this.setState(data);
      });
  };
  componentDidMount() {
    this.fetchCurrencies();
  }
  render() {
    const { currencies, page, totalPages } = this.state;
    if (!currencies) return <h2>Loading...</h2>;
    return (
      <div className="container">
        <header>
          <h1>Crypto Tracker</h1>
        </header>
        <footer>
          <button
            className="button"
            disabled={page < 2}
            onClick={this.decrementPage}
          >
            ←
          </button>
          <span>{`Page ${page} of ${totalPages}`}</span>
          <button
            className="button"
            disabled={page > 4}
            onClick={this.incrementPage}
          >
            →
          </button>
          <div>
            <span>Per Page</span>
            <select onChange={this.changePerPage}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </footer>
        <main>
          <table className="table is-bordered is-fullwidth">
            <thead>
              <tr>
                <td>Cryptocurrency</td>
                <td>Price</td>
                <td>Market Cap</td>
                <td>24H Change</td>
              </tr>
            </thead>
            <tbody>
              {currencies.map((currency, id) => (
                <tr key={id}>
                  <td>{currency.name}</td>
                  <td>{currency.price}</td>
                  <td>{currency.marketCap}</td>
                  <td>{currency.percentChange24h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    );
  }
}

export default App;
