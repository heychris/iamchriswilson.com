# Repository for [iamchriswilson.com](https://iamchriswilson.com)

My personal website built using Gatsby and Netlify.

---

## TypeScript + React (.tsx)

All React compontents are built using TypeScript (.tsx). [Netlify-lambda](https://github.com/netlify/netlify-lambda) is used as an extra build step to make this TypeScript addition work.

## Updating Content

Homepage content is located in `src/pages/index.md` and is Markdown formatted. Additionally, Netlify CMS is setup with the website so invited users can edit the same content by visiting `/admin`. Netlify will sync content changes with Github.

## Installation and Setup

Fork this repo if you are making any updates. Otherwise you can delete my remote origin and [add your own](https://help.github.com/en/github/using-git/changing-a-remotes-url).

**Note: I use [yarn](https://github.com/yarnpkg/yarn) in my build steps, but you can swap it out for npm.**

1. Download the repository and install the dependencies.
   ```
   git clone git@github.com:heychris/iamchriswilson.com.git
   cd iamchriswilson.com
   yarn install
   ```
2. And start developing!
   ```
   yarn develop
   ```
   Navigate to the <ip>:<port> specified in the command output. Assuming port 8000 is available it will default to `localhost:8000`.

That's it. If something looks wrong file and issue or submit a pull request.

## License

[MIT](https://github.com/heychris/iamchriswilson.com/blob/master/LICENSE)
