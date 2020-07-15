import { useEffect, useState } from '@wordpress/element'
import { registerBlockType } from '@wordpress/blocks'
import styled from '@emotion/styled'

import { Header } from '../components/hall'

registerBlockType('wp-theme-kuworking-landing-one/header', {
  title: 'Kuworking Header',
  icon: 'format-aside',
  category: 'kuworking',
  attributes: {
    text: { type: 'string' },
  },
  edit: ({ attributes, setAttributes, className }) => {
    const fields = {
      text: acf.getField('field_kw_theme_grid_text'),
    }

    const onChangeContent = (newContent, part) => {
      fields[part].val(newContent.target.value)
      setAttributes({
        text: part === 'text' ? newContent.target.value : attributes.text,
      })
    }

    const getValue = part => attributes[part] || fields[part].val()

    return (
      <>
        <Grid>
          <div>Header</div>
          <Textarea
            placeholder="text"
            className={className}
            value={getValue('text')}
            onChange={e => onChangeContent(e, 'text')}
          />
        </Grid>
        <Header />
      </>
    )
  },
  save: () => null,
})

/**
 * Block for entering pins
 */
registerBlockType('wp-theme-kuworking-landing-one/header2', {
  title: 'Kuworking Header 22',
  icon: 'format-aside',
  category: 'kuworking',
  attributes: {
    code: { type: 'string' },
    text: { type: 'string' },
  },
  edit: ({ attributes, setAttributes, className }) => {
    const [changed, setChanged] = useState({})

    const fields = {
      code: acf.getField('field_kw_theme_grid_code'),
      text: acf.getField('field_kw_theme_grid_text'),
    }

    const onChangeContent = (newContent, part) => {
      // update the acf field
      fields[part].val(newContent.target.value)

      // update the state here
      setAttributes({
        code: part === 'code' ? newContent.target.value : attributes.code,
        text: part === 'text' ? newContent.target.value : attributes.text,
      })
      setChanged({})
    }

    // get value from the attributes, and if not yet stored, from the acf field
    const getValue = part => attributes[part] || fields[part].val()

    const type = getValue('code')
      ? (getValue('code').indexOf('pinterest') >= 0 && 'pinterest') ||
        (getValue('code').indexOf('instagram') >= 0 && 'instagram') ||
        (getValue('code').indexOf('youtube') >= 0 && 'youtube') ||
        'text'
      : 'text'

    return (
      <>
        <Grid>
          <div>Embed code from Pinterest, Instagram or Youtube</div>
          <Input
            placeholder="embed code"
            className={className}
            value={getValue('code')}
            onChange={e => onChangeContent(e, 'code')}
          />
          <div>Text (optional)</div>
          <Textarea
            placeholder="text"
            className={className}
            value={getValue('text')}
            onChange={e => onChangeContent(e, 'text')}
          />
        </Grid>

        <Container>
          <Card
            post={{
              acf: {
                code: getValue('code'),
                text: getValue('text'),
              },
            }}
            type={type}
          />
        </Container>
      </>
    )
  },
  save: () => null,
})

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto;
  align-items: center;
  font-family: 'Open Sans';

  & > div {
    margin: 0px 10px;
  }
`

const Input = styled.input`
  && {
    border: 0px;
    border-radius: 8px;
    padding: 8px;
    margin: 2px 2px 20px 2px;
    width: 100%;
    min-width: 300px;
    background: #f3f3f2;
  }
`

const Textarea = styled.textarea`
  && {
    border: 0px;
    border-radius: 8px;
    padding: 8px;
    margin: 2px;
    width: 100%;
    min-width: 300px;
    background: #f3f3f2;
    min-height: 100px;
    font-size: 16px;
    font-family: 'Open Sans';
  }
`

const Container = styled.div`
  margin-top: 40px;
  background: rgb(242, 242, 242);
  padding: 40px;
  display: flex;
  justify-content: center;

  & > a {
    width: 100%;
  }
`
