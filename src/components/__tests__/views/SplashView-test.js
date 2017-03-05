jest.unmock('../../views/Loader');

import {shallow} from 'enzyme';
import React from 'react';
import Loader from '../../views/Loader';
import Header from '../../Header';

describe('Loader', () => {
	let tree;

	beforeEach(() => {
		tree = shallow(<Loader />);
	});

	it('renders', () => {
		expect(tree.length).toBe(1);
	});

	it('has a progess bar', () => {
		expect(tree.find('ProgressBar').length).toBe(1);
	});
});
