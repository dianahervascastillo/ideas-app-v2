import React from 'react';
import {shallow, mount} from 'enzyme';
import AddNewCard from './AddNewCard';

describe('Add New Card Unit Tests', () => {
  it('should display an add new card form', () => {
    const onsubmitHandler = jest.fn()
    const ideas = {
      newTitle: '',
      newDescription: ''
    }
    // When
    const wrapper = shallow (
      <AddNewCard
        newTitle={ideas.newTitle}
        newDescription={ideas.newDescription}
        onSubmit={onsubmitHandler} />
    )

    // Then
    expect(wrapper.find('.add-new-idea').length).toBe(1);
    expect(wrapper.find('button').text()).toBe('Add Idea');
    expect(wrapper.find('input[type="text"]').text()).toBe('');
    // Then
    wrapper.find('button').simulate('click')
    expect(onsubmitHandler).toHaveBeenCalled();

  })
})
