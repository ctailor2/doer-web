jest.unmock('../linksSaga');

import {persistLink, watchPersistLink} from '../linksSaga';
import {takeLatest} from 'redux-saga';

describe('persistLink', () => {
	let iterator;
	let link = {href: 'http://some.api/endpoint'};
	let action = {
		type: 'PERSIST_LINK_ACTION',
		link: link
	};

    beforeEach(() => {
        localStorage.setItem = jest.fn();
        iterator = persistLink(action);
    });

    it('sets link on localStorage', () => {
        iterator.next();
        expect(localStorage.setItem).toBeCalledWith('link', link.href);
    });
});

describe('watchPersistLink', () => {
    let iterator = watchPersistLink();

    it('calls persist link saga with latest persist link action', () => {
        expect(iterator.next().value).toEqual(takeLatest('PERSIST_LINK_ACTION', persistLink).next().value);
    });
});