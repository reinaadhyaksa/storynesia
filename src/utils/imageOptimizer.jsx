export const optimizeImage = (originalUrl, options = {}) => {
    const {
        width = 800,
        height = null,
        quality = 'q_auto',
        format = 'f_auto'
    } = options;

    if (!originalUrl || !originalUrl.includes('cloudinary.com')) {
        return originalUrl;
    }

    const urlParts = originalUrl.split('/upload/');

    if (urlParts.length !== 2) {
        return originalUrl;
    }

    const transformations = [];

    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    transformations.push(quality);
    transformations.push(format);

    return `${urlParts[0]}/upload/${transformations.join(',')}/${urlParts[1]}`;
};

export const OptimizedImage = ({ src, alt, className, options, ...props }) => {
    const optimizedSrc = optimizeImage(src, options);

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