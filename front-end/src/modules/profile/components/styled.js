import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100 - 116px);
  display: inline-block;
`;
