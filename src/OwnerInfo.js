import React from 'react';
import IconX from './icon-x';
import IconCheck from './icon-check';

const renderLivesThere = livesThere => (
    <p style={{alignContent: 'center', display: 'flex'}}>
        {livesThere ? <IconCheck /> : <IconX/>} {livesThere ? 'Lives there' : 'Does not live there'}
    </p>
);

const renderPhoneNumber = p => (
    <h4 className="title is-4" style={{marginTop: '1rem'}} key={p.number}>{p.number}
        <small>({p.isMobile ? 'Mobile' : 'Landline'})</small>
    </h4>
);

const renderPhoneNumberWithName = p => (
    <h4 className="title is-4" style={{marginTop: '1rem'}} key={p.number}>{p.name} - {p.number}
        <small>({p.isMobile ? 'Mobile' : 'Landline'})</small>
    </h4>
);


export default ({owner}) => (
    <div className="owner-info">
        <h2 className="title is-2">{owner.name}</h2>
        {renderLivesThere(owner.livesThere)}
        {!owner.phones.length && <p>No numbers found for address</p>}
        {owner.phones.map(owner.livesThere ? renderPhoneNumber : renderPhoneNumberWithName)}
    </div>
);
