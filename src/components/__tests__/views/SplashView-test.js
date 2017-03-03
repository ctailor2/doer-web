jest.unmock('../../views/SplashView');

import {shallow} from 'enzyme';
import React from 'react';
import SplashView from '../../views/SplashView';
import Header from '../../Header';

describe('SplashView', () => {
	let tree;

	beforeEach(() => {
		tree = shallow(<SplashView />);
	});

	it('renders', () => {
		expect(tree.length).toBe(1);
	});

	it('has a progess bar', () => {
		expect(tree.find('ProgressBar').length).toBe(1);
	});
});
