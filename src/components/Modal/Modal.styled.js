import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 78%);
`;

export const Modal = styled.div`
  padding: 0;
  position: absolute;
  width: 800px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
`;

export const ImageComp = styled.img`
  display: block;
  width: 100%;
`;
