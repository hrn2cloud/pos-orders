# Welcome to your POS Orders mono repo

# This code base have 2 apps as mono repo Server and SPA

## Server
- This is code in server folder which is proxy to clover api so that CORS errors can be controlled through this app

- This app will be running as separate app locally and in cloud or target production platform
- Server will produce separate docker image from UI
- To produce docker image locally `docker build .` from `server` folder
- To run app locally `node server/server.js` after this clover api proxy can be accessed with some sample url as `http://localhost:80/api/clover/merchants/G16X89BMFT331/employees?filter=email%3Dspicemantra%40n2cloudtech.com`

👋
# Single Page Application built on using expo framework which calls api server
This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Get `.env` file from fellow developers
2. Get `stores.config.json` from fellow engineers and store in `constants` folder
3. Install dependencies

   ```bash
   npm install
   ```

4. Start the app

   ```bash
   npx expo start
   ```
5. SPA will be deployed as separate app on port 8081. Once app starts can be accessed thrpugh url `http://localhost:8081`
6. Dockerfile will help to build docker image for SPA

# Extra info on npx expo

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.




