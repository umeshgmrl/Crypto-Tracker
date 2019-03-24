import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import CoinList from "./CoinList";
import CoinDetails from "./CoinDetails";

class App extends Component {
	state = {
		loading: false
	};

	handleLoading = value => {
		this.setState({
			loading: value
		});
	};

	render() {
		const { loading } = this.state;
		return (
			<BrowserRouter>
				<div className="container">
					<header>
						<Link to="/">
							<h1>Crypto Tracker</h1>
						</Link>
					</header>
					{loading && <div className="loader" />}
					<div>
						<Route
							exact
							path="/"
							render={props => (
								<CoinList handleLoading={this.handleLoading} {...props} />
							)}
						/>
						<Route
							exact
							path="/coin/:coinId"
							render={props => (
								<CoinDetails handleLoading={this.handleLoading} {...props} />
							)}
						/>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}
export default App;
