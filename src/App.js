import React, {useState, useEffect} from 'react';
import CommitGraph from './components/CommitGraph';
import ExampleData from './datasets/boba.json';
import { MemoryRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import {promptUser, getMeta} from './fetchScripts';
import ExampleMetaData from './datasets/bobaMeta.json'; //https://api.github.com/repos/ryqndev/boba-watch
import GitHubLogin from 'react-github-login';
import './App.scss';

// const url = "https://api.github.com/repos/{owner}/{repo}";
const url = "https://api.github.com/repos/ryqndev/boba-watch";

const App = ({history}) => {
	const [meta, setMeta] = useState(ExampleMetaData);
	const [data, setData] = useState(ExampleData);
	const [token, setToken] = useState(null);
	
	useEffect(() => {
		console.log(token);
		if(token === 0){
			history.push('/app');
		}else if(token !== null){
			promptUser();
			getMeta(url, token, (res) => {
				setMeta(res);

				history.push('/app');
			})
		}
	}, [token, history]);
	return (
		<Switch>
			<Route exact path='/'>
				<Login setToken={setToken}/>
			</Route>
			<Route path='/app'>
				<Project METADATA={meta} DATA={data}/>
			</Route>
		</Switch>

	);
}
const Login = ({setToken}) => {
	const viewExample = () => {setToken(0)}
	const onSuccess = res => {setToken(res.code)};
	const onFailure = res => console.error(res);

	return (
		<div className="login-wrapper">
			Login with Github to view your projects or check out our example
			<br />
			<GitHubLogin clientId="Iv1.6f4c6a1213356ee4"
				redirectUri=""
				onSuccess={onSuccess}
				onFailure={onFailure}
			/>
			<button onClick={viewExample}>Example</button>
		</div>
	);
}

const Project = ({METADATA, DATA}) => {
	return (
		<div className="App">
			<h1>{METADATA.name} project info</h1>
			<CommitGraph DATA={DATA}/>
		</div>
	)
}

export default withRouter(App);
