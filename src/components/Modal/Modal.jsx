import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, Modal, ImageComp } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class ModalWindow extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseModalEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseModalEsc);
  }

  onCloseModalEsc = event => {
    if (event.code === 'Escape' || event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props;
    return createPortal(
      <Backdrop onClick={this.onCloseModalEsc}>
        <Modal>
          <ImageComp src={src} alt={alt} />
        </Modal>
      </Backdrop>,
      modalRoot
    );
  }
}

export default ModalWindow;
