import React from 'react';
import { injectable } from 'react-magnetic-di';
import { createMockComponent, mountWithDi } from '@codexporer.io/react-test-utils';
import {
    PrimaryButton,
    DefaultButton
} from '@fluentui/react';
import { useMessageDialog, MESSAGE_DIALOG_TYPE } from './store';
import {
    MessageDialog,
    Dialog,
    Header,
    Title,
    Body,
    Actions,
    StyledInfoIcon,
    StyledWarningIcon,
    StyledErrorIcon
} from './component';

describe('MessageDialog', () => {
    const useMessageDialogMock = jest.fn();
    const closeMessageDialogMock = jest.fn();
    const handler1Mock = jest.fn();
    const handler2Mock = jest.fn();

    const mockUseMessageDialog = ({
        isOpen = false,
        title = 'mock title',
        message = 'mock message',
        type = MESSAGE_DIALOG_TYPE.none,
        actions = [
            {
                id: '1',
                handler: handler1Mock,
                text: 'button mock 1',
                isPrimary: true
            },
            {
                id: '2',
                handler: handler2Mock,
                text: 'button mock 2'
            }
        ]
    }) => {
        useMessageDialogMock.mockReturnValue([
            {
                isOpen,
                title,
                message,
                type,
                actions
            },
            { close: closeMessageDialogMock }
        ]);
    };

    const defaultDeps = [
        injectable(Actions, createMockComponent('Actions')),
        injectable(Body, createMockComponent('Body')),
        injectable(Dialog, createMockComponent('Dialog')),
        injectable(Header, createMockComponent('Header')),
        injectable(StyledErrorIcon, createMockComponent('StyledErrorIcon')),
        injectable(StyledInfoIcon, createMockComponent('StyledInfoIcon')),
        injectable(StyledWarningIcon, createMockComponent('StyledWarningIcon')),
        injectable(Title, createMockComponent('Title')),
        injectable(PrimaryButton, createMockComponent('PrimaryButton')),
        injectable(DefaultButton, createMockComponent('DefaultButton')),
        injectable(useMessageDialog, useMessageDialogMock)
    ];

    beforeEach(() => {
        mockUseMessageDialog({});
    });

    it('should render dialog closed', () => {
        mockUseMessageDialog({ isOpen: false });

        const wrapper = mountWithDi(
            <MessageDialog />,
            { deps: defaultDeps }
        );

        // eslint-disable-next-line lodash/prefer-lodash-method
        expect(wrapper.find('Dialog').props().isOpen).toBe(false);
    });

    it('should render dialog open', () => {
        mockUseMessageDialog({ isOpen: true });

        const wrapper = mountWithDi(
            <MessageDialog />,
            { deps: defaultDeps }
        );

        // eslint-disable-next-line lodash/prefer-lodash-method
        expect(wrapper.find('Dialog').props().isOpen).toBe(true);
    });

    it('should pass close to dialog dismiss', () => {
        mockUseMessageDialog({});

        const wrapper = mountWithDi(
            <MessageDialog />,
            { deps: defaultDeps }
        );

        // eslint-disable-next-line lodash/prefer-lodash-method
        expect(wrapper.find('Dialog').props().onDismiss).toBe(closeMessageDialogMock);
    });

    it('should render modal title', () => {
        mockUseMessageDialog({ title: 'mock title' });

        const wrapper = mountWithDi(
            <MessageDialog />,
            { deps: defaultDeps }
        );

        // eslint-disable-next-line lodash/prefer-lodash-method
        expect(wrapper.find('Title').props().children).toBe('mock title');
    });

    it('should render without icon', () => {
        mockUseMessageDialog({ title: 'mock title', type: MESSAGE_DIALOG_TYPE.none });

        const wrapper = mountWithDi(
            <MessageDialog />,
            { deps: defaultDeps }
        );

        // eslint-disable-next-line lodash/prefer-lodash-method
        const { children } = wrapper.find('Header').props();
        expect(children).toHaveLength(2);
        expect(children[0]).toBe(false);
    });

    it('should render info icon', () => {
        mockUseMessageDialog({ title: 'mock title', type: MESSAGE_DIALOG_TYPE.info });

        const wrapper = mountWithDi(
            <MessageDialog />,
            { deps: defaultDeps }
        );

        // eslint-disable-next-line lodash/prefer-lodash-method
        const { children } = wrapper.find('Header').props();
        expect(children).toHaveLength(2);
        expect(
            mountWithDi(
                children[0],
                { deps: defaultDeps }
            ).name()
        ).toBe('StyledInfoIcon');
    });

    it('should render warning icon', () => {
        mockUseMessageDialog({ title: 'mock title', type: MESSAGE_DIALOG_TYPE.warning });

        const wrapper = mountWithDi(
            <MessageDialog />,
            { deps: defaultDeps }
        );

        // eslint-disable-next-line lodash/prefer-lodash-method
        const { children } = wrapper.find('Header').props();
        expect(children).toHaveLength(2);
        expect(
            mountWithDi(
                children[0],
                { deps: defaultDeps }
            ).name()
        ).toBe('StyledWarningIcon');
    });

    it('should render error icon', () => {
        mockUseMessageDialog({ title: 'mock title', type: MESSAGE_DIALOG_TYPE.error });

        const wrapper = mountWithDi(
            <MessageDialog />,
            { deps: defaultDeps }
        );

        // eslint-disable-next-line lodash/prefer-lodash-method
        const { children } = wrapper.find('Header').props();
        expect(children).toHaveLength(2);
        expect(
            mountWithDi(
                children[0],
                { deps: defaultDeps }
            ).name()
        ).toBe('StyledErrorIcon');
    });

    it('should render dialog actions', () => {
        mockUseMessageDialog({});

        const wrapper = mountWithDi(
            <MessageDialog />,
            { deps: defaultDeps }
        );

        // eslint-disable-next-line lodash/prefer-lodash-method
        const actions = wrapper.find('Actions');
        expect(actions).toHaveLength(1);
        // eslint-disable-next-line lodash/prefer-lodash-method
        expect(actions.find('PrimaryButton').props()).toEqual({
            onClick: handler1Mock,
            children: 'button mock 1'
        });
        // eslint-disable-next-line lodash/prefer-lodash-method
        expect(actions.find('DefaultButton').props()).toEqual({
            onClick: handler2Mock,
            children: 'button mock 2'
        });
    });

    it('should not render dialog actions when null', () => {
        mockUseMessageDialog({ actions: null });

        const wrapper = mountWithDi(
            <MessageDialog />,
            { deps: defaultDeps }
        );

        // eslint-disable-next-line lodash/prefer-lodash-method
        expect(wrapper.find('Actions')).toHaveLength(0);
    });

    it('should not render dialog actions when empty', () => {
        mockUseMessageDialog({ actions: [] });

        const wrapper = mountWithDi(
            <MessageDialog />,
            { deps: defaultDeps }
        );

        // eslint-disable-next-line lodash/prefer-lodash-method
        expect(wrapper.find('Actions')).toHaveLength(0);
    });

    it('should render modal message', () => {
        mockUseMessageDialog({ message: 'mock message' });

        const wrapper = mountWithDi(
            <MessageDialog />,
            { deps: defaultDeps }
        );

        // eslint-disable-next-line lodash/prefer-lodash-method
        expect(wrapper.find('Body').props().children).toBe('mock message');
    });
});
