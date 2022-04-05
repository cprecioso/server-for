# server-for

This CLI utility stands up a static file HTTP server, which only runs for the duration of the command passed to it. This is ideal e.g. for testing against a Storybook.

```diff
 {
   "name": "my-package",
   "scripts": {
-    "test-storybook": "concurrently -k -s first -n \"SB,TEST\" -c \"magenta,blue\" \"yarn build-storybook --quiet && npx http-server storybook-static --port 6006 --silent\" \"wait-on tcp:6006 && yarn test-storybook\""
+    "test-storybook": "server-for -p 6006 -d storybook-static \"yarn test-storybook\""
   },
   "devDependencies": {
-    "concurrently": "...",
-    "http-server": "...",
-    "wait-on": "..."
+    "server-for": "..."
   }
 }
```

# Usage

> Make sure you're using Node.js 16 or later.

## In your `package.json` (recommended)

```sh
$ npm install -D server-for # if you use npm
$ yarn add --dev server-for # if you use yarn
```

You're now ready to use it inside a script as pictured above.

## Standalone

```sh
# if you use npm
$ npm install -D server-for
$ npx server-for your-command

# if you use yarn
$ yarn add --dev server-for
$ yarn server-for your-command
```

## Without installation

```sh
$ npx server-for your-command
```

# Options

- **`-p,--port`:** Set the port in which the server should listen (default: `8080`)
- **`-d,--dir`:** Set the dir that should be server (default: `public`)
