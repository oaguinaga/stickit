import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import ErrorMessage from '../components/ErrorMessage'
import OrderItemStyles from '../components/styles/OrderItemStyles'
import formatMoney from '../lib/formatMoney'

const USER_ORDER_QUERY = gql`
  query USER_ORDER_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        price
        name
        quantity
        description
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`

function countItemsInOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0)
}

export default function OrderPage() {
  const { data, error, loading } = useQuery(USER_ORDER_QUERY)
  if (loading) return <p>Loading...</p>
  if (error) return <ErrorMessage error={error} />
  const { allOrders } = data
  return (
    <div>
      <Head>
        <title>Your Orders ({allOrders.length})</title>
      </Head>
      <h2>You have {allOrders.length} orders!</h2>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link href={`/order/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>{countItemsInOrder(order)} Items</p>
                  <p>{order.items.length}</p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      key={`image-${item.id}`}
                      src={item.photo?.image?.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  )
}
