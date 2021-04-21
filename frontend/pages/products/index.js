import { useRouter } from 'next/dist/client/router'
import styled from 'styled-components'
import Pagination from '../../components/Pagination'
import Products from '../../components/Products'

const PaginationContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
`

export default function ProductPage() {
  const { query } = useRouter()
  const page = parseInt(query.page)
  return (
    <PaginationContainerStyles>
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </PaginationContainerStyles>
  )
}
