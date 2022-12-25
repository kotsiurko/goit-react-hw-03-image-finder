import { Component } from 'react';
import {
  ImageGalleryListItem,
  ImageGalleryImg,
} from './ImageGalleryItem.styled';
import ModalWindow from '../Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    isVisibleModal: false,
  };

  showNCloseModal = () => {
    this.setState(({ isVisibleModal }) => ({
      isVisibleModal: !isVisibleModal,
    }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    return (
      <ImageGalleryListItem>
        <ImageGalleryImg
          onClick={this.showNCloseModal}
          src={webformatURL}
          alt={tags}
        />
        {this.state.isVisibleModal && (
          <ModalWindow
            onClose={this.showNCloseModal}
            src={largeImageURL}
            alt={tags}
          />
        )}
      </ImageGalleryListItem>
    );
  }
}
export default ImageGalleryItem;
