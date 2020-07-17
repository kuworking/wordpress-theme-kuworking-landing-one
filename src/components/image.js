const {} = wp.element
import styled from '@emotion/styled'

export const Image = ({ src }) => (
  <Div>
    <img src={src} alt="" />
  </Div>
)

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
