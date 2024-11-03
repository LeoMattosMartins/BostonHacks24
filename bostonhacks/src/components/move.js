import React, { useRef, useEffect } from 'react';

const SlidingImageCanvas = ({ position }) => {
    const canvasRef = useRef(null);
    const imageSrc = require('../sprites/Ships and Fire/Orange.png');
    const imagesSrc = [
        require('../sprites/Space and planets/1 Background.png'),
        require('../sprites/Space and planets/2 Shadows.png'),
        require('../sprites/Space and planets/3 small stars.png'),
        require('../sprites/Space and planets/4 big stars.png'),
        require('../sprites/Space and planets/5 Saturn.png'),
        require('../sprites/Space and planets/6 Earth.png'),
        imageSrc,
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const loadImages = () => {
            return Promise.all(imagesSrc.map(src => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve(img);
                });
            }));
        };

        loadImages().then(images => {
            // Clear the canvas before each draw
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            images.forEach((img, index) => {
                const x = index === images.length - 1 ? position.x : 0;
                const y = index === images.length - 1 ? position.y : 0;

                if (img.src === imageSrc) {
                    drawRotatedImage(ctx, img, x, y);
                } else {
                    drawImage(ctx, img, x, y);
                }
            });
        });
    }, [position, imageSrc, imagesSrc]);

    const drawImage = (ctx, img, x, y) => {
        const z = (ctx.canvas.height - img.height) / 2; // Adjust this if necessary
        ctx.drawImage(img, x, y, img.width, img.height);
    };

    const drawRotatedImage = (ctx, img, x, z) => {
        const y = (ctx.canvas.height - img.height) / 2; // Center the image vertically

        ctx.save();
        ctx.translate(x + img.width / 2, y + img.height / 2);
        ctx.rotate(-32 * Math.PI / 180);
        ctx.drawImage(img, x, z, img.width, img.height);
        ctx.restore();
    };


    return (
        <canvas
            ref={canvasRef}
            width={256} // Set the desired width
            height={144} // Set the desired height
            style={{
                border: '1px solid black',
            }}
        />
    );
};

export default SlidingImageCanvas;
 