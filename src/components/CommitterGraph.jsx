import React, { useState } from 'react';
import {
	XYPlot,
	XAxis,
	YAxis,
	HorizontalGridLines,
	VerticalGridLines,
	LineSeries
} from 'react-vis';
import './CommitGraph.scss';

const CommiterGraph = ({DATA}) => {
	const DIMENSIONS = [
		'total',
		'additions',
		'deletions'
	];
	const [yAxis, setYAxis] = useState(0);
	const updateY = (increment) => {
		setYAxis((yAxis + (increment ? 1 : -1)) % DIMENSIONS.length);
	}
	console.log(DATA.map((e, i) => ({x: i, y: e[DIMENSIONS[yAxis]]})))

	return (
		<div className="commit-graph-wrapper">
			<div className="controls">
				<button onClick={updateY.bind(null,false)}>❮</button>
				<div> {`${DIMENSIONS[yAxis]}`} </div>
				<button onClick={updateY.bind(null, true)}>❯</button>
			</div>
			<XYPlot
				width={window.innerWidth - 80}
				height={500}
				margin={30}>
				<HorizontalGridLines style={{stroke: '#B7E9ED'}} />
				<VerticalGridLines style={{stroke: '#B7E9ED'}} />
				<XAxis
					title="X Axis"
					style={{
					line: {stroke: '#ADDDE1'},
					ticks: {stroke: '#ADDDE1'},
					text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
					}}
				/>
				<YAxis title="Y Axis" />
				<LineSeries
					animation
					className="first-series"
					data={DATA.map((e, i) => ({x: i, y: e[DIMENSIONS[yAxis]]}))}
					style={{
					strokeLinejoin: 'round',
					strokeWidth: 4
					}}
				/>
			</XYPlot>
			<article className="description">
				This graph displays the ratio of {DIMENSIONS[yAxis]} commit lines with respect to commit # in a project. 
			</article>
		</div>
	);
}

export default CommiterGraph;