import React from 'react';
import History from '../History';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CompletedTodo } from '../../../api/completedList';

describe('History', () => {
    describe('when there are todos', () => {
        const todos: CompletedTodo[] = [
            { task: 'celebrate', completedAt: '2017-01-01T10:50:44+0000' },
            { task: 'feel so good', completedAt: '2017-01-01T11:50:44+0000' },
            { task: 'another day', completedAt: '2017-01-10T02:50:44+0000' },
        ];

        beforeEach(() => {
            render(<History todos={todos}/>)
        });

        it('groups todos by date', () => {
            expect(screen.getByText('1/1/2017')).toBeVisible();
            expect(screen.getByText('1/9/2017')).toBeVisible();
        });

        it('renders each todo task', () => {
            expect(screen.getByText(todos[0].task)).toBeVisible();
            expect(screen.getByText(todos[1].task)).toBeVisible();
            expect(screen.getByText(todos[2].task)).toBeVisible();
        });
    });
});
