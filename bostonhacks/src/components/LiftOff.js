import styled from "styled-components";
// const StyledCanvas = styled.canvas`
//     width: 38px;
//     height: 27px;
//     border: 1px black solid;
// `




// const SPRITE_WIDTH = 13;
// const SPRITE_HEIGHT = 14;
// const BORDER_WIDTH = 1;
// const SPACING_WIDTH = 1;

// function spritePositionToImagePosition(row, col) {
//     return {
//         x: (
//             BORDER_WIDTH +
//             col * (SPACING_WIDTH + SPRITE_WIDTH)
//         ),
//         y: (
//             BORDER_WIDTH +
//             row * (SPACING_WIDTH + SPRITE_HEIGHT)
//         )
//     }
// }


// var canvas = document.querySelector('canvas');
// console.log("test" + canvas.width)
// var context = canvas.getContext('2d');


// var spriteSheetURL = 'https://codehs.com/uploads/e4cfb06e001bd92cf41139928e88819a';
// var image = new Image();
// image.src = spriteSheetURL;
// image.crossOrigin = true;

// var position = spritePositionToImagePosition(1, 0);

// image.onload = function() {
//     context.drawImage(
//         image,
//         position.x,
//         position.y,
//         SPRITE_WIDTH,
//         SPRITE_HEIGHT,
//         0,
//         0,
//         SPRITE_WIDTH,
//         SPRITE_HEIGHT
//     );
// };


export default function LiftOff(){
    


    return(
        <>
            <img src="obama.jpg" width={120} height={100}></img>
            
            
        </>
    );
}