import { useEffect, useState } from 'react';
import { socket } from './socket.js'
// import Profile from './components/Profile.js';
import Spaceship from './components/Spaceship.js';

function App() {
    const [numReps, setNumReps] = useState(0)
    useEffect(() => {
        console.log("Testing")
        socket.connect()
        function onRepEvent(value) {
            console.log(`ON REP EVENT WITH VALUE ${value}`)
            setNumReps(value)
        }
        function onConnect() {
            console.log("Connected")
        }
        socket.on('rep', onRepEvent)
        socket.on('connect', onConnect)

        return () => {
            socket.off('rep', onRepEvent)
            socket.off('connect', onConnect)
        }
    }, [])
    return (
        <Spaceship numReps={numReps}></Spaceship>
    );
}

export default App;
