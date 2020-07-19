const { useEffect, useState } = wp.element
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import { useReplace100vh } from '../hooks/usereplace100vh'
import { Header } from './header'
import { Image } from './image'

const globalStyles = `
background-color: #f36451;
font-family: 'Handlee', handwriting;
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
  const { header_h1, header_h2_0, header_h2_1, image_0, theme_link, text_0, text_1, text_2 } = attributes
  return (
    <>
      <Header content={[header_h1, header_h2_0, header_h2_1]} />
      <Image src={`${theme_link}${image_0}`} icon={`${theme_link}/icon.svg`}>
        <div>{text_0}</div>
        <div>{text_1}</div>
        <div>{text_2}</div>
      </Image>
    </>
  )
}

const Body = styled.div`
  ${globalStyles}
  display: flex;
  flex-direction: column;
`
