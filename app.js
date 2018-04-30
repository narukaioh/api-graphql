import restify from 'restify'
import { graphqlRestify, graphiqlRestify } from 'apollo-server-restify'

const PORT = 9000

const server = restify.createServer({
    title: 'Apollo Server'
})

const mySchema = `

    type User {
        name: String!
        email: String!
    }

`

const graphQLOptions = { schema: mySchema }

server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser())

server.post('/graphql', graphqlRestify(graphQLOptions))
server.get('/graphql', graphqlRestify(graphQLOptions))

server.get('/graphiql', graphiqlRestify({ endpointURL: '/graphql' }))

server.listen(PORT, () => console.log(`Listening on ${PORT}`));