import styled from 'styled-components';

export const FlyerListWrapper = styled.div`
  height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100 - 116px);
  width: 100vw;
  display: inline-block;
  overflow: auto;

  .subtitle {
      margin-top: 8px;
  }

  .title, .subtitle {
      color: #565656;
  }

  .container {
    padding: 16px;
  }

  .fab {
    position: absolute;
    bottom: 80px;
    right: 20px;
  }

`;
