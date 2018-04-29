import React from 'react';

export default ({owner}) => (
    <div className="card">
        <header className="card-header">
            <p className="card-header-title">{owner.name}</p>
        </header>
        <div className="card-content">
            <div className="content">
                <label class="checkbox">
                    <input type="checkbox" checked={owner.livesThere} readOnly={true} />
                    Lives there
                </label>
                {owner.phones.map(p => (
                    <h2 className="title is-4" key={p.houseNumber}>{p.houseNumber} <small>({p.isMobile ? 'Mobile' : 'Landline'})</small></h2>
                ))}
            </div>
        </div>
    </div>
);
