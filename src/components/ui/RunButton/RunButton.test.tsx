import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RunButton from './RunButton';

configure({ adapter: new Adapter() });

describe('<RunButton>', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <RunButton></RunButton>
    );
  });

  it('mounts without crashing', () => {
    wrapper.unmount();
  });
});
