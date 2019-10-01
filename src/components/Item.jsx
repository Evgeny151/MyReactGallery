import React from 'react';
import noimg from './img/noimg.jpg';

export class Item extends React.Component {
    render() {
        const { data } = this.props;

        return (
            <div className="item">
                {data.thumbnail !== 'self' && data.thumbnail !== 'default' ? <img src={data.thumbnail} alt="" /> : <img src={noimg} alt="" />}
                <p>{data.title}</p>
                <p>Number of comments: {data.num_comments}</p>
                <a href={data.permalink} target="_blank" rel="noopener noreferrer">link</a>
            </div>
        )
    }
}