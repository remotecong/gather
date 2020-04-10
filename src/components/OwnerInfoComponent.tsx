import React from "react";
import { IconX, IconCheckmark } from "components/icons";
import LoadingIndicatorComponent from "components/LoadindIndicatorComponent";
import styled from "styled-components";

function LivesThereComponent({ livesThere }: { livesThere: boolean }) {
  return (
    <LivesThereState>
      {livesThere ? <IconCheckmark /> : <IconX />}{" "}
      {livesThere ? "Lives there" : "Does not live there"}
    </LivesThereState>
  );
}

interface PhoneNumberRecord {
  isMobile: boolean;
  number: string;
  name: string;
}

function PhoneNumberComponent({
  p,
  i,
  len,
  showName
}: {
  p: PhoneNumberRecord;
  i: number;
  len: number;
  showName: boolean;
}) {
  return (
    <PhoneNumber>
      {p.isMobile ? renderMobileIcon() : renderLandlineIcon()}
      {!!showName && `${p.name} - `}
      {p.number}
      {i + 1 !== len && ", "}
    </PhoneNumber>
  );
}

const renderLandlineIcon = () => (
  <PhoneIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.413 51.413">
    <path d="M25.989 12.274c8.663.085 14.09-.454 14.823 9.148h10.564c0-14.875-12.973-16.88-25.662-16.88-12.69 0-25.662 2.005-25.662 16.88h10.482c.811-9.785 6.864-9.232 15.455-9.148zM5.291 26.204c2.573 0 4.714.154 5.19-2.377.064-.344.101-.734.101-1.185H0c0 3.765 2.369 3.562 5.291 3.562zm35.589-3.562h-.099c0 .454.039.845.112 1.185.502 2.334 2.64 2.189 5.204 2.189 2.936 0 5.316.193 5.316-3.374H40.88z" />
    <path d="M35.719 20.078v-1.496c0-.669-.771-.711-1.723-.711h-1.555c-.951 0-1.722.042-1.722.711v2.289h-11v-2.289c0-.669-.771-.711-1.722-.711h-1.556c-.951 0-1.722.042-1.722.711v2.802C12.213 23.988 4.013 35.073 3.715 36.415l.004 8.955c0 .827.673 1.5 1.5 1.5h40c.827 0 1.5-.673 1.5-1.5v-9c-.295-1.303-8.493-12.383-11-14.987v-1.305zM19.177 37.62a1.458 1.458 0 1 1 0-2.915 1.458 1.458 0 0 1 0 2.915zm0-5a1.458 1.458 0 1 1 0-2.915 1.458 1.458 0 0 1 0 2.915zm0-4.999a1.458 1.458 0 1 1 0-2.915 1.458 1.458 0 0 1 0 2.915zm6 9.999a1.458 1.458 0 1 1 0-2.915 1.458 1.458 0 0 1 0 2.915zm0-5a1.458 1.458 0 1 1 0-2.915 1.458 1.458 0 0 1 0 2.915zm0-4.999a1.458 1.458 0 1 1 0-2.915 1.458 1.458 0 0 1 0 2.915zm6 9.999a1.457 1.457 0 1 1 0-2.916 1.457 1.457 0 1 1 0 2.916zm0-5a1.457 1.457 0 1 1 0-2.916 1.457 1.457 0 1 1 0 2.916zm0-4.999a1.457 1.457 0 1 1 0-2.916 1.458 1.458 0 1 1 0 2.916z" />
  </PhoneIcon>
);

const renderMobileIcon = () => (
  <PhoneIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.442 27.442">
    <path d="M19.494 0H7.948a1.997 1.997 0 0 0-1.997 1.999v23.446c0 1.102.892 1.997 1.997 1.997h11.546a1.998 1.998 0 0 0 1.997-1.997V1.999A1.999 1.999 0 0 0 19.494 0zm-8.622 1.214h5.7c.144 0 .261.215.261.481s-.117.482-.261.482h-5.7c-.145 0-.26-.216-.26-.482s.115-.481.26-.481zm2.85 24.255a1.275 1.275 0 1 1 0-2.55 1.275 1.275 0 0 1 0 2.55zm6.273-4.369H7.448V3.373h12.547V21.1z" />
  </PhoneIcon>
);

export interface OwnerData {
  phones: PhoneNumberRecord[];
  livesThere: boolean;
  ownerName: string;
  thatsThemUrl: string;
}

const OwnerInfoComponent = ({
  owner,
  loading
}: {
  owner: OwnerData | null;
  loading: boolean;
}) => {
  if (loading) {
    return <LoadingIndicatorComponent />;
  }

  if (owner) {
    return (
      <Container>
        <OwnerName>{owner.ownerName}</OwnerName>
        <LivesThereComponent livesThere={owner.livesThere} />
        {!owner.phones.length && (
          <PhoneNumber>No numbers found for address</PhoneNumber>
        )}
        {owner.phones
          //.sort((a, b) => a.isMobile - b.isMobile)
          .map((p, i, a) => (
            <PhoneNumberComponent
              key={i}
              p={p}
              i={i}
              len={a.length}
              showName={!owner.livesThere}
            />
          ))}
        <p>
          <ThatsThemLink
            href={owner.thatsThemUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Open ThatsThem Page
          </ThatsThemLink>
        </p>
      </Container>
    );
  }

  return null;
};

const Container = styled.div`
  border-top: solid 1rem blue;
  margin-top: 2rem;
  padding-top: 2rem;
`;
const OwnerName = styled.p`
  font-size: 1.5rem;
  margin: 0;
  @media (min-width: 1050px) {
    font-size: 2rem;
  }
`;
const LivesThereState = styled.p`
  align-items: center;
  display: flex;
`;
const PhoneIcon = styled.svg`
  height: 1.5rem;
  margin-right: 1rem;
  @media (min-width: 1050px) {
    height: 3rem;
    margin-right: 2rem;
  }
`;
const PhoneNumber = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  @media (min-width: 1050px) {
    font-size: 3rem;
  }
`;

const ThatsThemLink = styled.a`
  &:hover {
    color: springgreen;
  }
  &:link,
  &:visited {
    color: blue;
  }
`;

export default OwnerInfoComponent;
