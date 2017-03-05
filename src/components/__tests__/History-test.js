jest.unmock('../History');

import React from 'react';
import {shallow} from 'enzyme';
import {History, mapStateToProps} from '../History';

describe('History', () => {
    let tree;

    beforeEach(() => {
        tree = shallow(<History todos={[]}/>);
    });

    it('renders', () => {
        expect(tree.length).toBe(1);
    });

    it('maps state to props', () => {
        let state = {todos: {completed: [1, 2, 3]}};
        expect(mapStateToProps(state)).toEqual({
            todos: [1, 2, 3]
        });
    });

    describe('when there are todos', () => {
        beforeEach(() => {
            tree.setProps({todos: [
                {task: 'celebrate', completedAt: new Date('1/1/2017')},
                {task: 'feel so good', completedAt: new Date('1/1/2017')},
                {task: 'another day', completedAt: new Date('1/10/2017')}
            ]});
        });

        it('renders a panel for each date', () => {
            expect(tree.find('Panel').length).toBe(2);
        });

        describe('each panel', () => {
            let panel;

            beforeEach(() => {
                panel = tree.find('Panel').at(0);
            });

            it('displays the date as a header', () => {
                expect(panel.prop('header')).toEqual('1/1/2017');
            });

            it('renders each todo completed on the date', () => {
                expect(panel.find('ListGroupItem').length).toBe(2);
            });
        });
    });
});
