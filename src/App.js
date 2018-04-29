import React, {Component} from 'react';
import OwnerInfo from './OwnerInfo';

class App extends Component {
    state = {
        address: '',
        loadedData: {"mailingAddress":"11106 S 108TH EAST AVE, BIXBY, OK 74008","name":"CHRISTENSEN, JUSTIN D ","lastName":"CHRISTENSEN","livesThere":true,"phones":[{"name":"Justin Christensen","houseNumber":"918-698-5838","isMobile":true}]},
        isLoading: false
    };

    runSearch = e => {
        e.preventDefault();
        if (this.state.address && !this.state.isLoading) {
            this.setState({isLoading: true});
            fetch(`http://localhost:3000/?address=${encodeURIComponent(this.state.address)}`)
                .then(r => r.json())
                .then(data => {
                    console.log(data);
                    this.setState({isLoading: false, loadedData: data});
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
                <form onSubmit={this.runSearch}>
                    <div className="field">
                        <label className="label">Address to lookup</label>
                        <div className="control">
                            <input value={this.state.address} onChange={this.captureAddress} className="input"
                                   type="text" placeholder="Address..."/>
                        </div>
                        <p className="help">Search for an address like "12345 W Main St, City Name, State or Zip"</p>
                    </div>
                    <button className="button is-success" disabled={!this.state.address || this.state.isLoading}>Search</button>
                </form>
                {this.state.loadedData && <OwnerInfo owner={this.state.loadedData}/>}
            </section>
        );
    }
}

export default App;
