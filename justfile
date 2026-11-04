# https://just.systems

default:
    echo 'Hello, world!'

check:
    npm run typecheck && npm run lint && npx vitest run && npm run build