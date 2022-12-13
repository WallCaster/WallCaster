# Node Project

This project uses Yarn as its package manager.
## Scripts 

### start

```bash
yarn start
```

This script runs the application using nodemon to watch for changes in the src directory and automatically restart the server. It uses ts-node to execute the src/index.ts file.

### dev

```bash
yarn dev
```

This script is the same as start, but is meant for development purposes.

### build

```bash
yarn build
```

This script uses the TypeScript compiler (tsc) to build the project.

### test

```bash
yarn test
```

Currently, this script displays an error message and exits. Add your own tests and update this script to run them.