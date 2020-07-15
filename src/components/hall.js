const { useEffect, useState } = wp.element
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import { useReplace100vh } from '../hooks/usereplace100vh'

const globalStyles = `
background-color: #ff4d00;
font-family: 'Open Sans';
font-size: 14px;
`

const GlobalStyles = () => (
  <Global
    styles={css`
      body {
        ${globalStyles}
      }
    `}
  />
)

export const Hall = () => {
  useReplace100vh()

  const [{ attrs: attributes }, setWp] = useState({})

  useEffect(() => {
    setWp(wp_theme_kuworking.blocks[0])
    console.log(wp_theme_kuworking)
  }, [])

  const { header_h1, header_h2_0, header_h2_1 } = attributes ? attributes : {}

  return (
    <Container>
      <GlobalStyles />
      {attributes && <Header content={[header_h1, header_h2_0, header_h2_1]} />}
    </Container>
  )
}

export const HallGutenberg = ({ attributes }) => {
  const { header_h1, header_h2_0, header_h2_1 } = attributes
  return (
    <Container gutenberg="1">
      <Header content={[header_h1, header_h2_0, header_h2_1]} />
    </Container>
  )
}

const Header = ({ content: [header_h1, header_h2_0, header_h2_1] }) => (
  <div onClick={() => (window.location = '/')}>
    <h1>{header_h1}</h1>
    <h2>{header_h2_0}</h2>
    <h2>{header_h2_1}</h2>
  </div>
)

const Container = styled.div`
  ${props => (props.gutenberg ? globalStyles : '')}
  display: flex;
  flex-direction: column;
  align-self: center;

  & > div:nth-of-type(1) {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: ${props => (props.post ? '40' : '0')}px;
    cursor: pointer;

    & > h1 {
      font-family: 'Encode Sans Condensed', sans-serif;
      color: #fff;

      text-align: center;
      font-size: 80px;
      font-weight: 900;
      width: auto;
      margin: 40px 0px;
    }
  }
`
