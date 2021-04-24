import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import nProgress from 'nprogress'
import { useState } from 'react'
import styled from 'styled-components'
import SickButton from './styles/SickButton'

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

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

function CheckoutForm() {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
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
    if (error) {
      setError(error)
    }
    // 5. Send the token from step 3 to our keystone server, via a custom mutation.
    // 6. Change the page to view the order
    // 7. Close the cart
    // 8. Turn the loader off.
    setLoading(false)
    nProgress.done()
  }
  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error ? <p>{error.message}</p> : null}
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
