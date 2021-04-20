import Link from 'next/link'
import styled from 'styled-components'

const ButtonStyles = styled.button`
  width: auto;
  background: var(--red);
  color: white;
  border: 0;
  font-size: 2rem;
  font-weight: 600;
  padding: 0.5rem 1.2rem;
`
export default function RequestResetButton() {
  return (
    <Link href="/reset">
      <ButtonStyles>Request Reset</ButtonStyles>
    </Link>
  )
}
