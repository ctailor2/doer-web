jest.unmock('../App');

import {App} from '../App.js';
import React from 'react';
import {shallow} from 'enzyme';

describe('App', () => {
    let tree, pingApiActionFn;

    beforeEach(() => {
        pingApiActionFn = jest.fn();
        tree = shallow(<App pingApiAction={pingApiActionFn}/>);
    });

    it('renders', () => {
        expect(tree.length).toBe(1);
    });

    it('fires ping api action', () => {
        expect(pingApiActionFn).toBeCalled();
    });

    it('has a header', () => {
        expect(tree.find('Header').length).toBe(1);
    });
});