import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/link-error'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { createUploadLink } from 'apollo-upload-client'
import withApollo from 'next-with-apollo'
import { endpoint, prodEndpoint } from '../config'
import paginationField from './paginationField'

function createClient({ headers, initialState }) {
  return new ApolloClient({
    link: ApolloLink.from([
      // Error handling link from ApolloClient
      onError(({ graphQLErrors, networkError }) => {
        // graphQL error like password is wrong or requesting a field that does not exists
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          )
        // Network error (backend not running, cors...)
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          )
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      createUploadLink({
        uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
        fetchOptions: {
          credentials: 'include',
        },
        // pass the headers along from this request. This enables SSR with logged in state
        headers,
      }),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // We manage cache for allProducts filed for deleting items
            // TODO: We will add this together!
            allProducts: paginationField(),
          },
        },
      },
    }).restore(initialState || {}),
  })
}

export default withApollo(createClient, { getDataFromTree })
