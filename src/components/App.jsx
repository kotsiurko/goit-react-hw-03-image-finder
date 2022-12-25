import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import fetchImages from '../services/pixabay-api';
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

  handleFormSearch = newRequest => {
    this.setState({ requestInfo: newRequest, page: 1, images: [] });
  };

  renderImages = async () => {
    const { requestInfo, page, perPage } = this.state;
    try {
      await fetchImages(requestInfo, page, perPage).then(response => {
        if (response.hits.length === 0) {
          toast.info(
            'Sorry, but there are no results for your request. Please, try again with another request'
          );
          this.setState({ status: 'resolved', isBtnMoreShown: false });
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          status: 'resolved',
          isBtnMoreShown: page < Math.ceil(response.totalHits / perPage),
        }));
      });
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  onBtnMoreClick = () => {
    this.setState(previousState => ({
      page: previousState.page + 1,
    }));
  };

  componentDidUpdate(_, prevState) {
    const { requestInfo, page } = this.state;
    if (requestInfo !== prevState.requestInfo || page !== prevState.page) {
      this.setState({ status: 'pending' });
      this.renderImages();
    }
  }

  onImageClick = largeImageURL => {
    this.setState({ largeImageURL });
  };

  render() {
    const { images, isBtnMoreShown, status } = this.state;
    return (
      <AppStyled>
        <Searchbar onSubmit={this.handleFormSearch} />

        {status === 'resolved' && <ImageGallery images={images} />}

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
