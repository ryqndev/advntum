import React, {useState, useEffect} from 'react';
import CommitGraph from './components/CommitGraph';
import CommitterGraph from './components/CommitterGraph';
import Committer from './components/Committer';
import ExampleData from './datasets/boba.json';
import { MemoryRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import {promptUser, getMeta, getData, aggregateCommits} from './fetchScripts';
import ExampleMetaData from './datasets/bobaMeta.json'; //https://api.github.com/repos/ryqndev/boba-watch
import GitHubLogin from 'react-github-login';
import Swal from 'sweetalert2';
import './App.scss';
import 'react-vis/dist/style.css';

const App = ({history}) => {
	const [meta, setMeta] = useState(ExampleMetaData);
	const [data, setData] = useState(ExampleData);
	const [url, setUrl] = useState(null);
	const [token, setToken] = useState(null);
	
	useEffect(() => {
		console.log(token);
		if(token === 0){
			history.push('/app');
		}else if(token !== null){
			promptUser(setUrl);
		}
	}, [token, history]);

	useEffect(() => {
		console.log('url added', url);
		getMeta(url, token, res => {
			setMeta(res);
			getData(url, token, res => {
				console.log("asking for new data")
				Swal.fire(
					'Wait for it...!',
					'Getting all the commits takes time. Once the data is loaded, you will be redirected',
					'success'
				);
				aggregateCommits(res, token, setData);
			});
		})
	}, [url, token, history]);

	useEffect(() => {
		console.log('meta updated', meta);
	}, [meta])

	useEffect(() => {
		console.log('data added', data);
		if(data !== ExampleData){
			history.push('/app');
		}
	}, [data, url, history]);

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
	const parse = (data) => {
		return data.reduce((acc, val) => {
			if(val.stats.total > 300) return acc;
			return [...acc, {...val.stats, date: new Date(val.commit.author.date), name: val.commit.author.name}];
		}, []);
	}
	const [parsedData, setParsedData] = useState(parse(DATA));

	useEffect(() => {
		setParsedData(parse(DATA));
	}, [DATA]);

	return (
		<div className="App">
			<h1>{METADATA.name} project stats</h1>
			<h2>{METADATA.name} commit info</h2>
			<CommitGraph DATA={parsedData}/>
			<h2>{METADATA.name} committer info</h2>
			<CommitterGraph DATA={parsedData}/>
			<h2>{METADATA.name} committer info</h2>
			<Committer DATA={parsedData}/>
		</div>
	)
}

export default withRouter(App);
