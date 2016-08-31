jest.unmock('../App');

import App from '../App.js';
import React from 'react';
import {shallow} from 'enzyme';

describe('App', () => {
    let tree;

    beforeEach(() => {
        tree = shallow(<App />);
    });

    it('renders', () => {
        expect(tree.length).toBe(1);
    });

    it('has a header', () => {
        expect(tree.find('Header').length).toBe(1);
    });
});