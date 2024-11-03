import React, { useEffect, useRef } from 'react';

const SlidingImageCanvas = ({ position }) => {
    const canvasRef = useRef(null);
    const imageSrc = require('../sprites/orange.png'); // Replace with your image URL

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.src = imageSrc;
        img.onload = () => {
            console.log("yes")
            drawImage(ctx, img, position);
        };

        // Clear the canvas before each draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, [position, imageSrc]);

    const drawImage = (ctx, img, x) => {
        const y = (ctx.canvas.height - img.height) / 2; // Center the image vertically
        ctx.drawImage(img, x, y);
    };

    return (
        <canvas
            ref={canvasRef}
            width={400} // Set the desired width
            height={400} // Set the desired height
            style={{ border: '1px solid black' }}
        />
    );
};

export default SlidingImageCanvas;
