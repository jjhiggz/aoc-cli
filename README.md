# advent-cli

- advent-cli is a tool to setup a new day for advent of code.

## Project Setup

- Clone the repo or use it as a template

If you want to use bun run...

```
bun i
```

If you want to use node (with vitest) run it with your package manager of choice

```
npm i
```

Then just run the "lets-go" script in your package.json to setup for the current day

```
npm run
```

If you want to setup for a different day you can pass in the `year`, `day`,`environment`,`openInEditor` as arguments like so

```sh
npx tsx index.ts --year=2019 --day=1 --environment=bun --openInEditor=false
```

or in bun

```sh
bun index.ts --year=2019 --day=1 --environment=bun  --openInEditor=false
```

That's it! You're ready to go!
