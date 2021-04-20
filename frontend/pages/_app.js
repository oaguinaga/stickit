/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import NProgress from 'nprogress'
import Router from 'next/router'
import { ApolloProvider } from '@apollo/client'
import { CartStateProvider } from '../lib/cartState'
import Page from '../components/Page'

import '../components/styles/nprogress.css'
import withData from '../lib/withData'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  )
}

// tell NextJS to go and fetch data from children components
MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  pageProps.query = ctx.query
  return { pageProps }
}

// Export myApp app wrapped inside withData to inject apollo client data
export default withData(MyApp)
