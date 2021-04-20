import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import Form from './styles/Form'
import useForm from '../lib/useForm'
import DisplayError from './ErrorMessage'

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  })

  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  )

  async function handleSubmit(e) {
    e.preventDefault()
    await signup().catch(console.error)
    resetForm()
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <DisplayError error={error} />

      <h2>Request Password Reset</h2>
      <fieldset disabled={loading}>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! check your email for a link!</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Your Email Address"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  )
}
