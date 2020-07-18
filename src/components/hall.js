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
  const { header_h1, header_h2_0, header_h2_1, image_0, theme_link } = attributes
  return (
    <>
      <Header content={[header_h1, header_h2_0, header_h2_1]} />
      <Image src={`${theme_link}${image_0}`} icon={`${theme_link}/icon.svg`}>
        <div>Lorem ipsum dolor sit amet consectetur adipiscing elit mauris</div>
        <div>Luctus aliquet nascetur potenti tortor</div>
        <div>
          Velit etiam dis libero consequat class a sociis fames, habitant varius porta conubia mi id vehicula morbi
          lectus, porttitor mus cum viverra tellus convallis gravida
        </div>
      </Image>
    </>
  )
}

const Body = styled.div`
  ${globalStyles}
  display: flex;
  flex-direction: column;
`
