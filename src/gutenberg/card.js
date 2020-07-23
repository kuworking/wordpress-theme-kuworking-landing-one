import { useEffect, useState } from '@wordpress/element'
import { registerBlockType } from '@wordpress/blocks'
import styled from '@emotion/styled'

import { HallGutenberg } from '../components/hall'

// change the theme folder name if needed
const theme_link = '/wp-content/themes/wordpress-theme-kuworking-landing-one/static'

registerBlockType('wp-theme-kuworking-landing-one/landing', {
  title: 'Kuworking Landing',
  icon: 'format-aside',
  category: 'kuworking',
  attributes: {
    header_h1: { type: 'string', default: '' },
    header_h2_0: { type: 'string', default: '' },
    header_h2_1: { type: 'string', default: '' },
    image_0: { type: 'string', default: '' },
    image_1: { type: 'string', default: '' },
    text_0: { type: 'string', default: '' },
    text_1: { type: 'string', default: '' },
    text_2: { type: 'string', default: '' },
    theme_link: { type: 'string', default: '' },
  },
  edit: ({ attributes, setAttributes, className }) => {
    const onChangeContent = (newContent, part) => setAttributes({ ...attributes, [part]: newContent.target.value })
    const Icon = () => (
      <img
        style={{ width: '25px', height: '25px', marginRight: '10px' }}
        src={attributes.theme_link + '/accept.svg'}
        alt="emoji"
      />
    )
    const [space_1, setSpace_1] = useState()
    useEffect(() => {
      const initialAttributes = {
        header_h1: 'Landing ONE',
        header_h2_0: 'WordPress Theme',
        header_h2_1: 'Written in React',
        image_0: '/image.jpg',
        image_1: '/icon.svg',
        text_0: 'Lorem ipsum dolor sit amet consectetur adipiscing elit mauris',
        text_1: 'Luctus aliquet nascetur potenti tortor',
        text_2:
          'Velit etiam dis libero consequat class a sociis fames, habitant varius porta conubia mi id vehicula morbi lectus, porttitor mus cum viverra tellus convallis gravida',
          theme_link: theme_link,
        }
      const defaultAttributes = {}
      for (const a in attributes) defaultAttributes[a] = attributes[a] || initialAttributes[a]
      setAttributes(defaultAttributes)

      const start = document.getElementById('first_block_end').offsetTop
      const end = document.getElementById('second_block_start').offsetTop
      setSpace_1(end - start)
    }, [])

    return (
      <Gutenberg>
        <HallGutenberg attributes={attributes} />
        <Grid>
          <div>
            <Icon />
            Header
          </div>
          <Input
            placeholder="Add text..."
            className={className}
            value={attributes['header_h1']}
            onChange={e => onChangeContent(e, 'header_h1')}
          />
          <div>
            <Icon />
            SubHeader 1
          </div>
          <Input
            placeholder="Add text..."
            className={className}
            value={attributes['header_h2_0']}
            onChange={e => onChangeContent(e, 'header_h2_0')}
          />
          <div>
            <Icon />
            SubHeader 2
          </div>
          <Input
            placeholder="Add text..."
            className={className}
            value={attributes['header_h2_1']}
            onChange={e => onChangeContent(e, 'header_h2_1')}
          />
          <div id="first_block_end" style={{ marginTop: space_1 + 'px' }}></div>
          <div>
            <Icon />
            Images from the /static folder - Background image
          </div>
          <Input
            placeholder="Add image url"
            className={className}
            value={attributes['image_0']}
            onChange={e => onChangeContent(e, 'image_0')}
          />
          <div>
            <Icon />
            Images from the /static folder - Astronaut image
          </div>
          <Input
            placeholder="Add image url"
            className={className}
            value={attributes['image_1']}
            onChange={e => onChangeContent(e, 'image_1')}
          />
          <div>
            <Icon />
            First text
          </div>
          <Textarea
            placeholder="Add text"
            className={className}
            value={attributes['text_0']}
            onChange={e => onChangeContent(e, 'text_0')}
          />
          <div>
            <Icon />
            Second text
          </div>
          <Textarea
            txa_height="50px"
            placeholder="Add text"
            className={className}
            value={attributes['text_1']}
            onChange={e => onChangeContent(e, 'text_1')}
          />
          <div>
            <Icon />
            Third text
          </div>
          <Textarea
            txa_height="300px"
            placeholder="Add text"
            className={className}
            value={attributes['text_2']}
            onChange={e => onChangeContent(e, 'text_2')}
          />
        </Grid>
      </Gutenberg>
    )
  },
  save: () => null,
})

const Gutenberg = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  border: 2px solid #ffd9d4;
  padding: 10px;
  border-radius: 5px;
`

const Grid = styled.div`
  display: grid;
  font-family: 'Open Sans';
  align-content: baseline;
  padding: 10px;

  & > div {
    margin: 10px 0px;
    display: flex;
    align-items: center;
    line-height: 1;
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
    min-height: ${props => props.txa_height || '100px'};
    font-size: 16px;
    font-family: 'Open Sans';
  }
`
