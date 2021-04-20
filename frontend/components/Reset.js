import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import Form from './styles/Form'
import useForm from '../lib/useForm'
import DisplayError from './ErrorMessage'

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  })

  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  })
  const successfulError =
    data?.redeemUserPasswordResetToken?.code &&
    data?.redeemUserPasswordResetToken

  async function handleSubmit(e) {
    e.preventDefault()
    await reset().catch(console.error)
    resetForm()
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <DisplayError error={error || successfulError} />

      <h2>Reset Password</h2>

      <fieldset disabled={loading}>
        {loading && <p>Loading...</p>}
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! you can now sign in</p>
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
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            autoComplete="password"
            placeholder="Password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  )
}
