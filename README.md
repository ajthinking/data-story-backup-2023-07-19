## DataStory :dizzy:

![ds_readme_gif](https://user-images.githubusercontent.com/3457668/229267838-b8dcc5cc-9639-4f95-962b-48eae8250d4e.gif)

> This project is currently under construction.




### Development installation
```bash
# Install
git clone git@github.com:ajthinking/data-story-v2.git
cd data-story-v2
yarn

# Start the server
npx ts-node server/socket.ts

# Start the client (in a new tab)
yarn dev
```

### React Component
Until organized into npm packages, *everything* lives in a NextJs app. Later, we will export a component:
```tsx
<DataStory server={server} diagram?={diagram} />
```

### Commands
```bash
# Add a custom node
yarn make:node YourNewNode

# Run tests
yarn test
````
