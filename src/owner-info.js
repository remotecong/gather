import React from 'react';
import IconX from './icon-x';
import IconCheck from './icon-check';
import {connect} from 'react-redux';
import Loader from './loader';
import './owner-info.css';

const renderLivesThere = livesThere => (
    <p className="owner-info__lives-there">
        {livesThere ? <IconCheck /> : <IconX/>} {livesThere ? 'Lives there' : 'Does not live there'}
    </p>
);

const renderPhoneNumber = (p, i, len, showName) => (
    <span className="owner-info__phone-number" key={p.number}>
        {p.isMobile ? renderMobileIcon() : renderLandlineIcon()}
        {!!showName && `${p.name} - `}{p.number}
        {i + 1 !== len && ', '}
    </span>
);

const renderLandlineIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.413 51.413" className="owner-info__landline-icon"><path d="M25.989 12.274c8.663.085 14.09-.454 14.823 9.148h10.564c0-14.875-12.973-16.88-25.662-16.88-12.69 0-25.662 2.005-25.662 16.88h10.482c.811-9.785 6.864-9.232 15.455-9.148zM5.291 26.204c2.573 0 4.714.154 5.19-2.377.064-.344.101-.734.101-1.185H0c0 3.765 2.369 3.562 5.291 3.562zm35.589-3.562h-.099c0 .454.039.845.112 1.185.502 2.334 2.64 2.189 5.204 2.189 2.936 0 5.316.193 5.316-3.374H40.88z"/><path d="M35.719 20.078v-1.496c0-.669-.771-.711-1.723-.711h-1.555c-.951 0-1.722.042-1.722.711v2.289h-11v-2.289c0-.669-.771-.711-1.722-.711h-1.556c-.951 0-1.722.042-1.722.711v2.802C12.213 23.988 4.013 35.073 3.715 36.415l.004 8.955c0 .827.673 1.5 1.5 1.5h40c.827 0 1.5-.673 1.5-1.5v-9c-.295-1.303-8.493-12.383-11-14.987v-1.305zM19.177 37.62a1.458 1.458 0 1 1 0-2.915 1.458 1.458 0 0 1 0 2.915zm0-5a1.458 1.458 0 1 1 0-2.915 1.458 1.458 0 0 1 0 2.915zm0-4.999a1.458 1.458 0 1 1 0-2.915 1.458 1.458 0 0 1 0 2.915zm6 9.999a1.458 1.458 0 1 1 0-2.915 1.458 1.458 0 0 1 0 2.915zm0-5a1.458 1.458 0 1 1 0-2.915 1.458 1.458 0 0 1 0 2.915zm0-4.999a1.458 1.458 0 1 1 0-2.915 1.458 1.458 0 0 1 0 2.915zm6 9.999a1.457 1.457 0 1 1 0-2.916 1.457 1.457 0 1 1 0 2.916zm0-5a1.457 1.457 0 1 1 0-2.916 1.457 1.457 0 1 1 0 2.916zm0-4.999a1.457 1.457 0 1 1 0-2.916 1.458 1.458 0 1 1 0 2.916z"/></svg>);

const renderMobileIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="owner-info__mobile-icon" viewBox="0 0 27.442 27.442"><path d="M19.494 0H7.948a1.997 1.997 0 0 0-1.997 1.999v23.446c0 1.102.892 1.997 1.997 1.997h11.546a1.998 1.998 0 0 0 1.997-1.997V1.999A1.999 1.999 0 0 0 19.494 0zm-8.622 1.214h5.7c.144 0 .261.215.261.481s-.117.482-.261.482h-5.7c-.145 0-.26-.216-.26-.482s.115-.481.26-.481zm2.85 24.255a1.275 1.275 0 1 1 0-2.55 1.275 1.275 0 0 1 0 2.55zm6.273-4.369H7.448V3.373h12.547V21.1z"/></svg>);

const OwnerInfo = ({owner, isLoading}) => isLoading ? <Loader/> : !!owner && (
    <div className="owner-info">
        <p className="owner-info__name">{owner.name}</p>
        {renderLivesThere(owner.livesThere)}
        {!owner.phones.length && <p className="owner-info__phone-number">No numbers found for address</p>}
        {owner.phones.sort((a, b) => a.isMobile - b.isMobile).map((p, i, a) => renderPhoneNumber(p, i, a.length, !owner.livesThere))}
    </div>
);

export default connect(state => ({
    owner: state.ownerData,
    isLoading: state.isLoading
}))(OwnerInfo);
