import React, { Component } from "react";
import { Link } from "react-router-dom";

class Search extends Component {
	state = {
		coinList: null
	};

	searchCoins = event => {
		if (!event.target.value) return;
		fetch(
			`https://api.udilia.com/coins/v1/autocomplete?searchQuery=${
				event.target.value
			}`
		)
			.then(r => r.json())
			.then(data => this.setState({ coinList: data }));
	};

	clearCoins = () => {
		this.setState({
			coinList: null
		});
	};

	render() {
		const { coinList } = this.state;
		return (
			<div className="field">
				<p className="control has-icons-left ">
					<input
						className="input"
						type="email"
						placeholder="Search Coin"
						onChange={this.searchCoins}
					/>
					<span className="icon is-small is-left">
						<i className="fas fa-envelope" />
					</span>
					<span className="icon is-small is-right">
						<i className="fas fa-check" />
					</span>
				</p>
				{coinList && (
					<div className="autocomplete-list">
						{coinList.map(coin => (
							<Link
								to={`/coin/${coin.id}`}
								key={coin.id}
								onClick={this.clearCoins}
							>
								{coin.name}
							</Link>
						))}
					</div>
				)}
			</div>
		);
	}
}

export default Search;
