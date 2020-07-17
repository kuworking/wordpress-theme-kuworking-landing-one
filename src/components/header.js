const {} = wp.element
import styled from '@emotion/styled'

export const Header = ({ content: [header_h1, header_h2_0, header_h2_1] }) => (
  <Div onClick={() => (window.location = '/')}>
    <h1>{header_h1}</h1>
    <h2>{header_h2_0}</h2>
    <h2>{header_h2_1}</h2>
  </Div>
)

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  font-family: 'Encode Sans Condensed', sans-serif;
  color: #fff;
  margin: 50% 0%;

  && > h1 {
    text-align: center;
    font-size: 80px;
    font-weight: 900;
    width: auto;
    margin: 40px 0px;
  }

  && h1,
  && h2,
  && h3,
  && h4,
  && h5 {
    line-height: 1;
    margin-top: 0;
    margin-bottom: 0;
  }
`
