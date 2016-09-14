jest.unmock('../App');

import {App, mapStateToProps} from '../App';
import React from 'react';
import {shallow} from 'enzyme';
import {browserHistory} from 'react-router';

describe('App', () => {
    let tree, redirectFn;

    beforeEach(() => {
        redirectFn = jest.fn();
        browserHistory.push = redirectFn;
        tree = shallow(<App session={{}}/>);
    });

    it('renders', () => {
        expect(tree.length).toBe(1);
    });

    it('fires no session action when session is empty', () => {
        expect(redirectFn).toBeCalledWith('/signup');
    });

    it('does not redirect to signup when session is not empty', () => {
        redirectFn.mockClear();
        tree.setProps({session: {token: 'token'}});
        expect(redirectFn).not.toBeCalled();
    });

    describe('when rendered', () => {
        beforeEach(() => {
            tree.setProps({session: {token: 'token'}});
        });

        it('has a header', () => {
            expect(tree.find('Header').length).toBe(1);
        });
    });

    it('maps state to props', () => {
        let state = {session: {token: 'token'}};
        expect(mapStateToProps(state)).toEqual({
            session: {token: 'token'}
        });
    });
});