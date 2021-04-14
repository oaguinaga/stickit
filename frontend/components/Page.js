import styled, { createGlobalStyle } from 'styled-components'
import Header from './Header'

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next' ;
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-stretch: normal;
  }

  html {
    --red: #ff4757;
    --black: #2f3640;
    --gray: #747d8c;
    --grey: var(--gray);
    --lightGray: #dcdde1;
    --lightGrey: var(--lightGray);
    --off-white: #f1f2f6;
    --max-width: 1000px;
    --bs:
      0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048),
      0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072),
      0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(0, 0, 0, 0.12);
    font-size: 10px;
  }

  body {
    font-family:'radnika_next', ---apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }

  *, *::before, *after {
    box-sizing: inherit;
  }

  a {
    text-decoration: none;
    color: var(--black);
  }

  a:hover {
    text-decoration: underline;
  }

  button {
    font-family: 'radnika_next', ---apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

const InnerStyles = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem;
`

export default function Page({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
  )
}
