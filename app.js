import restify from 'restify'
import { graphqlRestify, graphiqlRestify } from 'apollo-server-restify'
import { makeExecutableSchema } from 'graphql-tools'

const PORT = 9000

const server = restify.createServer({
    title: 'Apollo Server'
})

const typeDefs = [`
    type Query {
        hello: String
    }

    schema {
        query: Query
    }
`]

const resolvers = {
    Query: {
        hello(root) {
        return 'world';
        }
    }
}

const mySchema = makeExecutableSchema({ typeDefs, resolvers })

const graphQLOptions = { schema: mySchema }

server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser())

server.post('/graphql', graphqlRestify(graphQLOptions))
server.get('/graphql', graphqlRestify(graphQLOptions))

server.get('/graphiql', graphiqlRestify({ endpointURL: '/graphql' }))

server.listen(PORT, () => console.log(`Listening on ${PORT}`));