jest.unmock('../Header');

import React from 'react';
import {shallow} from 'enzyme';
import Header from '../Header';

describe('Header', () => {
    let tree;

    beforeEach(() => {
        tree = shallow(<Header />);
    });

    it('renders', () => {
        expect(tree.length).toBe(1);
    });
});