const fs = require('fs')
const request = require('request-promise')
const throng = require('throng')

const NUM_REQUESTS = 10000

async function authenticate() {
  const { jwt } = await request.post({
    url: 'http://localhost:3001/users/auth',
    json: true,
    body: {
      username: 'root',
      password: 'r00t',
    },
  })
  return jwt
}

async function findUsers(jwt) {
  try {
    await request.get({
      url: 'http://localhost:3001/users?firstName=r',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      json: true,
    })
  } catch (err) {
    console.log(err)
  }
  return undefined
}

throng(async () => {
  const jwt = await authenticate()
  const out = fs.createWriteStream(`${__dirname}/node-api-boilerplate-loadtest-data-combined.txt`, { flags: 'a' })
  for (let i = 0; i < NUM_REQUESTS; i++) {
    const start = new Date()
    await findUsers(jwt)
    const end = new Date()
    out.write(`${JSON.stringify({ start, end })}\n`)
  }
  out.close()
})
