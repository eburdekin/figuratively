import { useEffect, useState } from "react";

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  return (
    <div>
      <h2>Image Gallery</h2>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.imageUrl}
            alt={image.imageSubject}
            className="w-full h-auto"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
