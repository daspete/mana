const { ApolloServer } = require('apollo-server-express')

const HttpServer = require('manablox-httpserver')

const LoadGraphQLResolvers = require('manablox-utils/LoadGraphQLResolvers')
const LoadGraphQLSchemas = require('manablox-utils/LoadGraphQLSchemas')

class GraphQLServer {
    constructor(){
        this.config = null

        this.typeDefs = null
        this.resolvers = null

        this.httpServer = new HttpServer()
        this.logger = this.httpServer.logger
    }

    Initialize(serverConfig, graphqlConfig){
        this.httpServer.Initialize(serverConfig)

        if(!graphqlConfig){
            this.logger.Log('no graphql config defined')
            return
        }

        this.config = graphqlConfig

        this.typeDefs = LoadGraphQLSchemas(this.config.folders.schemas)
        this.resolvers = LoadGraphQLResolvers(this.config.folders.resolvers)
    }

    Start(){
        this.graphServer = new ApolloServer({
            typeDefs: this.typeDefs,
            resolvers: this.resolvers
        }).applyMiddleware({ 
            app: this.httpServer.app,
            path: this.config.path
        })

        this.httpServer.Start()
    }
}

module.exports = GraphQLServer