# Getting this module directly from GitHub

Instead of downloading the .tgz file, you can just include this module package in your dependencies in the package.json file and have NPM download the package.

### Use GitHub as the NPM registry

In your project, create a `.npmrc` file at the root of your project with the following content:

```
registry=https://npm.pkg.github.com/mydobie
```

If you need to use packages from multiple GitHub organizations, use the following format:

```
registry=https://npm.pkg.github.com/mydobie
@OTHERORG:registry=https://npm.pkg.github.com
@ANOTHERORG:registry=https://npm.pkg.github.com
@babel:registry=https://npm.pkg.github.com
```

### Logging into GitHub

You need to login to GitHub in order to use it as a npm registry. There are two ways to login to GitHub: login via the command line before downloading the packages.

Both methods require you to use a personal access token. [How to create a personal access token.](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

Ensure that both `repo` and `read:packages` scopes have been set.

**Note** Do not check in any files that contain the personal access token.

#### Login-in option 1 - Using command line

After the .npmrc file has been created, run the following in a command line: `npm login` and then enter the login information:

```
  $ npm login --registry=https://npm.pkg.github.com
  > Username: GITHUB_USERNAME
  > Password: TOKEN
  > Email: PUBLIC-EMAIL-ADDRESS
```

Note: You will need to re-log in with each new terminal window.

#### Login-in option 2 - Using .npmrc file

Instead of logging in via the command line, you can add the following to the top of the .npmrc file:

```
//npm.pkg.github.com/:_authToken=TOKEN
```

Replace `TOKEN` with your personal access token.

### Install package

In the project that you would like to include the UofM web template components, add web components to your `package.json` file:

```
...
dependencies: {
  "@mydobie/sort-table": "3.0.0",
  ...
}
...
```

But replace the version number with the wanted version.

Then run `npm install`.
