import Link from 'next/link'
import styled from 'styled-components'
import Cart from './Cart'
import Nav from './Nav'

const Logo = styled.h1`
  background: var(--red, red);
  font-size: 4rem;
  z-index: 2;
  position: relative;
  margin-left: 2rem;
  transform: skew(-7deg);

  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }
`

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">Stickit</Link>
        </Logo>
        <Nav />
      </div>

      <div className="sub-bar">
        <p>Search</p>
      </div>
      <Cart />
    </HeaderStyles>
  )
}
