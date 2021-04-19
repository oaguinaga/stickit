import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import Form from './styles/Form'
import useForm from '../lib/useForm'
import DisplayError from './ErrorMessage'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
  })

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  })

  async function handleSubmit(e) {
    e.preventDefault()
    await signup().catch(console.error)
    resetForm()
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <DisplayError error={error} />

      <h2>Sign Up</h2>
      <fieldset>
        {data?.createUser && (
          <p>
            Signed up with {data?.createUser.email} - Please go ahead and sign
            in
          </p>
        )}
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  )
}
