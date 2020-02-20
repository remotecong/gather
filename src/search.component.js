import React from 'react';
import Search from './search';
import { connect } from 'react-redux';
import { css } from 'glamor';
import * as Sentry from '@sentry/browser';
import { timedEvent } from './logger.js';

const styles = {
    button: css(
        {
            '-webkit-appearance': 'none',
            background: 'springgreen',
            border: 'none',
            borderRadius: 10,
            fontSize: '1rem',
            fontWeight: 'bold',
            padding: '.75rem',
            ':disabled': {
                background: '#ccc',
            },
            '@media (min-width: 1050px)': {
                padding: '1rem',
            }
        }
    ),
    input: css(
        {
            '-webkit-appearance': 'none',
            borderColor: '#dbdbdb',
            borderRadius: 4,
            boxShadow: 'inset 0 1px 2px rgba(10,10,10,.1)',
            display: 'block',
            fontSize: '1rem',
            justifyContent: 'flex-start',
            lineHeight: 1.5,
            margin: '0.5rem 0',
            maxWidth: '100%',
            padding: 'calc(.375em - 1px) calc(.625em - 1px)',
            position: 'relative',
            verticalAlign: 'top',
            width: '100%',
            '@media (min-width: 1050px)': {
                fontSize: '1.25rem',
            }
        }
    ),
};

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
        <form onSubmit={onSearch}>
            <input {...styles.input} value={addr} onChange={captureAddress} placeholder="Street, City, State and/or Zip"/>
            <button {...styles.button} disabled={!addr|| isLoading}>Search</button>
        </form>
    );
}

export default connect(({ isLoading }) => ({
    isLoading,
}), dispatch => ({
    loadStarted: () => dispatch({type: 'loading'}),
    loadFinished: value => dispatch({type: 'results', value}),
    loadFailed: () => dispatch({type: 'load-failed'})
}))(SearchComponent);
