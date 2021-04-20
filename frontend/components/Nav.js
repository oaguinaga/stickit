import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import { useUser } from './User'
import SignOut from './SignOut'
import { useCart } from '../lib/cartState'

export default function Nav() {
  const user = useUser()
  const { openCart } = useCart()
  return (
    <NavStyles>
      <Link href="/products">products</Link>
      {user && (
        <>
          <Link href="/sell">sell</Link>
          <Link href="/orders">orders</Link>
          <Link href="/account">account</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            🛒
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  )
}
