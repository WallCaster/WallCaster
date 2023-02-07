const blue = '\u001b[96m';
const reset = '\u001b[0m';

console.log(blue + '\nStarting server...' + reset);

import { App } from './app';
new App();

console.log(blue + 'Server started!\n' + reset);
