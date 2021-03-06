import { useMutation } from '@apollo/client'
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import gql from 'graphql-tag'
import { useRouter } from 'next/dist/client/router'
import nProgress from 'nprogress'
import { useState } from 'react'
import styled from 'styled-components'
import { useCart } from '../lib/cartState'
import SickButton from './styles/SickButton'
import { CURRENT_USER_QUERY } from './User'

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;

  p {
    font-size: 16px;
  }
`

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

function CheckoutForm() {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const { closeCart } = useCart()
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  )
  async function handleSubmit(e) {
    // 1. Stop the form from submitting and turns the loader on
    e.preventDefault()
    setLoading(true)
    // 2. Start the page transition
    nProgress.start()
    // 3. Create the payment method via stripe (Token comes back here if successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })
    // 4. Handle any errors from stripe
    if (error || graphQLError) {
      setError(error)
      nProgress.done()
      // stops the checkout from happening
      return
    }
    // 5. Send the token from step 3 to our keystone server, via a custom mutation.
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    })
    // 6. Change the page to view the order
    router.push({
      pathname: `/order/${order.data.checkout.id}`,
    })
    // 7. Close the cart
    closeCart()
    // 8. Turn the loader off.
    setLoading(false)
    nProgress.done()
  }
  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error ? <p>{error.message}</p> : null}
      {graphQLError ? <p>{graphQLError.message}</p> : null}
      <CardElement />
      <SickButton>Checkout Now</SickButton>
    </CheckoutFormStyles>
  )
}

function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  )
}

export { Checkout }
