import React, { Component } from "react";

class CoinDetails extends Component {
	state = {};

	componentDidMount() {
		const { coinId } = this.props.match.params;
		this.props.handleLoading(true);
		fetch(`https://api.udilia.com/coins/v1/cryptocurrencies/${coinId}`)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				this.setState(
					{
						...data
					},
					() => {
						this.props.handleLoading(false);
					}
				);
			});
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
			volume24h
		} = this.state;
		if (!id) return null;
		return (
			<div>
				<div className="coin-details-wrapper">
					<h2>{name}</h2>
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
			</div>
		);
	}
}

export default CoinDetails;
