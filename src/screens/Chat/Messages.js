/* @flow */

import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'
import shortId from 'shortid'
import axios from 'axios'

import sendIcon from '../../assets/send.svg'

import { IsLoading, Input } from '../../style-guide'

import MessageItem from './MessageItem'

const StyledMessages = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`

const MessagesContainer = styled.div`
  flex: 1;
  flex-shrink: 0;
  padding: 20px 40px;
  overflow-y: auto;
`

const StyledSendButton = styled.button`
  border: 0;
  outline: none;
  padding: 0;
  margin-left: 15px;
  cursor: pointer;
  background-color: transparent;
`

const StyledIcon = styled.img`
  width: 32px;
`

const StyledFooter = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 15px;
  background-color: #edeced;
`

class Messages extends React.Component {

  static propTypes = {
    conversationId: string
  }

  constructor(props) {
    super(props)

    this.state = {
      text: '',
      messages: [],
      isFetching: false
    }

    this.createMessage = this.createMessage.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.conversationId !== nextProps.conversationId) {
      this.setState({
        isFetching: true
      })

      axios.get(`/conversations/${this.props.conversationId}`).then((response) => {
        const { data: { data: { messages } } } = response
        
        this.setState({
          messages,
          isFetching: false
        })
      })
    }
  }

  createMessage = () => {
    if (!this.state.text) return

    this.setState({
      text: '',
      messages: [
        ...this.state.messages,
        {
          uuid: shortId.generate(),
          body: this.state.text,
          direction: 'outgoing',
          created_at: new Date().toISOString()
        }
      ]
    })
  }

  render() {
    const { text, messages, isFetching } = this.state

    return (
      <StyledMessages>
        <IsLoading loading={isFetching}>
          <MessagesContainer>
            {messages.map(({ uuid, body, direction }) => (
              <MessageItem
                key={uuid}
                message={body}
                direction={direction}
              />
            ))}
          </MessagesContainer>
        </IsLoading>
        <StyledFooter>
          <Input
            value={text}
            onChange={({ target: { value } }) => this.setState({ text: value })}
            onEnter={this.createMessage}
            placeholder='Type a message'
          />
          <StyledSendButton onClick={this.createMessage}>
            <StyledIcon src={sendIcon} />
          </StyledSendButton>
        </StyledFooter>
      </StyledMessages>
    )
  }
}

export default Messages
