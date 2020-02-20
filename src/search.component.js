import React from 'react';
import Search from './search';
import {connect} from 'react-redux';
import * as Sentry from '@sentry/browser';
import {timedEvent} from './logger.js';
import './search.component.css';

export const SearchComponent = ({
    isLoading,
    loadStarted,
    loadFinished,
    loadFailed,
}) => {
    const [addr, setAddr] = React.useState('');

    React.useEffect(() => {
        const onPaste = (e) => {
            try {
                const data = e.clipboardData.getData('text');
                setAddr(data);
                querySearch(data);
            } catch (ignore) {
                console.warn('Browser failed to capture paste data', ignore);
            }
        };

        document.addEventListener('paste', onPaste);

        return () => document.removeEventListener('paste', onPaste);
    }, []);

    const onSearch = e => {
        e.preventDefault();
        if (addr && !isLoading) {
            querySearch(addr);
        }
    };

    const querySearch = (addr) => {
        loadStarted();
        const finish = timedEvent('Search', addr);
        Search(addr)
            .then(data => {
                finish();
                if (!data.error) {
                    return loadFinished(data);
                }
                throw new Error(data.error);
            })
            .catch(err => {
                //  capture wait time for error
                err.loadTime = finish();
                Sentry.withScope(scope => {
                    scope.setTag('query', addr);
                    Sentry.captureException(err);
                });
                alert(err.message);
                loadFailed();
            });
    }

    const captureAddress = ({currentTarget}) => setAddr(currentTarget.value);

    return (
        <form className="search" onSubmit={onSearch}>
            <input id="search__input" value={addr} onChange={captureAddress}
                className="search__input"
                type="text" placeholder="Street, City, State and/or Zip"/>
            <button className="search__button" disabled={!addr|| isLoading}>Search</button>
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
