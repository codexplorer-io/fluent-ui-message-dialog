import React from 'react';
import styled from 'styled-components';
import map from 'lodash/map';
import {
    Modal,
    FontWeights,
    PrimaryButton,
    DefaultButton
} from '@fluentui/react';
import {
    InfoIcon,
    WarningIcon,
    ErrorBadgeIcon
} from '@fluentui/react-icons-mdl2';
import { di } from 'react-magnetic-di';
import { useMessageDialog, MESSAGE_DIALOG_TYPE } from './store';

const getColor = ({ type, colors }) => ({
    [MESSAGE_DIALOG_TYPE.none]: colors.text,
    [MESSAGE_DIALOG_TYPE.info]: colors.primary,
    [MESSAGE_DIALOG_TYPE.warning]: colors.warning,
    [MESSAGE_DIALOG_TYPE.error]: colors.error
})[type];

export const Dialog = styled(Modal)`
    & > div.ms-Dialog-main {
        display: flex;
        flex-flow: column nowrap;
        align-items: stretch;
        min-height: auto;
        min-width: auto;
        width: 580px;

        @media only screen and (max-width: 600px) {
            width: 80%;
        }

        @media only screen and (max-width: 480px) {
            width: 100%;
        }
    }
`;

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top: ${({ type, theme }) => `${type === MESSAGE_DIALOG_TYPE.none ? 0 : 8}px solid ${getColor({ type, colors: theme.colors })}`};
    padding: 12px 12px 14px 24px;
    ${({ theme }) => theme.fonts.xLarge};
    color: ${({ type, theme }) => getColor({ type, colors: theme.colors })};
`;

export const Title = styled.span`
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    font-weight: ${FontWeights.semibold};
    margin-left: ${({ type }) => type !== MESSAGE_DIALOG_TYPE.none ? '10px' : 0};
`;

export const Body = styled.div`
    flex: 4 4 auto;
    padding: 0 24px 24px 24px;
    overflowY: hidden;
`;

export const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 0 24px 24px 24px;

    & > :not(:first-child) {
        margin-left: 10px;
    }
`;

export const StyledInfoIcon = styled(InfoIcon)`
    color: ${({ theme }) => getColor({ type: MESSAGE_DIALOG_TYPE.info, colors: theme.colors })};
    margin-top: 3px;
`;

export const StyledWarningIcon = styled(WarningIcon)`
    color: ${({ theme }) => getColor({ type: MESSAGE_DIALOG_TYPE.warning, colors: theme.colors })};
    margin-top: 3px;
`;

export const StyledErrorIcon = styled(ErrorBadgeIcon)`
    color: ${({ theme }) => getColor({ type: MESSAGE_DIALOG_TYPE.error, colors: theme.colors })};
    margin-top: 3px;
`;

const iconsMap = ({
    StyledInfoIcon,
    StyledWarningIcon,
    StyledErrorIcon
}) => ({
    [MESSAGE_DIALOG_TYPE.info]: StyledInfoIcon,
    [MESSAGE_DIALOG_TYPE.warning]: StyledWarningIcon,
    [MESSAGE_DIALOG_TYPE.error]: StyledErrorIcon
});

export const MessageDialog = () => {
    di(
        Actions,
        Body,
        DefaultButton,
        Dialog,
        Header,
        PrimaryButton,
        StyledErrorIcon,
        StyledInfoIcon,
        StyledWarningIcon,
        Title,
        useMessageDialog
    );

    const [{
        isOpen,
        title,
        message,
        type,
        actions
    }, { close }] = useMessageDialog();
    const Icon = iconsMap({
        StyledInfoIcon,
        StyledWarningIcon,
        StyledErrorIcon
    })[type];

    return (
        <Dialog
            isOpen={isOpen}
            onDismiss={close}
        >
            <Header type={type}>
                {type !== MESSAGE_DIALOG_TYPE.none && (
                    <Icon />
                )}
                <Title type={type}>{title}</Title>
            </Header>
            <Body>{message}</Body>
            {actions?.length > 0 && (
                <Actions>
                    {map(actions, ({
                        id,
                        handler,
                        text,
                        isPrimary
                    }) => {
                        const Component = isPrimary ? PrimaryButton : DefaultButton;
                        return (
                            <Component
                                key={id}
                                onClick={handler}
                            >
                                {text}
                            </Component>
                        );
                    })}
                </Actions>
            )}
        </Dialog>
    );
};
