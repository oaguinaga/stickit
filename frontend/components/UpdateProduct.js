import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { SINGLE_ITEM_QUERY } from '../lib/gql'
import useForm from '../lib/useForm'
import DisplayError from './ErrorMessage'
import Form from './styles/Form'

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`
export default function UpdateProduct({ id }) {
  // 1. get the existing product
  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  })

  // 2. get the mutation to update the product
  const [
    updateProduct,
    { data: updatedData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION)

  // create state for the form input
  const { inputs, handleChange } = useForm(data?.Product)

  if (loading) return <p>Loading...</p>

  // 4. form to handle the updates
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault()
        // TODO: handle submit
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        }).catch(console.error)
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Price
          <textarea
            id="description"
            name="description"
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  )
}
