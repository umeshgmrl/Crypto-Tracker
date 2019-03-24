import React, { Component } from "react";

class CoinList extends Component {
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
    let perPage = event.target.value;
    let { page } = this.state;
    if (perPage * this.state.page > 100) {
      page = 1;
    }
    this.setState(
      {
        perPage,
        page
      },
      () => {
        this.fetchCurrencies();
      }
    );
  };

  gotoCoin = id => {
    this.props.history.push(`/coin/${id}`);
  };

  startLoading = () => {
    this.props.handleLoading(true);
    this.setState({
      loading: true
    });
  };

  stopLoading = () => {
    this.props.handleLoading(false);
    this.setState({
      loading: false
    });
  };

  fetchCurrencies = () => {
    this.startLoading();
    const { page, perPage } = this.state;
    fetch(
      `https://api.udilia.com/coins/v1/cryptocurrencies?page=${page}&perPage=${perPage}`
    )
      .then(rawData => rawData.json())
      .then(data => {
        this.setState(data);
        this.stopLoading();
      });
  };
  componentDidMount() {
    this.fetchCurrencies();
  }

  render() {
    const { currencies, page, totalPages, loading } = this.state;
    if (!currencies || loading) return null;
    return (
      <div>
        <div>
          <main>
            <table className="table is-bordered is-fullwidth is-hoverable">
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
                  <tr key={id} onClick={() => this.gotoCoin(currency.id)}>
                    <td>{currency.name}</td>
                    <td>{currency.price}</td>
                    <td>{currency.marketCap}</td>
                    <td>{currency.percentChange24h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
          <footer>
            <div className="pagination">
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
                disabled={page >= totalPages}
                onClick={this.incrementPage}
              >
                →
              </button>
            </div>
            <div className="per-page">
              <span>Per Page</span>
              <div className="select">
                <select
                  onChange={this.changePerPage}
                  value={this.state.perPage}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default CoinList;
