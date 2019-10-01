import React from 'react';
import { Item } from './Item';

export class App extends React.Component {
    constructor() {
        super();

        this.state = {
            items: [],
            isLoading: false,
            enableAutorefresh: false,
            minComments: 0
        };
    }

    getItems = () => {
        this.setState({
            isLoading: true
        });

        fetch('https://www.reddit.com/r/reactjs.json?limit=100').then(response => {
            return response.json();
        })
        .then(data => {
            this.setState({
                items: data.data.children,
                isLoading: false
            });
        }) 
    }

    componentDidMount() {
        this.getItems();
    }

    updateAutoRefresh = () => {
        if (this.state.enableAutorefresh) {
            this.setState({ enableAutorefresh: false });
            clearInterval(this.autoRefresh);
        } else {
            this.setState({ enableAutorefresh: true })
            this.autoRefresh = setInterval(this.getItems, 3000);
        }
    }

    updateMinComments = event => {
        this.setState({
            minComments: Number(event.target.value)
        })
    }

    getItemsByComments = (items, minComments) => {
        return items
        .sort((a, b) => b.data.num_comments - a.data.num_comments)
        .filter(item => item.data.num_comments >= minComments);
    }

    render(){ 
        const { items, isLoading, minComments } = this.state;
        const itemsByComments = this.getItemsByComments(items, minComments);

        return (
            <div>
                <div className="container_options">
                    <div className="mb"><h1>Top commented</h1></div>
                    <div className="mb"><p>Current filter: {minComments}</p></div>
                    <div className="refresh" onClick={this.updateAutoRefresh}>
                        <a>{ this.state.enableAutorefresh ?  'Stop' : 'Start' } auto refresh</a>
                    </div>
                    <div className="range">
                        <input 
                            type="range"
                            value={minComments}
                            defaultValue={minComments}
                            min={0}
                            max={500}
                            onChange={this.updateMinComments}
                        >
                        </input>
                    </div>
                </div>
                <div className="flex_container">
                    {isLoading ? (<p>...Loading</p>) : itemsByComments.length > 0 ?  ( 
                    itemsByComments.map(item =>  (
                        <Item key={item.data.id} data={item.data} />
                        ))
                        ) : ( 
                        <p>No results found matching your criteria</p> 
                        )}
                </div>
            </div>
        );
    }
}