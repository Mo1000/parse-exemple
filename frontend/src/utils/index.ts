import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';


export const cloudinaryInstance = new Cloudinary({
    cloud: {
        cloudName: import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
        apiKey: import.meta.env.VITE_PUBLIC_CLOUDINARY_API_KEY,
        apiSecret: import.meta.env.VITE_PUBLIC_CLOUDINARY_API_SECRET,
    },
    url: {
        secure: true,
    },
});

export const optimizeUrl = (image: string): CloudinaryImage => {

    return cloudinaryInstance
        .image(image.split('upload/')[1])
        .quality('auto')
        .format('webp');
};









