import React from 'react';
import SearchComponent from "./search.component";
import OwnerInfo from "./owner-info";

import { css } from 'glamor';

const styles = {
    container: css({
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        fontSize: 16,
        padding: '1rem',
        '@media (min-width: 1050px)': {
            margin: 'auto',
            width: 900,
        },
    }),
    title: css({
        borderBottom: 'solid 1rem springgreen',
        display: 'inline-block',
        fontSize: '4rem',
        margin: 'auto auto .75rem',
        '@media (min-width: 1050px)': {
            margin: '0 0 2rem',
        },
    }),
    about: css({
        fontSize: '1.25rem',
    }),
    logo: css({
        height: '3rem',
        '@media (min-width: 1050px)': {
            height: '7rem',
        },
    }),
};

export default () => (
    <div {...styles.container}>
        <h1 {...styles.title}><img {...styles.logo} src="logo.gif" alt="Gather Logo" /> Gather</h1>
        <p {...styles.about}>Reverse address lookup for finding owners and their phone numbers</p>
        <SearchComponent/>
        <OwnerInfo />
    </div>
);
