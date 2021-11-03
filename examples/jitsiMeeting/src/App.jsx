import React, { useRef } from "react";
import { JitsiMeeting } from 'jitsi-meet-web-sdk';
import { useState } from "react";

const App = () => {
  const apiRef = useRef();
  const apiRefNew = useRef();
  const [logItems, updateLog] = useState([]);
  const [showNew, toggleShowNew] = useState(false);
  const [knockingParticipants, updateKnockingParticipants] = useState([]);

  const printEventOutput = (payload) => {
    updateLog(items => [...items, JSON.stringify(payload)]);
  };

  const handleAudioStatusChange = (payload, feature) => {
    if (payload.muted) {
      updateLog(items => [...items, `${feature} off`])
    } else {
      updateLog(items => [...items, `${feature} on`])
    }
  };

  const handleChatUpdates = (payload, ref) => {
    if (payload.isOpen || !payload.unreadCount) {
      return;
    }
    apiRef.current.executeCommand('toggleChat');
    updateLog(items => [...items, `you have ${payload.unreadCount} unread messages`])
  };

  const handleKnockingParticipant = (payload) => {
    updateLog(items => [...items, JSON.stringify(payload)]);
    updateKnockingParticipants(participants => [...participants, payload?.participant])
  };

  const resolveKnockingParticipants = (ref, condition) => {
    knockingParticipants.forEach((participant) => {
      ref.current.executeCommand('answerKnockingParticipant', participant?.id, condition(participant));
      updateKnockingParticipants(participants => participants.filter(item => item.id === participant.id));
    });
  };

  const handleApiReady = (apiObj, ref) => {
    ref.current = apiObj;
    ref.current.addEventListeners({
      // Listening to events from the external API
      audioMuteStatusChanged: (payload) => handleAudioStatusChange(payload, 'audio'),
      videoMuteStatusChanged: (payload) => handleAudioStatusChange(payload, 'video'),
      raiseHandUpdated: printEventOutput,
      tileViewChanged: printEventOutput,
      chatUpdated: (payload) => handleChatUpdates(payload, ref),
      knockingParticipant: handleKnockingParticipant
    });
  };

  // Multiple instances demo
  const renderNewComp = () => {
    if (!showNew) {
      return null;
    }
    return (
      <JitsiMeeting
        id="testNew"
        domain="meet.jit.si"
        options={{
          roomName: 'JitsiMeetingComponentDemo',
          width: '100%',
          height: '400px'
        }}
        onApiReady={(externalApi) => handleApiReady(externalApi, apiRefNew)}
      />
    );
  };

  const renderButtons = () => {
    return (
      <div style={{ margin: '15px 0'}}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            type="text"
            title="Click to execute toggle raise hand command"
            style={{ border: 0, borderRadius: '6px', fontSize: '14px', background: '#ff9b42', color: 'white', padding: '12px 46px', margin: '2px 2px' }}
            onClick={() => apiRef.current.executeCommand('toggleRaiseHand')}
          >Raise hand</button>
          <button
            type="text"
            title="Click to approve/reject knocking participant"
            style={{ border: 0, borderRadius: '6px', fontSize: '14px', background: '#0376da', color: 'white', padding: '12px 46px', margin: '2px 2px' }}
            onClick={() => resolveKnockingParticipants(apiRef, ({ name }) => !name.includes('test'))}
          >Resolve lobby</button>
          <button
            type="text"
            style={{ border: 0, borderRadius: '6px', fontSize: '14px', background: '#a7a7a7', color: 'white', padding: '12px 46px', margin: '2px 2px' }}
            onClick={() => toggleShowNew(!showNew)}
          >Toggle new instance</button>
        </div>
      </div>
    );
  };

  const renderLog = () => {
    return logItems.map((item, index) => <div style={{ fontFamily: 'monospace', padding: '5px' }} key={index}>{item}</div>);
  };

  const renderSpinner = () => {
    return <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>Loading..</div>;
  };

  return (
    <>
      <h1 style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>JitsiMeeting Demo App</h1>
      <JitsiMeeting
        id="demoAppTest"
        domain="meet.jit.si"
        options={{
          roomName: 'JitsiMeetingComponentDemo',
          width: '100%',
          height: 400
        }}
        spinner={renderSpinner}
        onApiReady={(externalApi) => handleApiReady(externalApi, apiRef)}
      />
      {renderButtons()}
      {renderNewComp()}
      {renderLog()}
    </>
  );
};

export default App;