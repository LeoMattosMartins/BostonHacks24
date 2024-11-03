import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// change to BU Guest unencrypted
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://10.192.17.160:5000';

export const socket = io(URL, {
    autoConnect: false
});