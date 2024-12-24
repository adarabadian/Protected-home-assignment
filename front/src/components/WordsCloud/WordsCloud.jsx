import React from 'react';
import { TagCloud } from 'react-tagcloud';
import './WordsCloud.scss';

export default function WordsCloud(props) {
	const words = props.words || [];

	const options = {
		luminosity: 'dark',
	}

	return (
		<div className="words-cloud">
			<h4 className="words-cloud-title">Trending words</h4>
			<TagCloud minSize={12} maxSize={40} tags={words} colorOptions={options} />
		</div>
	);
}
