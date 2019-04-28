import React from 'react'
import {shallow} from 'enzyme'
import Card from './Card'

describe('Card Unit Tests', () => {
  it('should display a card with children and a custom-class', () => {
    // When
    const wrapper = shallow (
      <Card extraClassNames='custom-class'>
        <div>Some Text</div>
      </Card>
    )

    // Then
    expect(wrapper.find('.custom-class').length).toBe(1);
    expect(wrapper.find('div').first().text()).toEqual('Some Text');

  })
})
