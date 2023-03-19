## DataStory v2 under construction :dizzy: :construction:
![image](https://user-images.githubusercontent.com/3457668/224472352-d40ff51b-3837-4672-a9f0-ee1a99ce2a9e.png)

### Development installation
Until this repo is packaged into a npm packages, it lives in a NextJS application.

```bash
# Start the client
git clone git@github.com:ajthinking/data-story-v2.git
yarn
yarn dev

# Start the server in a new tab
npx ts-node server/socket.ts
```

### Adding a new Node
You may add a new Node by using the command
```bash
yarn compose YourNewNode
```