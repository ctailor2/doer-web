import {persistLink, watchPersistLink} from '../linksSaga';
import {takeLatest} from 'redux-saga';
import {ActionTypes} from '../../constants/actionTypes'

describe('persistLink', () => {
	let iterator;
	let link = {href: 'http://some.api/endpoint'};
	let action = {
		type: ActionTypes.PERSIST_LINK_ACTION,
		link: link
	};

    beforeEach(() => {
        iterator = persistLink(action);
    });

    it('sets link on localStorage', () => {
        iterator.next();
        expect(localStorage.getItem('link')).toEqual(link.href);
    });
});

describe('watchPersistLink', () => {
    let iterator = watchPersistLink();

    it('calls persist link saga with latest persist link action', () => {
        expect(iterator.next().value).toEqual(takeLatest(ActionTypes.PERSIST_LINK_ACTION, persistLink).next().value);
    });
});