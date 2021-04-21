import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import styled from 'styled-components'

const REMOVE_CART_ITEM_MUTATION = gql`
  mutation REMOVE_CART_ITEM_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`
const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;

  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`
function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem))
}

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_CART_ITEM_MUTATION, {
    variables: { id },
    update,
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: 'CartItem',
    //     id,
    //   },
    // },
  })
  console.log(id)
  return (
    <BigButton
      disabled={loading}
      type="button"
      title="Remove this item from cart"
      onClick={removeFromCart}
    >
      &times;
    </BigButton>
  )
}
