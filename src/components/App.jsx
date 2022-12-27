import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImages, normalizedImages } from '../services/pixabay-api';
import ImageGallery from './ImageGallery/ImageGallery';

import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import { AppStyled } from './App.styled';

class App extends Component {
  state = {
    status: 'idle',
    requestInfo: '',
    page: null,
    images: [],
    isBtnMoreShown: false,
    perPage: 12,
  };

  componentDidUpdate(_, prevState) {
    const { requestInfo, page } = this.state;
    if (requestInfo !== prevState.requestInfo || page !== prevState.page) {
      this.setState({ status: 'pending' });
      this.renderImages();
    }
  }

  handleFormSearch = newRequest => {
    this.setState({ requestInfo: newRequest, page: 1, images: [] });
  };

  onBtnMoreClick = () => {
    this.setState(previousState => ({
      page: previousState.page + 1,
    }));
  };

  renderImages = async () => {
    const { requestInfo, page, perPage } = this.state;
    try {
      const response = await fetchImages(requestInfo, page, perPage);

      if (response.hits.length === 0) {
        toast.info(
          'Sorry, but there are no results for your request. Please, try again with another request'
        );
        this.setState({ status: 'resolved', isBtnMoreShown: false });
        return;
      }

      const normalizedData = normalizedImages(response.hits);

      this.setState(prevState => ({
        images: [...prevState.images, ...normalizedData],
        status: 'resolved',
        isBtnMoreShown: page < Math.ceil(response.totalHits / perPage),
      }));
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  render() {
    const { images, isBtnMoreShown, status } = this.state;
    return (
      <AppStyled>
        <Searchbar onSubmit={this.handleFormSearch} />

        {images.length > 0 && <ImageGallery images={images} />}

        {isBtnMoreShown && status === 'resolved' && (
          <Button onBtnMoreClick={this.onBtnMoreClick} />
        )}

        {status === 'pending' && <Loader />}

        {status === 'rejected' &&
          toast.warn('Something went wrong. Try again!')}

        <ToastContainer position="top-right" />
      </AppStyled>
    );
  }
}
export default App;
