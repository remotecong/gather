import React from 'react';
import Search from './search';
import {connect} from 'react-redux';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';
import './search.component.css';

class SearchComponent extends React.Component {
    state = {
        address: ''
    };

    runSearch = e => {
        e.preventDefault();
        if (this.state.address && !this.props.isLoading) {
            this.props.loadStarted();
            const loadStartTime = new Date().getTime();
            Sentry.configureScope(scope => {
                scope.setTag('query', this.state.address);
            });
            Search(this.state.address)
                .then(data => {
                    if (!data.error) {
                        ReactGA.timing({
                            category: 'search',
                            variable: 'loadResults',
                            value: (new Date().getTime() - loadStartTime) / 1000,
                            label: this.state.address
                        });
                        return this.props.loadFinished(data);
                    }
                    throw new Error(data.error);
                })
                .catch(err => {
                    const loadTime = (new Date().getTime() - loadStartTime) / 1000;
                    ReactGA.timing({
                        category: 'search',
                        variable: 'fatalException',
                        value: loadTime,
                        label: this.state.address
                    });
                    err.loadTime = loadTime;
                    Sentry.captureException(err);
                    alert(err.message);
                    this.props.loadFailed();
                });
        }
    };

    captureAddress = ({currentTarget}) => this.setState({address: currentTarget.value});

    render = () => (
        <form className="search" onSubmit={this.runSearch}>
            <input id="search__input" value={this.state.address} onChange={this.captureAddress}
                className="search__input"
                type="text" placeholder="Street, City, State and/or Zip"/>
            <button className="search__button" disabled={!this.state.address || this.props.isLoading}>Search</button>
        </form>
    );
}

export default connect(state => ({
    isLoading: state.isLoading
}), dispatch => ({
    loadStarted: () => dispatch({type: 'loading'}),
    loadFinished: value => dispatch({type: 'results', value}),
    loadFailed: () => dispatch({type: 'load-failed'})
}))(SearchComponent);
