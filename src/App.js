import React, {Component} from 'react';
import OwnerInfo from './OwnerInfo';
import Loader from './loader';
import Search from './search';

class App extends Component {
    state = {
        address: '',
        loadedData: null,
        isLoading: false
    };

    runSearch = e => {
        e.preventDefault();
        if (this.state.address && !this.state.isLoading) {
            this.setState({isLoading: true});
            Search(this.state.address)
                .then(data => {
                    this.setState({isLoading: false, loadedData: data.error ? null : data});
                    if (data.error) {
                        alert(data.error);
                    }
                })
                .catch(err => {
                    console.log('Error', err);
                    this.setState({isLoading: false});
                });
        }
    };

    captureAddress = ({currentTarget}) => this.setState({address: currentTarget.value});

    render() {
        return (
            <section className="container is-fluid">
                <h1 className="title is-1">Gather</h1>
                <div className="columns">
                    <div className="column is-one-third-desktop is-full-mobile">
                        <form onSubmit={this.runSearch}>
                            <div className="field">
                                <label className="label">Address to lookup</label>
                                <div className="control">
                                    <input value={this.state.address} onChange={this.captureAddress}
                                           className="input"
                                           type="text" placeholder="Address..."/>
                                </div>
                            </div>
                            <p className="help">Search for an address like "<em>12345 W Main St, City Name,
                                State or
                                Zip</em>"</p>
                            <br/>
                            <button className="button is-success"
                                    disabled={!this.state.address || this.state.isLoading}>Search
                            </button>
                        </form>
                    </div>
                    <div className="column">
                        {this.state.isLoading ? <Loader/> : (this.state.loadedData &&
                            <OwnerInfo owner={this.state.loadedData}/>)}
                    </div>
                </div>
            </section>
        );
    }
}

export default App;
