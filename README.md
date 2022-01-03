# fluent-ui-message-dialog
Themeable message dialog for React & Fluent UI.

## Platform Compatibility
iOS|Android|Web|
-|-|-|
❌|❌|✅|

## Samples

### Message dialog
<img title="Message dialog" src="https://github.com/codexplorer-io/fluent-ui-message-dialog/blob/main/samples/type-none.png?raw=true">

### Info dialog
<img title="Info message dialog" src="https://github.com/codexplorer-io/fluent-ui-message-dialog/blob/main/samples/type-info.png?raw=true">

### Warning dialog
<img title="Warning message dialog" src="https://github.com/codexplorer-io/fluent-ui-message-dialog/blob/main/samples/type-warning.png?raw=true">

### Error dialog
<img title="Error message dialog" src="https://github.com/codexplorer-io/fluent-ui-message-dialog/blob/main/samples/type-error.png?raw=true">

## Prerequisites
Module requires `styled-components` and some theme variable initalizations before it can be used, and to be rendered as an app parent.

Required theme variables:

- **colors.text** - Title text color used when generic message dialog is displayed
- **colors.primary** - Title text color used when info message dialog is displayed
- **colors.warning** - Title text color used when warning message dialog is displayed
- **colors.error** - Title text color used when error message dialog is displayed
- **fonts.xLarge** - Title text font style

For colors to be combined with Fluent UI theme, it can be initialized and redered at the same place where `ThemeProvider` from `@fluentui/react`:
```javascript
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as FluentUiThemeProvider, createTheme } from '@fluentui/react';
import { App } from './app';

const fluentUiTheme = createTheme({
    palette: ...
});

const styledTheme = {
    colors: {
        primary: fluentUiTheme.palette.someColor1,
        text: fluentUiTheme.palette.someColor2,
        warning: fluentUiTheme.palette.someColor3,
        error: fluentUiTheme.palette.someColor4,
        ...
    },
    fonts: {
        xLarge: fluentUiTheme.fonts.xLarge,
        ...
    }
};

export const AppThemeWrapper = () => (
    <StyledThemeProvider theme={styledTheme}>
        <FluentUiThemeProvider theme={fluentUiTheme}>
            <App />
        </FluentUiThemeProvider>
    </StyledThemeProvider>
);
```

## Usage
Before dialog can be displayed, it needs to be rendered within `App` as a descendant of theme providers:
```javascript
import { MessageDialog } from '@codexporer.io/fluent-ui-message-dialog';
...

export const App = () => (
    <>
        <MessageDialog />
        ...other app components
    </>
);
```
When `MessageDialog` component is rendered, it can be displayed from anywhere within the app:
```javascript
import {
    useMessageDialogActions,
    MESSAGE_DIALOG_TYPE
} from '@codexporer.io/fluent-ui-message-dialog';
...

export const MyComponent = () => {
    const [, { open, close }] = useMessageDialogActions();
    const showDialog = () => open({
        title: 'Message dialog title',
        message: 'Message dialog message.',
        type: MESSAGE_DIALOG_TYPE.none, // or MESSAGE_DIALOG_TYPE.info | MESSAGE_DIALOG_TYPE.warning | MESSAGE_DIALOG_TYPE.error
        actions: [ // optional action buttons
            {
                id: 'primaryAction',
                handler: close,
                text: 'Primary Action',
                isPrimary: true
            },
            {
                id: 'secondaryAction',
                handler: ...,
                text: 'Secondary Action'
            }
        ],
        onOpen: () => {
            // optinal callback when dialog is open
        },
        onClose: () => {
            // optinal callback when dialog is closed
        }
    });
    ...
    
    return (
        <>
            <Button onPress={showDialog}>Show Dialog</Button>
            ...
        </>
    );
};
```

## Exports
symbol|description|
-|-|
MessageDialog|message dialog component|
useMessageDialogActions|hook used to control message dialog visibility|
MESSAGE_DIALOG_TYPE|constant used for rendering styled message dialog|

## useMessageDialogActions
Returns an array with `open` and `close` close actions on the second index:
```
const [, { open, close }] = useMessageDialogActions();

...
open(... open action parameters);
...
close();
```

### Open action parameters
parameter|description|
-|-|
title|optional message dialog title (default: empty string)|
message|message dialog message|
type|optional message dialog type (default: MESSAGE_DIALOG_TYPE.none)|
actions|optional message dialog actions, array with objects of shape `[{ id: 'unique string action id', handler: () => { /* invoked when button is clicked*/ }, text: 'Action button label', isPrimary: <boolean> }, ...]`|
onOpen|optinal callback when dialog is open|
onClose|optinal callback when dialog is closed|
