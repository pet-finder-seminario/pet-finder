import styled from 'styled-components';

export const MapWrapper = styled.div`
  height: calc(100vh - 116px);

  /* Android viewport hack */
  @supports (-webkit-appearance:none) {
    height: calc(100vh - 172px);
  }
`;
