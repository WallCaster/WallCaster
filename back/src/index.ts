import { App } from './app';
import { ApiTwitter } from './api/api-twitter';

// const api = new ApiTwitter();
// api.fetchPosts();

const blue = '\u001b[34m';
const reset = '\u001b[0m';

console.log(blue + '\nStarting server...' + reset);
const app = new App();
console.log(blue + 'Server started!\n' + reset);
app.run();
