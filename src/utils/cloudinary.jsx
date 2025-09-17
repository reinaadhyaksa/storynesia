const CLOUD_NAME = 'dc9q58yts'; 
const UPLOAD_PRESET = 'myartikelbyreina';

export const defaultAvatars = [
    'https://res.cloudinary.com/dc9q58yts/image/upload/f_auto,q_auto/v1758001131/Gemini_Generated_Image_9hrt9hrt9hrt9hrt_zqr54h.png',
    'https://res.cloudinary.com/dc9q58yts/image/upload/f_auto,q_auto/v1758001131/Gemini_Generated_Image_9m7k3f9m7k3f9m7k_e9i80n.png',
    'https://res.cloudinary.com/dc9q58yts/image/upload/f_auto,q_auto/v1758001132/Gemini_Generated_Image_kfeh5lkfeh5lkfeh_prhoc4.png',
    'https://res.cloudinary.com/dc9q58yts/image/upload/f_auto,q_auto/v1758001134/Gemini_Generated_Image_x71v1px71v1px71v_uvvn8z.png',
    'https://res.cloudinary.com/dc9q58yts/image/upload/f_auto,q_auto/v1758001134/Gemini_Generated_Image_gs9ylbgs9ylbgs9y_ipzjpa.png'
];

export const uploadToCloudinary = async (file, options = {}) => {
    const {
        folder = ''
    } = options;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    if (folder) {
        formData.append('folder', folder);
    }

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Upload gagal');
        }

        return data.secure_url;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error(`Upload gagal: ${error.message}`);
    }
};

export const applyTransformation = (url, options = {}) => {
    const {
        width = 800,
        height = null,
        quality = 'q_auto',
        format = 'f_auto',
        crop = 'fill'
    } = options;

    if (!url || !url.includes('cloudinary.com')) {
        return url;
    }

    const urlParts = url.split('/upload/');

    if (urlParts.length !== 2) {
        return url;
    }

    const transformations = [];

    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (crop) transformations.push(`c_${crop}`);
    transformations.push(quality);
    transformations.push(format);

    return `${urlParts[0]}/upload/${transformations.join(',')}/${urlParts[1]}`;
};

export const optimizeCloudinaryUrl = (url, options = {}) => {
    const {
        width = 300,
        height = 300,
        quality = 'q_auto',
        format = 'f_auto',
        crop = 'fill'
    } = options;

    if (!url || !url.includes('cloudinary.com')) {
        return url;
    }

    if (url.includes('/upload/') && url.includes('/image/upload/')) {
        const parts = url.split('/upload/');
        if (parts[1].includes('/v')) {
            return url; 
        }
    }

    const transformationParts = [];
    if (width) transformationParts.push(`w_${width}`);
    if (height) transformationParts.push(`h_${height}`);
    if (crop) transformationParts.push(`c_${crop}`);
    transformationParts.push(quality);
    transformationParts.push(format);

    return url.replace('/upload/', `/upload/${transformationParts.join(',')}/`);
};

export const OptimizedImage = ({ src, alt, className, options, ...props }) => {
    const optimizedSrc = optimizeCloudinaryUrl(src, options);

    return (
        <img
            src={optimizedSrc}
            alt={alt}
            className={className}
            loading="lazy"
            {...props}
        />
    );
};