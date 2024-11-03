import { useEffect, useState } from "react";
import { socket } from "./socket.js";
// import Profile from './components/Profile.js';
import SlidingImageCanvas from './components/move.js'

function App() {
  const [numReps, setNumReps] = useState(0);
  useEffect(() => {
    console.log("Testing");
    socket.connect();
    function onRepEvent(value) {
      console.log(`ON REP EVENT WITH VALUE ${value}`);
      setNumReps(value);
    }
    function onConnect() {
      console.log("Connected");
    }
    socket.on("rep", onRepEvent);
    socket.on("connect", onConnect);

        return () => {
            socket.off('rep', onRepEvent)
            socket.off('connect', onConnect)
        }
    }, [])

    const [position, setPosition] = useState({x:-8, y:33});
    // const [position, setPosition] = useState({x:81, y:10});

    console.log("x " + position.x);
    console.log("y " + position.y);
    const handleKeyPress = (event) => {
        if (event.code === 'Space') {
            setPosition((prev) => ({
                x: prev.x < 81 ? prev.x + (89 / 20) : -8, // replace -8 with some kind of success screen?
                y: prev.y > 10 ? prev.y - (23 / 20) : 33,
            }));
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <SlidingImageCanvas position={position}></SlidingImageCanvas>
    );
}

export default App;
