import styled from 'styled-components';

export const ImageGalleryListItem = styled.li`
  border-radius: 5px;
`;

export const ImageGalleryImg = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  :hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;