import React, { useState,useEffect } from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalBarSeriesCanvas
  } from 'react-vis';
import './CommitGraph.scss';

const Committer = ({DATA}) => {
	const DIMENSIONS = [
		'total',
		'additions',
		'deletions'
	];
    const [yAxis, setYAxis] = useState(0);
    const updateY = (increment) => {
        setYAxis((yAxis + (increment ? 1 : -1)) % DIMENSIONS.length);
    }
	return (
		<div className="commit-graph-wrapper">
            <div className="controls">
				<button onClick={updateY.bind(null,false)}>❮</button>
				<div> {`${DIMENSIONS[yAxis]}`} </div>
				<button onClick={updateY.bind(null, true)}>❯</button>
			</div>
            <XYPlot width={window.innerWidth - 80} height={500}>
                <VerticalBarSeriesCanvas animation className="vertical-bar-series-example" data={DATA.map(e => ({
        id: e.name,
        x: e.date.getTime(),
        y: e[DIMENSIONS[yAxis]]
    }))} />
                <XAxis />
                <YAxis />
            </XYPlot>
			<article className="description">
				This graph displays the {DIMENSIONS[yAxis]} commits with respect to time in a project. 
			</article>
		</div>
	);
}

export default Committer;
