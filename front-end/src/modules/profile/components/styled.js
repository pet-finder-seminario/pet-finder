import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  height: calc(100vh - 116px);
  display: inline-block;

  /* Android viewport hack */
  @supports (-webkit-appearance:none) {
    height: calc(100vh - 172px);
  }
`;
