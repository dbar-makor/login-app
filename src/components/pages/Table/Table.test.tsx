import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Table from './Table';

configure({ adapter: new Adapter() });

describe('<Settings>', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Table></Table>
    );
  });

  it('mounts without crashing', () => {
    wrapper.unmount();
  });
});
