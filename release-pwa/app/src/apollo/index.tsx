import fetch from 'unfetch'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink, FetchOptions } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import httpOrigin from './origin'
import deviceType from './device'

// HTTP options 
let httpOptions: FetchOptions = {
    uri: `graphql`,
    credentials: 'same-origin',
    useGETForQueries: true
}

if (deviceType.isMobile()) {
    httpOptions = Object.assign(httpOptions, {
        fetch: fetch
    })
}

// HTTP connection to the API
const httpLink: ApolloLink = createHttpLink({
    ...httpOptions
})

// HTTP headers middleware
const middlewareLink: ApolloLink = new ApolloLink((operation: any, forward: any) => {
    const token: string = ''

    operation.setContext({
        headers: {
            Authorization: `Bearer ${token}` || null
        }
    })

    return forward(operation)
})

// Cache implementation
const cache: InMemoryCache = new InMemoryCache({
    addTypename: false,
})

// Create the apollo client
const apolloClient: any = new ApolloClient({
    link: middlewareLink.concat(httpLink),
    cache,
    connectToDevTools: true
})

// Create the apolo options
const apolloOptions: any = {
    defaultClient: apolloClient,
    defaultOptions: {
        $query: {
            loadingKey: 'loadding',
            fetchPolicy: 'cache-and-network'
        }
    },
    errorHandler: (error: any) => {
        console.error(error)
    }
}

export default apolloOptions