const {} = wp.element
import styled from '@emotion/styled'

export const Image = ({ src, icon, children }) => (
  <Background src={src} id="second_block_start">
    <Div>
      <div>
        <img src={icon} alt="" />
      </div>
      <div>{children}</div>
    </Div>
  </Background>
)

const q = px => `@media (min-width: ${px}px)`

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  ${q(600)} {
    grid-template-columns: 2fr 1fr;
  }

  max-width: 800px;
  margin-top: 300px;
  font-size: 20px;
  color: #fff;
  padding: 10px;
  ${q(600)} {
    padding: 40px;
  }

  & > div:nth-of-type(1) {
    & img {
      max-width: 400px;
      max-height: 424px;
    }
  }

  & > div:nth-of-type(2) {
    & div {
      margin: 20px 0px;
    }
    & > div:nth-of-type(2) {
      font-size: 40px;
      font-weight: 700;
      line-height: 1;
    }
    & > div:nth-of-type(3) {
      margin-bottom: 200px;
      ${q(600)} {
        margin-bottom: unset;
      }
    }
  }
`

const Background = styled.div`
  background: url("${props => props.src}") no-repeat center center;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  align-items: center;
`
