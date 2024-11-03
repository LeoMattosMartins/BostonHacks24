import { Canvas, Image } from "@bucky24/react-canvas/build/main";




export default function Spaceship(numReps) {


    return (
        <>

            {/* <img src={require("../sprites/orange.png")}></img> */}
            <br />
            {/* <canvas 
                width="200px" 
                height="200px" 
                style={{border: '1px black solid'}} 
                ref={myCanvas}>
            </canvas> */}

            <Canvas
                width={300}
                height={300}
            >
                <Image src={require("../sprites/orange.png")}
                    x={40}
                    y={50}
                    width={38}
                    height={27}
                />
            </Canvas>

        </>
    );
}