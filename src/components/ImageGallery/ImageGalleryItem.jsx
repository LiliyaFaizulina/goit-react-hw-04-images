import PropTypes from 'prop-types';
import { GalleryItem, Image } from './ImageGallery.styled';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({ img, alt, largeImg }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <GalleryItem>
      <Image src={img} alt={alt} onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <Modal url={largeImg} alt={alt} closeModal={closeModal} />
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
};
