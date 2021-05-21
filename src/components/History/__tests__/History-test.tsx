import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {
    ListGroupItem,
    Panel,
} from 'react-bootstrap';
import History from '../History';

describe('History', () => {
    let tree: ShallowWrapper;

    beforeEach(() => {
        configure({ adapter: new Adapter() });
        tree = shallow(<History todos={[]} />);
    });

    it('renders', () => {
        expect(tree.length).toBe(1);
    });

    describe('when there are todos', () => {
        beforeEach(() => {
            tree.setProps({
                todos: [
                    { task: 'celebrate', completedAt: '2017-01-01T10:50:44+0000' },
                    { task: 'feel so good', completedAt: '2017-01-01T11:50:44+0000' },
                    { task: 'another day', completedAt: '2017-01-10T02:50:44+0000' },
                ],
            });
        });

        it('renders a panel for each date', () => {
            expect(tree.find(Panel).length).toBe(2);
        });

        describe('each panel', () => {
            let panel: ShallowWrapper;

            beforeEach(() => {
                panel = tree.find(Panel).at(0);
            });

            it('displays the date as a header', () => {
                expect(panel.find(Panel.Heading).children().text()).toEqual('1/1/2017');
            });

            it('renders each todo completed on the date', () => {
                expect(panel.find(ListGroupItem).length).toBe(2);
            });
        });
    });
});
