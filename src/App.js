import React from 'react';
import HomePage from './home.page';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import './App.css';

const initialStore = {
    isLoading: false,
    ownerData: null
};

const store = createStore((state = initialStore, action) => {
    switch (action.type) {
        case 'loading':
            return {...state, isLoading: true, ownerData: null};
        case 'results':
            return {...state, isLoading: false, ownerData: action.value};
        case 'load-failed':
            return {...state, isLoading: false};
        default:
            return state;
    }
});

export default () => (
    <Provider store={store}>
        <HomePage/>
    </Provider>
);
