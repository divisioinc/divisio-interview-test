/* @flow */

import React from 'react'
import styled from 'styled-components'

import Text from './Text'

const StyledBubble = styled.div`
  background-color: ${({ direction }) => direction === 'incoming' ? '#ffffff' : '#6babf5'};
  width: 30%;
  padding: 10px;
  border-radius: 6px;
`

type Props = {
  value: string,
  direction: 'incoming' | 'outgoing',
  style: Object
}

const Bubble = ({ value, direction, style }: Props) => (
  <StyledBubble
    direction={direction}
    style={style}
  >
    <Text
      weight='light'
      color={direction === 'incoming' ? '#423f3f' : '#ffffff'}
    >
      {value}
    </Text>
  </StyledBubble>
)

export default Bubble
