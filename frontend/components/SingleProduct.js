import { gql, useQuery } from '@apollo/client'
import Head from 'next/head'
import styled from 'styled-components'
import DisplayError from './ErrorMessage'
import { SINGLE_ITEM_QUERY } from '../lib/gql'

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--max-width);
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  })
  if (loading) return <p>Loading...</p>
  if (error) return <DisplayError error={error} />
  const { Product } = data
  return (
    <ProductStyles>
      <Head>
        <title>Stickit | {Product.name}</title>
      </Head>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.altText}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </ProductStyles>
  )
}
