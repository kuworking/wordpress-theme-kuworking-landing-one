const { useEffect, useState } = wp.element
import styled from '@emotion/styled'

import { Structure } from '@kuworking/block-landing-three'

export const Hall = () => {
  const [{ attrs: attributes }, setWp] = useState({})

  useEffect(() => {
    setWp(wp_theme_kuworking.blocks[0])
  }, [])

  if (!attributes) return <></>

  return <Structure attributes={attributes} />
}

export const HallGutenberg = ({ attributes }) => {
  attributes.gutenberg = true

  return (
    <Body>
      <Structure attributes={attributes} />
    </Body>
  )
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    width: 100%;
    min-height: 500px;
  }
`
