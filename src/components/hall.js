const { useEffect, useState } = wp.element
import styled from '@emotion/styled'

export const Hall = () => {
  const [{ header, posts, entrades, post, user, user_posts }, setWp] = useState({
    header: {},
    posts: null,
    entrades: null,
    post: null,
    user: {},
    user_posts: [],
  })

  useEffect(() => {
    setWp(wp_theme_kuworking)
    console.log(wp_theme_kuworking)
  }, [])

  return (
    <Container>
      <Header />
    </Container>
  )
}

export const Header = () => (
  <div onClick={() => (window.location = '/')}>
    <h1>Cases Petites 2</h1>
  </div>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${props => (props.post ? '800' : '1200')}px;
  width: calc(100% - 20px);
  align-self: center;

  & > div:nth-of-type(1) {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: ${props => (props.post ? '40' : '0')}px;
    cursor: pointer;

    & > h1 {
      font-family: 'Encode Sans Condensed', sans-serif;
      text-align: center;
      font-weight: unset;
      font-size: 80px;
      width: auto;
      text-transform: uppercase;
      margin: 0;
    }
  }
`
