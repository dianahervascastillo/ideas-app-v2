import React from 'react'
import {shallow} from 'enzyme'
import Notice from './Notice'

describe('Notice Unit Tests', () => {
  it('should display a notice', () => {
    // When
    const wrapper = shallow(
      <Notice />
    )

    // Then
    expect(wrapper.find('.notification').text()).toEqual('The changes to the idea have been saved!')
  })
})
