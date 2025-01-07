import axios from 'axios';
import { nanoid } from 'nanoid';
import { useLayoutEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';
import {
  SupportClipBoardAdd,
  SupportClipBoardCopy,
  SupportKahootPickerIcon,
  SupportNameReverse,
} from '../Support/Support.styled';
import {
  ClipBoardAdd,
  ClipBoardBtn,
  ClipBoardCopy,
  ClipBoardFormDismissBtn,
  ClipBoardFormText,
  ClipBoardInput,
  ClipBoardInputForm,
  ClipBoardNotification,
  ClipBoardSubmitBtn,
  DismissIcon,
  KahootBackground,
  KahootBox,
  KahootDisclaimerBackground,
  KahootDisclaimerBox,
  KahootDisclaimerHeader,
  KahootDisclaimerItem,
  KahootDisclaimerList,
  KahootDisclaimerText,
  KahootExitFullScreenIcon,
  KahootFullScreenBtn,
  KahootFullScreenIcon,
  KahootNameValidation,
  KahootNumbersBtn,
  KahootNumbersHider,
  KahootPicker,
  KahootPickerBtn,
  NameReverse,
  NameReverseBtn,
} from './Kahoots.styled';

export const Kahoots = ({
  sectionWidth,
  sectionHeight,
  isKahootOpen,
  isChatOpen,
  isOpenedLast,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(true);
  const [username, setUsername] = useState(
    localStorage.getItem('userName') || ''
  );
  const [kahoots, setKahoots] = useState({});
  const [activeKahoot, setActiveKahoot] = useState(0);

  let location = useLocation();

  const { ref, inView } = useInView({
    triggerOnce: true,
    delay: 1000,
  });

  const trialsSwitch = path => {
    switch (path) {
      case 'a1free':
        return 'a1kidsfree';
      case 'pilot':
        return 'deutsch';
      case 'b1beginner':
        return 'b1kidsbeginner';
      case 'b2beginner':
        return 'b2kidsbeginner';
      case 'trendets':
        return 'trendets';
      case 'pilot-a1':
        return 'a1';
      case 'test1':
        return 'test';
      case 'trial-en':
        return 'trials';
      case 'trial-de':
        return 'trials_de';
      case 'trial-pl':
        return 'trials_pl';
      case 'trial-kids':
        return 'trials_kids';
      default:
        break;
    }
  };

  const page =
    location.pathname.includes('pilot') ||
    location.pathname.includes('beginner') ||
    location.pathname.includes('trendets') ||
    (location.pathname.includes('streams-kids') &&
      location.pathname.includes('free'))
      ? trialsSwitch(location.pathname.match(/\/([^/]+)\/?$/)[1])
      : location.pathname.includes('preschool')
      ? location.pathname.match(/\/([^/]+)\/?$/)[1]
      : location.pathname.includes('pre') ||
        location.pathname.includes('beg') ||
        location.pathname.includes('mid') ||
        location.pathname.includes('high')
      ? 'kids' + location.pathname.match(/\/([^/]+)\/?$/)[1]
      : location.pathname.includes('streams-kids')
      ? location.pathname.match(/\/([^/]+)\/?$/)[1] + 'kids'
      : location.pathname.includes('trial') ||
        location.pathname.includes('pilot') ||
        location.pathname.includes('test1')
      ? trialsSwitch(location.pathname.match(/\/([^/]+)\/?$/)[1])
      : location.pathname.match(/\/([^/]+)\/?$/)[1];

  console.log(111, page);

  const kahootWidth = isFullScreen ? sectionWidth : (sectionWidth / 10) * 4;

  const getLinksForLocation = () => {
    const entries = [];
    Object.values(kahoots[page].links).map(entry => {
      entries.push(entry);
      return entries;
    });
    return entries;
  };

  const kahootLinksRefresher = async e => {
    if (e.target === e.currentTarget) {
      setKahoots((await axios.get('/unikahoots')).data);
    }
  };

  const setKahootNumber = async e => {
    const kahootNumber = parseInt(e.currentTarget.innerText);
    setKahoots((await axios.get('/unikahoots')).data);
    setActiveKahoot(kahootNumber);
  };

  useLayoutEffect(() => {
    const getLinksRequest = async () => {
      try {
        setKahoots((await axios.get('/unikahoots')).data);
      } catch (error) {
        console.log(error);
      }
    };

    getLinksRequest();
  }, []);

  const toggleFullScreen = () => {
    setIsFullScreen(isFullScreen => (isFullScreen = !isFullScreen));
  };

  const toggleKahootPicker = () => {
    setIsAnimated(false);
    setIsPickerOpen(isOpen => (isOpen = !isOpen));
    setActiveKahoot(1);
  };

  const disableEnter = e => (e.key === 'Enter' ? e.preventDefault() : null);

  const createNameInput = btn => {
    btn.disabled = true;
    document.addEventListener('keydown', disableEnter);
    toast(
      t => (
        <ClipBoardInputForm
          onSubmit={async e => {
            e.preventDefault();
            const userName = localStorage.getItem('userName');
            if (!userName) {
              createValidationEmptyInput();
              return;
            } else if (userName.trim().trimStart().split(' ').length < 2) {
              createValidationNotEnoughWords();
              return;
            } else {
              toast.dismiss(t.id);
              document.removeEventListener('keydown', disableEnter);
              setUsername(
                username => (username = localStorage.getItem('userName'))
              );
              btn.disabled = false;
              if (localStorage.getItem('userName')) {
                copyToClipboard(btn);
              }
              localStorage.setItem('userID', nanoid(8));
            }
          }}
        >
          <ClipBoardFormDismissBtn
            onClick={e => {
              e.preventDefault();
              toast.dismiss(t.id);
              btn.disabled = false;
              document.removeEventListener('keydown', disableEnter);
            }}
          >
            <DismissIcon />
          </ClipBoardFormDismissBtn>
          <ClipBoardFormText>
            Введіть ваше ім'я в це поле, щоб вам не доводилося вводити його
            декілька разів під час уроку.
          </ClipBoardFormText>
          <ClipBoardFormText>
            Будь ласка, вводьте повне ім'я без скорочень, щоб ми могли правильно
            зарахувати ваші бали!
          </ClipBoardFormText>
          <ClipBoardInput
            name="username"
            placeholder="Ім'я"
            defaultValue={localStorage.getItem('userName')}
            onChange={e => {
              if (e.target.value) {
                localStorage.setItem('userName', e.target.value);
              }
            }}
          />
          <ClipBoardSubmitBtn>Зберегти</ClipBoardSubmitBtn>
        </ClipBoardInputForm>
      ),
      { duration: Infinity }
    );
  };

  const createValidationEmptyInput = () => {
    toast.error(
      t => (
        <>
          <ClipBoardFormDismissBtn onClick={() => toast.dismiss(t.id)}>
            <DismissIcon />
          </ClipBoardFormDismissBtn>
          <KahootNameValidation>
            Ім'я та прізвище обов'язкові!
          </KahootNameValidation>
        </>
      ),
      { duration: 1500 }
    );
  };

  const createValidationNotEnoughWords = () => {
    toast.error(
      t => (
        <>
          <ClipBoardFormDismissBtn onClick={() => toast.dismiss(t.id)}>
            <DismissIcon />
          </ClipBoardFormDismissBtn>
          <KahootNameValidation>
            Прізвище та ім'я, будь ласка, 2 слова!
          </KahootNameValidation>
        </>
      ),
      { duration: 1500 }
    );
  };

  const copyToClipboard = btn => {
    navigator.clipboard.writeText(localStorage.getItem('userName'));
    toast.success(
      t => (
        <ClipBoardNotification>
          <ClipBoardFormText>
            <ClipBoardFormDismissBtn onClick={() => toast.dismiss(t.id)}>
              <DismissIcon />
            </ClipBoardFormDismissBtn>
            {`${localStorage.getItem('userName')}`}, ваше ім'я додано в буфер
            обміну, можете вставити його у відповідне поле!
          </ClipBoardFormText>

          <ClipBoardFormText>
            Випадково помилились? Натисніть на цю кнопку:{' '}
          </ClipBoardFormText>
          <ClipBoardSubmitBtn
            onClick={() => {
              toast.dismiss(t.id);
              createNameInput(btn);
            }}
          >
            Виправити помилку
          </ClipBoardSubmitBtn>
        </ClipBoardNotification>
      ),
      { duration: 3000 }
    );
  };

  const reverseAndCopyToClipboard = btn => {
    toast.dismiss();
    navigator.clipboard.writeText(localStorage.getItem('userName'));
    toast.success(
      t => (
        <ClipBoardNotification>
          <ClipBoardFormText>
            <ClipBoardFormDismissBtn onClick={() => toast.dismiss(t.id)}>
              <DismissIcon />
            </ClipBoardFormDismissBtn>
            {`${localStorage.getItem('userName')}`}, ваші ім'я та прізвище
            додані до буферу обміну в зворотньому порядку, можете вставити їх у
            відповідне поле і спробувати підключитись до Кахуту знов!
          </ClipBoardFormText>

          <ClipBoardFormText>
            Треба виправити помилку? Натисніть на цю кнопку:{' '}
          </ClipBoardFormText>

          <ClipBoardSubmitBtn
            onClick={() => {
              toast.dismiss(t.id);
              createNameInput(btn);
            }}
          >
            Виправити помилку
          </ClipBoardSubmitBtn>
        </ClipBoardNotification>
      ),
      { duration: 3000 }
    );
  };

  const handleUsernameBtn = e => {
    const btn = e.currentTarget;
    username ? copyToClipboard(btn) : createNameInput(btn);
  };

  const handleUsernameReverseBtn = e => {
    const reverseUsername = username
      .trim()
      .trimStart()
      .split(' ')
      .reverse()
      .join(' ');
    localStorage.setItem('userName', reverseUsername);
    setUsername(username => (username = reverseUsername));
    reverseAndCopyToClipboard(e.currentTarget);
  };

  return (
    <>
      {Object.keys(kahoots).length && (
        <KahootBox
          ref={ref}
          className={isKahootOpen ? 'shown' : 'hidden'}
          style={{
            zIndex: isOpenedLast === 'kahoot' ? '3' : '1',
            width: isChatOpen ? kahootWidth - 300 : kahootWidth,
            height: sectionHeight,
          }}
          onTransitionEnd={kahootLinksRefresher}
        >
          <KahootNumbersHider
            onClick={toggleKahootPicker}
            className={inView && isAnimated ? 'animated' : ''}
            tabIndex={-1}
          >
            <KahootPickerBtn />
          </KahootNumbersHider>
          <KahootPicker className={isPickerOpen ? 'shown' : 'hidden'}>
            {Object.values(kahoots[page].links).map((link, i) => (
              <KahootNumbersBtn
                key={i}
                onClick={setKahootNumber}
                className={activeKahoot === i + 1 ? 'active' : ''}
                tabIndex={-1}
              >
                {i + 1}
              </KahootNumbersBtn>
            ))}
          </KahootPicker>
          {username && (
            <NameReverseBtn
              tabIndex={-1}
              onClick={e => handleUsernameReverseBtn(e)}
            >
              <NameReverse />
            </NameReverseBtn>
          )}
          {activeKahoot ? (
            getLinksForLocation().map(
              (link, i) =>
                activeKahoot === i + 1 && (
                  <KahootBackground key={i}>
                    <iframe
                      id="kahoot-window"
                      title="kahoot-pin"
                      src={link}
                      width={
                        !isChatOpen
                          ? kahootWidth
                          : isFullScreen
                          ? kahootWidth - 300
                          : kahootWidth
                      }
                      height={sectionHeight}
                    ></iframe>
                    <KahootFullScreenBtn onClick={toggleFullScreen}>
                      {isFullScreen ? (
                        <KahootExitFullScreenIcon />
                      ) : (
                        <KahootFullScreenIcon />
                      )}
                    </KahootFullScreenBtn>
                    <ClipBoardBtn onClick={handleUsernameBtn}>
                      {username ? <ClipBoardCopy /> : <ClipBoardAdd />}
                    </ClipBoardBtn>
                  </KahootBackground>
                )
            )
          ) : (
            <KahootDisclaimerBackground
              style={
                !isChatOpen
                  ? { width: `${kahootWidth}px` }
                  : isFullScreen
                  ? { width: `${kahootWidth - 300}px` }
                  : { width: `${kahootWidth}px` }
              }
            >
              <KahootDisclaimerBox>
                <KahootDisclaimerHeader>
                  Привіт! Це вікно Кахутів.
                </KahootDisclaimerHeader>
                <KahootDisclaimerText>
                  Ми постійно працюємо над розширенням функціоналу нашого сайту,
                  щоб ваші заняття залишалися для вас приємним досвідом, тому
                  внесли декілька важливих змін:
                </KahootDisclaimerText>
                <KahootDisclaimerList>
                  <KahootDisclaimerItem>
                    <KahootDisclaimerText>
                      Вводити код Кахуту тепер не потрібно, адже ми вже ввели
                      його за вас. Просто тисніть кнопку{' '}
                      <SupportKahootPickerIcon /> у правому верхньому кутку
                      цього вікна і обирайте номер Кахуту. Почніть з першого. 😉
                    </KahootDisclaimerText>
                  </KahootDisclaimerItem>
                  <KahootDisclaimerItem>
                    <KahootDisclaimerText>
                      Ім'я вводити кожного разу тепер теж не обов'язково.
                      Тисніть кнопку <SupportClipBoardAdd /> та вводьте в
                      невеличке віконце ваше ім'я (не забувайте про наші
                      рекомендації). Ви можете вводити своє ім'я повністю
                      (наприклад: Володимир Зеленський), Кахут обріже зайві
                      літери автоматично (вийде: Володимир Зелен). Коли введете,
                      клікніть кнопку "Зберегти" і ваше ім'я збережеться у буфер
                      обміну, а кнопка буде виглядати так:{' '}
                      <SupportClipBoardCopy />.
                    </KahootDisclaimerText>
                  </KahootDisclaimerItem>{' '}
                  <KahootDisclaimerItem>
                    <KahootDisclaimerText>
                      Тепер при кліку на цю кнопку ви зможете швидко копіювати
                      своє ім'я і просто вставляти його у поле Кахуту. Якщо ви
                      припустилися помилки, вводячи своє ім'я, ви можете в
                      будь-який момент натиснути кнопку <SupportClipBoardCopy />
                      , а у віконці, що відкриється, кнопку "Виправити", після
                      чого введіть ім'я заново.
                    </KahootDisclaimerText>
                  </KahootDisclaimerItem>
                  <KahootDisclaimerItem>
                    <KahootDisclaimerText>
                      У разі, якщо вас за якоїсь причини викинуло з Кахуту і не
                      пускає назад з тим же іменем, тисніть кнопку{' '}
                      <SupportNameReverse />, вона збереже ваше ім'я та прізвище
                      у зворотньому порядку, що дасть вам змогу швидко зайти до
                      Кахуту під "новим" ім'ям.
                    </KahootDisclaimerText>
                  </KahootDisclaimerItem>
                </KahootDisclaimerList>
              </KahootDisclaimerBox>
              <KahootFullScreenBtn onClick={toggleFullScreen} tabIndex={-1}>
                {isFullScreen ? (
                  <KahootExitFullScreenIcon />
                ) : (
                  <KahootFullScreenIcon />
                )}
              </KahootFullScreenBtn>
              <ClipBoardBtn tabIndex={-1} onClick={e => handleUsernameBtn(e)}>
                {username ? <ClipBoardCopy /> : <ClipBoardAdd />}
              </ClipBoardBtn>
            </KahootDisclaimerBackground>
          )}
        </KahootBox>
      )}
    </>
  );
};
