import { useEffect, useState } from '@wordpress/element'
import { registerBlockType } from '@wordpress/blocks'
import styled from '@emotion/styled'

import { HallGutenberg } from '../components/hall'

registerBlockType('wp-theme-kuworking-landing-one/landing', {
  title: 'Kuworking Landing',
  icon: 'format-aside',
  category: 'kuworking',
  attributes: {
    header_h1: { type: 'string' },
    header_h2_0: { type: 'string' },
    header_h2_1: { type: 'string' },
  },
  edit: ({ attributes, setAttributes, className }) => {
    const onChangeContent = (newContent, part) => {
      // update fields
      //      fields[part].val(newContent.target.value)

      // update attributes
      setAttributes({ ...attributes, [part]: newContent.target.value })
      //      setAttributes({
      //        text: part === 'text' ? newContent.target.value : attributes.text,
      //      })
    }

    return (
      <>
        <Grid>
          <div>Header</div>
          <Input
            placeholder="Title"
            className={className}
            value={attributes['header_h1']}
            onChange={e => onChangeContent(e, 'header_h1')}
          />
          <div>SubHeader 1</div>
          <Input
            placeholder="Title"
            className={className}
            value={attributes['header_h2_0']}
            onChange={e => onChangeContent(e, 'header_h2_0')}
          />
          <div>SubHeader 2</div>
          <Input
            placeholder="Title"
            className={className}
            value={attributes['header_h2_1']}
            onChange={e => onChangeContent(e, 'header_h2_1')}
          />
        </Grid>
        <HallGutenberg attributes={attributes} />
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
