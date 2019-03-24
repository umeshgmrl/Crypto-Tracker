import React, { Component } from "react";
import { Link } from "react-router-dom";

class CoinDetails extends Component {
	state = {};

	componentDidMount() {
		const { coinId } = this.props.match.params;
		this.fetchCoinData(coinId);
	}

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

	fetchCoinData = coinId => {
		this.startLoading(true);
		fetch(`https://api.udilia.com/coins/v1/cryptocurrencies/${coinId}`)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				this.setState(
					{
						...data
					},
					() => {
						this.stopLoading(false);
					}
				);
			});
	};

	componentDidUpdate(props) {
		const updatedCoinId = document.URL.split("/").pop();
		if (!this.state.id) return;
		if (this.state.id !== updatedCoinId) {
			this.setState(
				{
					id: updatedCoinId
				},
				() => {
					this.fetchCoinData(updatedCoinId);
				}
			);
		}
	}

	render() {
		const {
			id,
			marketCap,
			name,
			percentChange24h,
			price,
			rank,
			symbol,
			totalSupply,
			volume24h,
			loading
		} = this.state;
		if (!id || loading) return null;
		return (
			<div class="coin-details-page">
				<div className="coin-details-wrapper">
					<h2>{`${name} (${id})`}</h2>
					<div className="coin-rows-wrapper">
						<div className="coin-detail-row">
							<div>Rank</div>
							<div>{rank}</div>
						</div>
						<div className="coin-detail-row">
							<div>Price</div>
							<div>{price}</div>
						</div>
						<div className="coin-detail-row">
							<div>Symbol</div>
							<div>{symbol}</div>
						</div>
						<div className="coin-detail-row">
							<div>Market Cap</div>
							<div>{marketCap}</div>
						</div>
						<div className="coin-detail-row">
							<div>24H percentage change</div>
							<div>{percentChange24h}</div>
						</div>
						<div className="coin-detail-row">
							<div>Total Supply</div>
							<div>{totalSupply}</div>
						</div>
						<div className="coin-detail-row">
							<div>24H Volume</div>
							<div>{volume24h}</div>
						</div>
					</div>
				</div>
				<Link to="/" className="button">
					Go back
				</Link>
			</div>
		);
	}
}

export default CoinDetails;
