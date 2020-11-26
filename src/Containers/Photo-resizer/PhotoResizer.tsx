//===== React =====
import React, { useCallback, useState } from 'react';

//===== Components =====
import Cropper from 'react-easy-crop';
import Button from '../../Components/Button/Button';
import Popup from '../../Components/Popup/Popup';

//===== Utils and types =====
import getCroppedImg from '../../utils/cropImage';
import { Area } from 'react-easy-crop/types';

//===== Interfaces =====
interface IParams {
  image: string;
  crop: { x: number; y: number };
  zoom: number;
  aspect: number;
}

interface IPhotoResizer {
  photoParams: IParams;
  setPhotoParams: (any: any) => void;
  setPhoto: (any: any) => void;
  setOpen: (any: any) => void;
}

//===== Main =====
const PhotoResizer: React.FC<IPhotoResizer> = ({
  photoParams,
  setPhotoParams,
  setPhoto,
  setOpen,
}) => {
  //===== State for cropped image coordinates =====
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const onCropChange = useCallback(
    (crop: { x: number; y: number }) => {
      setPhotoParams((prev: IParams) => ({ ...prev, crop }));
    },
    [setPhotoParams]
  );

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onZoomChange = useCallback(
    (zoom: number) => {
      setPhotoParams((prev: IParams) => ({ ...prev, zoom }));
    },
    [setPhotoParams]
  );

  const handleSave = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        photoParams.image,
        croppedAreaPixels
      );
      setPhoto(croppedImage);
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, setPhoto, setOpen, photoParams.image]);

  return (
    <Popup height='500px' width='500px' onClose={onClose}>
      <Cropper
        image={photoParams.image}
        crop={photoParams.crop}
        zoom={photoParams.zoom}
        aspect={photoParams.aspect}
        onCropChange={onCropChange}
        onCropComplete={onCropComplete}
        onZoomChange={onZoomChange}
      />
      <Button
        label='Save'
        onClick={handleSave}
        style={{ position: 'absolute', zIndex: 200, bottom: 20, right: 20 }}
      />
    </Popup>
  );
};

export default PhotoResizer;
