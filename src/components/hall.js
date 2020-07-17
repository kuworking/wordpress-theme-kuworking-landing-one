const { useEffect, useState } = wp.element
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import { useReplace100vh } from '../hooks/usereplace100vh'
import { Header } from './header'
import { Image } from './image'

const globalStyles = `
background-color: #f36451;
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

  if (!attributes) return <></>

  return (
    <>
      <GlobalStyles />
      <Components attributes={attributes} />
    </>
  )
}

export const HallGutenberg = ({ attributes }) => (
  <Body>
    <Components attributes={attributes} />
  </Body>
)

const Components = ({ attributes }) => {
  const { header_h1, header_h2_0, header_h2_1, image_0, theme_link } = attributes
  return (
    <>
      <Container>
        <Header content={[header_h1, header_h2_0, header_h2_1]} />
      </Container>
      <Container>
        <Image src={`${theme_link}${image_0}`} />
      </Container>
    </>
  )
}

const Container = styled.div`
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  align-self: center;
  flex-grow: 1;
  justify-content: center;
`

const Body = styled.div`
  ${globalStyles}
  display: flex;
  flex-direction: column;
`
