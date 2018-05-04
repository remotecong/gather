import React from 'react';
import './home.page.css';
import SearchComponent from "./search.component";
import OwnerInfo from "./owner-info";

export default () => (
    <section className="homepage">
        <h1 className="homepage__title">Gather</h1>
        <p className="homepage__about">Reverse address lookup for finding owners and their phone numbers</p>
        <div className="homepage__split-panel">
            <SearchComponent/>
            <OwnerInfo />
        </div>
    </section>
);
