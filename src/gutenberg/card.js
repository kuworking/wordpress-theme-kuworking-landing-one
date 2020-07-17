import { useEffect } from '@wordpress/element'
import { registerBlockType } from '@wordpress/blocks'
import styled from '@emotion/styled'

import { HallGutenberg } from '../components/hall'

registerBlockType('wp-theme-kuworking-landing-one/landing', {
  title: 'Kuworking Landing',
  icon: 'format-aside',
  category: 'kuworking',
  attributes: {
    header_h1: { type: 'string', default: '' },
    header_h2_0: { type: 'string', default: '' },
    header_h2_1: { type: 'string', default: '' },
    image_0: { type: 'string', default: '' },
    theme_link: { type: 'string', default: '' },
  },
  edit: ({ attributes, setAttributes, className }) => {
    const onChangeContent = (newContent, part) => setAttributes({ ...attributes, [part]: newContent.target.value })
    useEffect(() => {
      const initialAttributes = {
        header_h1: 'Landing ONE',
        header_h2_0: 'WordPress Theme',
        header_h2_1: 'Written in React',
        image_0: '/image.jpg',
        theme_link:
          'http://kuworking-themes-workspace.test/wp-content/themes/wordpress-theme-kuworking-landing-one/static',
      }
      const defaultAttributes = {}
      for (const a in attributes) defaultAttributes[a] = attributes[a] || initialAttributes[a]
      setAttributes(defaultAttributes)
    }, [])
    return (
      <>
        <Grid>
          <div>Header</div>
          <Input
            placeholder="Add text..."
            className={className}
            value={attributes['header_h1']}
            onChange={e => onChangeContent(e, 'header_h1')}
          />
          <div>SubHeader 1</div>
          <Input
            placeholder="Add text..."
            className={className}
            value={attributes['header_h2_0']}
            onChange={e => onChangeContent(e, 'header_h2_0')}
          />
          <div>SubHeader 2</div>
          <Input
            placeholder="Add text..."
            className={className}
            value={attributes['header_h2_1']}
            onChange={e => onChangeContent(e, 'header_h2_1')}
          />
          <div>Image from the static folder [url: /image.jpg refers to /static/image.jpg ]</div>
          <Input
            placeholder="Add image url"
            className={className}
            value={attributes['image_0']}
            onChange={e => onChangeContent(e, 'image_0')}
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
