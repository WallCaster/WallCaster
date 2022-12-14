import { App } from './app';

const blue = '\u001b[34m';
const green = '\u001b[32m';
const reset = '\u001b[0m';

console.log(blue + '\nStarting server...' + reset);
const app = new App();
console.log(blue + 'Server started!\n' + reset);
app.run();
