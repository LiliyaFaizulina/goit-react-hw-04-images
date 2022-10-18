import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Backdrop, Wrapper, Image } from './Modal.styled';

export const Modal = ({ url, alt, closeModal }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [closeModal]);

  return (
    <Backdrop onClick={closeModal}>
      <Wrapper>
        <Image
          src={url}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          loaded={isLoaded}
        />
      </Wrapper>
      {!isLoaded && <Loader />}
    </Backdrop>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
