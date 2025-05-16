import useSize from '@react-hook/size';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { io } from 'socket.io-client';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { Chat } from 'utils/Chat/Chat';
import {
  BoxHideLeftSwitch,
  BoxHideRightSwitch,
  BoxHideSwitch,
  ButtonBox,
  ChatBox,
  ChatBtn,
  ChatLogo,
  StreamPlaceHolder,
  StreamPlaceHolderText,
  StreamSection,
} from '../../../components/Stream/Stream.styled';
import {
  GradientBackground,
  JitsiContainer,
  LargeText,
  PlayerWrapper,
} from './Stream.styled';
import { ColorRing } from 'react-loader-spinner';
import { StudentInput } from 'components/StudentInput/StudentInput';
import { StudentOptions } from 'components/StudentInput/StudentOptions';
import { StudentTrueFalse } from 'components/StudentInput/StudentTrueFalse';

const roomID = 'e9f591ef-4d7f-4970-9c66-4843d362801a';
const supportedLanguages = ['uk', 'en', 'pl', 'de'];
const browserLanguage = navigator.language.split('-')[0];

const Stream = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [scrollOn, setScrollOn] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [adminId, setAdminId] = useState(null);
  const [isJitsiLoading, setIsJitsiLoading] = useState(true);
  const [isIframeOpen, setIsIframeOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isButtonBoxOpen, setIsButtonBoxOpen] = useState(true);
  const [isQuizInputOpen, setIsQuizInputOpen] = useState(false);
  const [isQuizOptionsOpen, setIsQuizOptionsOpen] = useState(false);
  const [isQuizTrueFalseOpen, setIsQuizTrueFalseOpen] = useState(false);
  const [links, isLoading, currentUser] = useOutletContext();
  const chatEl = useRef();
  // eslint-disable-next-line
  const [chatWidth, chatHeight] = useSize(chatEl);
  const [width, height] = useSize(document.body);
  const [messages, setMessages] = useState([]);
  const location = useLocation().pathname;
  const questionID = useRef('');

  console.log(57, currentUser, 'currentUser');

  const toggleChat = () => {
    setIsChatOpen(isChatOpen => !isChatOpen);
  };

  const toggleButtonBox = () => {
    setIsButtonBoxOpen(isOpen => !isOpen);
  };

  const toggleQuizInput = () => {
    setIsQuizInputOpen(isQuizInputOpen => !isQuizInputOpen);
  };
  const toggleQuizOptions = () => {
    setIsQuizOptionsOpen(isQuizOptionsOpen => !isQuizOptionsOpen);
  };
  const toggleQuizTrueFalse = () => {
    setIsQuizTrueFalseOpen(isQuizTrueFalseOpen => !isQuizTrueFalseOpen);
  };

  const videoBoxWidth =
    chatWidth === 0 && width > height ? width - 300 : width - chatWidth;

  const socketRef = useRef(null);

  const room = `${document.title
    .split('|')[1]
    ?.trim()
    .trimEnd()
    .toLowerCase()}_${location.replace('/lesson/', '')}`;

  console.log(room);

  useEffect(() => {
    document.title = `Lesson Online | WSTIJO | ${location
      .replace('/lesson/', '')[0]
      .toUpperCase()}${location.replace('/lesson/', '').slice(1)}`;

    socketRef.current = io('https://ap-chat-server.onrender.com/');

    socketRef.current.on('connected', (connected, handshake) => {
      console.log(connected);
      console.log(handshake.time);
    });

    const getMessages = async () => {
      try {
        const dbMessages = await axios.get(
          `https://ap-chat-server.onrender.com/messages/room`,
          {
            params: {
              room,
            },
          }
        );
        const todayMessages = dbMessages.data.filter(
          message =>
            new Date(message.createdAt).getDate() === new Date().getDate()
        );
        setMessages(messages => (messages = todayMessages));
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();

    socketRef.current.on('message', async data => {
      setMessages(messages => (messages = [...messages, data]));
      const updateMessages = async () => {
        try {
          await axios.post(
            'https://ap-chat-server.onrender.com/messages',
            data
          );
        } catch (error) {
          console.log(error);
        }
      };
      await updateMessages();
    });

    socketRef.current.on('message:get', async data => {
      setMessages(messages => (messages = [...messages, data]));
    });

    socketRef.current.on('message:pinned', async (id, data) => {
      console.log(id);
      console.log(data);
      setMessages(messages => {
        messages[messages.findIndex(message => message.id === id)].isPinned =
          data.isPinned;
        return [...messages];
      });
    });

    socketRef.current.on('message:delete', async id => {
      console.log('delete fired');
      setMessages(
        messages =>
          (messages = [...messages.filter(message => message.id !== id)])
      );
      const deleteMessage = async () => {
        try {
          await axios.delete(
            `https://ap-chat-server.onrender.com/messages/${id}`
          );
        } catch (error) {
          console.log(error);
        }
      };
      await deleteMessage();
    });

    socketRef.current.on('message:deleted', async id => {
      console.log(id);
      setMessages(
        messages =>
          (messages = [...messages.filter(message => message.id !== id)])
      );
    });

    // open quizzes on event
    socketRef.current.on('question:input', data => {
      if (data.page === room) {
        setIsQuizInputOpen(true);
        questionID.current = data.question;
      }
    });
    socketRef.current.on('question:options', data => {
      if (data.page === room) {
        setIsQuizOptionsOpen(true);
        questionID.current = data.question;
      }
    });
    socketRef.current.on('question:trueFalse', data => {
      if (data.page === room) {
        setIsQuizTrueFalseOpen(true);
        questionID.current = data.question;
      }
    });

    // close quizzes on event
    socketRef.current.on('question:closeInput', data => {
      data.page === room && setIsQuizInputOpen(false);
    });
    socketRef.current.on('question:closeOptions', data => {
      data.page === room && setIsQuizOptionsOpen(false);
    });
    socketRef.current.on('question:closeTrueFalse', data => {
      data.page === room && setIsQuizTrueFalseOpen(false);
    });

    return () => {
      socketRef.current.off('connected');
      socketRef.current.off('message');
      socketRef.current.disconnect();
    };
  }, [currentUser, location, room]);

  useEffect(() => {
    const setAppHeight = () => {
      if (window.innerHeight < 400 && !isConnected) {
        setWindowHeight(400);
        setScrollOn(true);
      } else {
        setWindowHeight(window.innerHeight);
        setScrollOn(false);
      }
    };

    setAppHeight();
    window.addEventListener('resize', setAppHeight);

    return () => window.removeEventListener('resize', setAppHeight);
  }, [isConnected]);

  const findTeacherId = participants => {
    for (const id in participants) {
      if (participants[id].displayName.endsWith('(teacher)')) {
        return id;
      }
    }
    return null;
  };

  const handleApiReady = async externalApi => {
    const participants = await externalApi.getParticipantsInfo();

    participants.find(participant => participant.name.endsWith('(teacher)')) &&
      setIsIframeOpen(true);

    externalApi.addListener('participantJoined', participant => {
      if (!adminId) {
        const fidedAdminId = findTeacherId(externalApi._participants);
        setAdminId(() => {
          externalApi.pinParticipant(fidedAdminId);
          setAdminId(fidedAdminId);

          return fidedAdminId;
        });
      }

      if (participant.displayName.endsWith('(teacher)')) {
        setIsIframeOpen(true);
        setWindowHeight(window.innerHeight);
        setScrollOn(false);
        setIsConnected(true);
      }
    });

    externalApi.addListener('participantRoleChanged', participant => {
      if (participant.role === 'moderator') {
        setIsIframeOpen(true);
        externalApi.pinParticipant(participant.id);
        setAdminId(participant.id);

        setWindowHeight(window.innerHeight);
        setScrollOn(false);
        setIsConnected(true);
      }
    });

    externalApi.addListener('errorOccurred', error => {
      if (error.error.name === 'conference.authenticationRequired') {
        setIsIframeOpen(false);
        setIsJitsiLoading(false);
      }
    });

    return () => {
      externalApi.removeAllListeners();
    };
  };

  return (
    <>
      {(links[room] === undefined || links[room][0] < 10) && !isLoading ? (
        <StreamPlaceHolder>
          <StreamPlaceHolderText>
            No stream yet! <br />
            Try again later.
          </StreamPlaceHolderText>
        </StreamPlaceHolder>
      ) : (
        <>
          <StreamSection
            style={{
              width:
                isChatOpen && width > height ? `${videoBoxWidth}px` : '100%',
              overflow: scrollOn ? 'scroll' : 'hidden',
            }}
          >
            <PlayerWrapper
              style={{
                width:
                  isChatOpen && width > height ? `${videoBoxWidth}px` : '100%',
                height: isIframeOpen ? windowHeight : '100%',
              }}
            >
              <GradientBackground>
                {isJitsiLoading ? (
                  <div
                    style={{
                      display: 'flex',
                      gap: '20px',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <LargeText>Завантаження</LargeText>
                    <ColorRing
                      visible={true}
                      height="120"
                      width="120"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                    />
                  </div>
                ) : (
                  <LargeText>Викладача поки немає!</LargeText>
                )}
              </GradientBackground>
              <JitsiContainer
                style={{
                  height: isIframeOpen ? windowHeight : '0',
                }}
              >
                <JitsiMeeting
                  domain="videohost.ap.education"
                  roomName={roomID}
                  configOverwrite={{
                    disableTileEnlargement: true,
                    channelLastN: 1,
                    startWithVideoMuted: true,
                    followMeEnabled: true,
                    disableDeepLinking: true,
                    startWithAudioMuted: true,
                    disableTileView: true,
                    disableInitialGUM: true,
                    disableModeratorIndicator: true,
                    disableReactions: true,
                    startScreenSharing: false,
                    enableEmailInStats: false,
                    disableSelfViewSettings: true,
                    filmstrip: {
                      disabled: false,
                    },
                    constraints: {
                      video: {
                        height: {
                          ideal: 1080,
                          max: 1080,
                          min: 480,
                        },
                      },
                    },
                    prejoinConfig: {
                      enabled: true,
                      hideDisplayName: false,
                      // hideExtraJoinButtons: ['no-audio', 'by-phone'],
                      preCallTestEnabled: true,
                      preCallTestICEUrl: '',
                    },
                    readOnlyName: true,
                    defaultLanguage: supportedLanguages.includes(
                      browserLanguage
                    )
                      ? browserLanguage
                      : 'en',
                    toolbarButtons: [
                      'camera',
                      // 'chat',
                      'closedcaptions',
                      'desktop',
                      'download',
                      'embedmeeting',
                      'etherpad',
                      'feedback',
                      'filmstrip',
                      'fullscreen',
                      'hangup',
                      'help',
                      'highlight',
                      'invite',
                      'linktosalesforce',
                      'livestreaming',
                      'microphone',
                      'noisesuppression',
                      'participants-pane',
                      'profile',
                      'raisehand',
                      'recording',
                      'security',
                      'select-background',
                      'settings',
                      'shareaudio',
                      'sharedvideo',
                      'shortcuts',
                      'stats',
                      'tileview',
                      'toggle-camera',
                      'videoquality',
                      'whiteboard',
                    ],
                    disabledSounds: [
                      'ASKED_TO_UNMUTE_SOUND',
                      'E2EE_OFF_SOUND',
                      'E2EE_ON_SOUND',
                      'INCOMING_MSG_SOUND',
                      'KNOCKING_PARTICIPANT_SOUND',
                      'LIVE_STREAMING_OFF_SOUND',
                      'LIVE_STREAMING_ON_SOUND',
                      'NO_AUDIO_SIGNAL_SOUND',
                      'NOISY_AUDIO_INPUT_SOUND',
                      'OUTGOING_CALL_EXPIRED_SOUND',
                      'OUTGOING_CALL_REJECTED_SOUND',
                      'OUTGOING_CALL_RINGING_SOUND',
                      'OUTGOING_CALL_START_SOUND',
                      'PARTICIPANT_JOINED_SOUND',
                      'PARTICIPANT_LEFT_SOUND',
                      'RAISE_HAND_SOUND',
                      'REACTION_SOUND',
                      'RECORDING_OFF_SOUND',
                      'RECORDING_ON_SOUND',
                      'TALK_WHILE_MUTED_SOUND',
                    ],
                    disabledNotifications: [
                      'connection.CONNFAIL', // shown when the connection fails,
                      'dialog.cameraConstraintFailedError', // shown when the camera failed
                      'dialog.cameraNotSendingData', // shown when there's no feed from user's camera
                      'dialog.kickTitle', // shown when user has been kicked
                      'dialog.liveStreaming', // livestreaming notifications (pending, on, off, limits)
                      'dialog.lockTitle', // shown when setting conference password fails
                      'dialog.maxUsersLimitReached', // shown when maximmum users limit has been reached
                      'dialog.micNotSendingData', // shown when user's mic is not sending any audio
                      'dialog.passwordNotSupportedTitle', // shown when setting conference password fails due to password format
                      'dialog.recording', // recording notifications (pending, on, off, limits)
                      'dialog.remoteControlTitle', // remote control notifications (allowed, denied, start, stop, error)
                      'dialog.reservationError',
                      'dialog.screenSharingFailedTitle', // shown when the screen sharing failed
                      'dialog.serviceUnavailable', // shown when server is not reachable
                      'dialog.sessTerminated', // shown when there is a failed conference session
                      'dialog.sessionRestarted', // show when a client reload is initiated because of bridge migration
                      'dialog.tokenAuthFailed', // show when an invalid jwt is used
                      'dialog.tokenAuthFailedWithReasons', // show when an invalid jwt is used with the reason behind the error
                      'dialog.transcribing', // transcribing notifications (pending, off)
                      'dialOut.statusMessage', // shown when dial out status is updated.
                      'liveStreaming.busy', // shown when livestreaming service is busy
                      'liveStreaming.failedToStart', // shown when livestreaming fails to start
                      'liveStreaming.unavailableTitle', // shown when livestreaming service is not reachable
                      'lobby.joinRejectedMessage', // shown when while in a lobby, user's request to join is rejected
                      'lobby.notificationTitle', // shown when lobby is toggled and when join requests are allowed / denied
                      'notify.audioUnmuteBlockedTitle', // shown when mic unmute blocked
                      'notify.chatMessages', // shown when receiving chat messages while the chat window is closed
                      'notify.connectedOneMember', // show when a participant joined
                      'notify.connectedThreePlusMembers', // show when more than 2 participants joined simultaneously
                      'notify.connectedTwoMembers', // show when two participants joined simultaneously
                      'notify.dataChannelClosed', // shown when the bridge channel has been disconnected
                      'notify.hostAskedUnmute', // shown to participant when host asks them to unmute
                      'notify.invitedOneMember', // shown when 1 participant has been invited
                      'notify.invitedThreePlusMembers', // shown when 3+ participants have been invited
                      'notify.invitedTwoMembers', // shown when 2 participants have been invited
                      'notify.kickParticipant', // shown when a participant is kicked
                      'notify.leftOneMember', // show when a participant left
                      'notify.leftThreePlusMembers', // show when more than 2 participants left simultaneously
                      'notify.leftTwoMembers', // show when two participants left simultaneously
                      'notify.linkToSalesforce', // shown when joining a meeting with salesforce integration
                      'notify.localRecordingStarted', // shown when the local recording has been started
                      'notify.localRecordingStopped', // shown when the local recording has been stopped
                      'notify.moderationInEffectCSTitle', // shown when user attempts to share content during AV moderation
                      'notify.moderationInEffectTitle', // shown when user attempts to unmute audio during AV moderation
                      'notify.moderationInEffectVideoTitle', // shown when user attempts to enable video during AV moderation
                      'notify.moderator', // shown when user gets moderator privilege
                      'notify.mutedRemotelyTitle', // shown when user is muted by a remote party
                      'notify.mutedTitle', // shown when user has been muted upon joining,
                      'notify.newDeviceAudioTitle', // prompts the user to use a newly detected audio device
                      'notify.newDeviceCameraTitle', // prompts the user to use a newly detected camera
                      'notify.noiseSuppressionFailedTitle', // shown when failed to start noise suppression
                      'notify.participantWantsToJoin', // shown when lobby is enabled and participant requests to join meeting
                      'notify.participantsWantToJoin', // shown when lobby is enabled and participants request to join meeting
                      'notify.passwordRemovedRemotely', // shown when a password has been removed remotely
                      'notify.passwordSetRemotely', // shown when a password has been set remotely
                      'notify.raisedHand', // shown when a participant used raise hand,
                      'notify.screenShareNoAudio', // shown when the audio could not be shared for the selected screen
                      'notify.screenSharingAudioOnlyTitle', // shown when the best performance has been affected by screen sharing
                      'notify.selfViewTitle', // show "You can always un-hide the self-view from settings"
                      'notify.startSilentTitle', // shown when user joined with no audio
                      'notify.suboptimalExperienceTitle', // show the browser warning
                      'notify.unmute', // shown to moderator when user raises hand during AV moderation
                      'notify.videoMutedRemotelyTitle', // shown when user's video is muted by a remote party,
                      'notify.videoUnmuteBlockedTitle', // shown when camera unmute and desktop sharing are blocked
                      'prejoin.errorDialOut',
                      'prejoin.errorDialOutDisconnected',
                      'prejoin.errorDialOutFailed',
                      'prejoin.errorDialOutStatus',
                      'prejoin.errorStatusCode',
                      'prejoin.errorValidation',
                      'recording.busy', // shown when recording service is busy
                      'recording.failedToStart', // shown when recording fails to start
                      'recording.unavailableTitle', // shown when recording service is not reachable
                      'toolbar.noAudioSignalTitle', // shown when a broken mic is detected
                      'toolbar.noisyAudioInputTitle', // shown when noise is detected for the current microphone
                      'toolbar.talkWhileMutedPopup', // shown when user tries to speak while muted
                      'transcribing.failed', // shown when transcribing fails
                    ],
                    hideConferenceSubject: true,
                    hideConferenceTimer: true,
                    hideRecordingLabel: false,
                    hideParticipantsStats: true,
                    notifications: [],
                  }}
                  interfaceConfigOverwrite={{
                    MOBILE_APP_PROMO: false,
                    MAXIMUM_ZOOMING_COEFFICIENT: 1,
                    SETTINGS_SECTIONS: [
                      'devices',
                      'more',
                      'language',
                      'moderator',
                    ],
                    SHOW_CHROME_EXTENSION_BANNER: false,
                  }}
                  userInfo={{
                    displayName: localStorage.getItem('userName'),
                  }}
                  getIFrameRef={iframeRef => {
                    iframeRef.style.height = '100%';
                    iframeRef.style.width = '100%';
                  }}
                  onReadyToClose={() => {
                    navigate('../../end-call');
                  }}
                  onApiReady={handleApiReady}
                />
              </JitsiContainer>
            </PlayerWrapper>

            <ButtonBox className={!isButtonBoxOpen ? 'hidden' : ''}>
              <ChatBtn onClick={toggleChat}>
                <ChatLogo />
              </ChatBtn>
            </ButtonBox>

            <BoxHideSwitch id="no-transform" onClick={toggleButtonBox}>
              {isButtonBoxOpen ? <BoxHideLeftSwitch /> : <BoxHideRightSwitch />}
            </BoxHideSwitch>

            <StudentInput
              isInputOpen={isQuizInputOpen}
              socket={socketRef.current}
              toggleQuiz={toggleQuizInput}
              page={room}
              currentUser={currentUser}
              questionID={questionID.current}
            />

            <StudentOptions
              isInputOpen={isQuizOptionsOpen}
              socket={socketRef.current}
              toggleQuiz={toggleQuizOptions}
              page={room}
              currentUser={currentUser}
              questionID={questionID.current}
            />

            <StudentTrueFalse
              isInputOpen={isQuizTrueFalseOpen}
              socket={socketRef.current}
              toggleQuiz={toggleQuizTrueFalse}
              page={room}
              currentUser={currentUser}
              questionID={questionID.current}
            />

            {height > width && (
              <ChatBox ref={chatEl} className={isChatOpen ? 'shown' : 'hidden'}>
                <Chat
                  socket={socketRef.current}
                  messages={messages}
                  isChatOpen={isChatOpen}
                  currentUser={currentUser}
                  room={room}
                />
              </ChatBox>
            )}
          </StreamSection>
          {width >= height && (
            <ChatBox ref={chatEl} className={isChatOpen ? 'shown' : 'hidden'}>
              <Chat
                socket={socketRef.current}
                messages={messages}
                isChatOpen={isChatOpen}
                currentUser={currentUser}
                room={room}
              />
            </ChatBox>
          )}
        </>
      )}
    </>
  );
};

export default Stream;
