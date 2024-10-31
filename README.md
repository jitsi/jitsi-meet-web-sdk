# Jitsi Meet React SDK
The Jitsi Meet React SDK provides the same user experience as the [Jitsi Meet](https://github.com/jitsi/jitsi-meet) app, in a customizable way which you can embed in your apps.

## Install
```bash
npm install @jitsi/react-sdk
```

### Usage
Import into React | NextJs page for usage
```js
import {JitsiMeeting} from "@jitsi/react-sdk";
```

### Modules
This library exposes two components with similar properties, intended for different use-cases.
#### JitsiMeeting
To be used with custom domains as-it-is in React projects:
```js
<JitsiMeeting
    domain = { YOUR_DOMAIN }
    roomName = { YOUR_ROOM_NAME }
/>
```
##### Properties specific to the `JitsiMeeting` component
###### `domain`
Optional. Field used to retrieve the external_api.js file that initializes the IFrame. If omitted, defaults to `meet.jit.si`.

#### JaaSMeeting
To be used with the `8x8.vc` domain as-it-is in React projects:
```js
<JaaSMeeting
    appId = { YOUR_APP_ID }
    roomName = { YOUR_ROOM_NAME }
/>
```

...or with the `stage.8x8.vc` domain:
```js
<JaaSMeeting
    appId = { YOUR_APP_ID }
    roomName = { YOUR_ROOM_NAME }
    useStaging = { true }
/>
```

##### Properties specific to the `JaasMeeting` component
###### `appId` 
Required. Provides an isolated context and prefixes the room name.

###### `useStaging`
Optional. Tells whether to use the staging environment or not.

##### Common properties
###### `roomName`
Required. String used when joining the meeting.

###### `getIFrameRef`
Optional. Callback to retrieve the parent node of the IFrame for more control (e.g. styling).
```js
<JitsiMeeting
    ...
    getIFrameRef = { iframeRef => { iframeRef.style.height = '700px'; } }
/>
```

###### `onApiReady`
Optional. Callback triggered when the external API is loaded to expose it for events and commands.
```js
<JitsiMeeting
    ...
    onApiReady = { externalApi => console.log('Jitsi Meet External API', externalApi) }
/>
```

###### `onReadyToClose`
Optional. Callback triggered when the meeting is ready to be closed.
```js
<JitsiMeeting
    ...
    onReadyToClose = { () => console.log('Jitsi Meet is ready to be closed') }
/>
```

###### `configOverwrite`
Optional. Object used for options overrides.

###### `interfaceConfigOverwrite`
Optional. Object used for more options overrides.

###### `jwt`
Optional. Token for authentication.

###### `invitees`
Optional. Participants list.

###### `devices`
Optional. Information regarding the devices used during the call.

###### `userInfo`
Optional. Details about the participant that started the meeting.

###### `lang`
Optional. The default meeting language.

###### `release`
Optional. Information regarding the `stage.8x8.vc` or `8x8.vc` release version. Expects the following format: `release-1234`.

###### `spinner`
Optional. Custom loading view while the IFrame is loading.

## Sample
Install and run the project from the `example` directory to see the JitsiMeeting module in action.
```bash
npm run demo
```
