import React from 'react';
import Search from './search';
import {connect} from 'react-redux';
import * as Sentry from '@sentry/browser';
import {timedEvent} from './logger.js';
import './search.component.css';

class SearchComponent extends React.Component {
    state = {
        address: ''
    };

    runSearch = e => {
        e.preventDefault();
        if (this.state.address && !this.props.isLoading) {
            this.props.loadStarted();
            const finish = timedEvent('Search', this.state.address);
            Search(this.state.address)
                .then(data => {
                    finish();
                    if (!data.error) {
                        return this.props.loadFinished(data);
                    }
                    throw new Error(data.error);
                })
                .catch(err => {
                    //  capture wait time for error
                    err.loadTime = finish();
                    Sentry.withScope(scope => {
                        scope.setTag('query', this.state.address);
                        Sentry.captureException(err);
                    });
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
