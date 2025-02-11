```bash
npm i -g vercel
```

создать файлик vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "./index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}
```

для деплоя:

```bash
vercel --prod

set up and deploy [Y/n] y
pick the account
link to existing project [Y/n] n
What's your project's name? your-proj-name
```

# ENV

https://vercel.com/docs/cli/env
