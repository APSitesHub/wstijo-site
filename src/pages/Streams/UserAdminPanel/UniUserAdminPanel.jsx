import axios from 'axios';
import { FormBtnText, Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  LoginForm,
} from 'pages/Streams/AdminPanel/AdminPanel.styled';
import {
  AdminPanelSection,
  ArrowDownIcon,
  UserCell,
  UserDBCaption,
  UserDBRow,
  UserDBTable,
  UserHeadCell,
} from './UserAdminPanel.styled';
import { LoginLogo } from 'components/Stream/Stream.styled';
import { LoginErrorNote } from 'pages/MyWSTIJO/MyWSTIJOPanel/MyWSTIJOPanel.styled';
import { Backdrop } from 'components/LeadForm/Backdrop/Backdrop.styled';
import { UserVisitedEditForm } from './UserVisitedHistory';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const Universities = {
  WSTIJO: 'WSTIJO',
};

const getAttendancePercentage = (attendance, group) => {
  const startDate = !group || group === '1' ? '2025-05-12' : '2025-05-12';

  const endDate = new Date();

  const excludedDates = ['2025-04-21'];

  const validLessonDates = [];

  const current = new Date(startDate);

  while (current <= endDate) {
    const day = current.getDay();

    const isoDate = current.toISOString().split('T')[0];

    // Weekdays only (Mon-Fri), exclude holiday
    if (day >= 1 && day <= 5 && !excludedDates.includes(isoDate)) {
      validLessonDates.push(isoDate);
    }

    current.setDate(current.getDate() + 1);
  }

  // Normalize student's dates (in case formats vary slightly)
  const normalizedAttended = attendance.map(date => {
    const parts = date.split('.');
    return `${parts[2]}-${parts[1]}-${parts[0]}`; // YYYY-MM-DD
  });

  const attendedCount = validLessonDates.filter(date =>
    normalizedAttended.includes(date)
  ).length;

  // Calculate percentage
  const percentage = (attendedCount / validLessonDates.length) * 100;

  return `${attendedCount} z ${validLessonDates.length} = ${percentage.toFixed(
    2
  )}%`;
};

const translations = {
  pl: {
    loginPlaceholder: 'Login',
    passwordPlaceholder: 'Password',
    loginRequired: 'Podaj login!',
    passwordRequired: 'Podaj hasło!',
    loginButton: 'Zaloguj się',
    addUserButton: 'Dodaj użytkownika',
    userListCaption: 'Lista użytkowników z dostępem do lekcji',
    crmLeadContact: 'CRM&nbsp;Lider Kontakt',
    name: 'Nazwisko i imię',
    email: 'Poczta (login)',
    password: 'Hasło',
    university: 'Uniwersytet',
    group: 'Grupa',
    points: 'Punkty',
    platformId: 'ID na platformie',
    attendance: 'Obecność',
    percentage: 'Procent obecności',
    visitsWithTime: 'Odwiedziny z czasem',
    deleteUserConfirmation: 'Czy na pewno usunąć',
    userDeleted: 'Użytkownik został usunięty',
    deleteUserError:
      'Wystąpił problem - naciśnij F12, zrób zrzut ekranu konsoli, wyślij do Kirila',
    addUserError:
      'Wystąpił problem - naciśnij F12, zrób zrzut ekranu konsoli, wyślij do Kirila',
    userAdded: 'Użytkownik został dodany',
    universityRequired: 'Uniwersytet - obowiązkowe pole!',
    groupRequired: 'Grupa - obowiązkowe pole!',
    userNameRequired:
      'Imię - obowiązkowe pole, jeśli imienia z jakiegoś powodu nie znamy, wpisz N/A',
    userEmailRequired: 'Login - obowiązkowe pole!',
    userPasswordRequired: 'Hasło - obowiązkowe pole!',
    crmIdDigitsOnly: 'Tylko cyfry',
    contactIdDigitsOnly: 'Tylko cyfry',
    pupilIdDigitsOnly: 'Tylko cyfry',
    pupilIdMinLength: 'Nie mniej niż 6 cyfr',
    pupilIdMaxLength: 'Nie więcej niż 7 cyfr',
    pupilIdRequired: 'Obowiązkowe pole, sprawdź na platformie',
  },
  ua: {
    loginPlaceholder: 'Логін',
    passwordPlaceholder: 'Пароль',
    loginRequired: 'Введіть логін!',
    passwordRequired: 'Введіть пароль!',
    loginButton: 'Залогінитись',
    addUserButton: 'Додати юзера',
    userListCaption: 'Список юзерів з доступом до уроків',
    crmLeadContact: 'CRM Лід Контакт',
    name: "Прізвище та ім'я",
    email: 'Пошта (логін)',
    password: 'Пароль',
    university: 'Університет',
    group: 'Група',
    points: 'Бали',
    platformId: 'ID на платформі',
    attendance: 'Відвідини',
    visitsWithTime: 'Відвідини з часом',
    deleteUserConfirmation: 'Точно видалити?',
    userDeleted: 'Юзера видалено',
    deleteUserError:
      'Десь якась проблема - клацай F12, роби скрін консолі, відправляй Кирилу',
    addUserError:
      'Десь якась проблема - клацай F12, роби скрін консолі, відправляй Кирилу',
    userAdded: 'Юзера додано',
    universityRequired: "Університет - обов'язкове поле!",
    groupRequired: "Група - обов'язкове поле!",
    userNameRequired:
      "Ім'я - обов'язкове поле, якщо імені з якоїсь причини ми не знаємо, введіть N/A",
    userEmailRequired: "Пошта - обов'язкове поле!",
    userPasswordRequired: "Пароль - обов'язкове поле!",
    crmIdDigitsOnly: 'Тільки цифри',
    contactIdDigitsOnly: 'Тільки цифри',
    pupilIdDigitsOnly: 'Тільки цифри',
    pupilIdMinLength: 'Не менше 6 цифр',
    pupilIdMaxLength: 'Не більше 7 цифр',
    pupilIdRequired: "Обов'язкове поле, дивитись на платформі",
  },
};

const UniUserAdminPanel = ({ uni, lang = 'ua' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [userToView, setUserToView] = useState({});
  // eslint-disable-next-line
  const [daysAfterLastLogin, setDaysAfterLastLogin] = useState(7);
  const [isUserInfoIncorrect, setIsUserInfoIncorrect] = useState(false);
  const [isVisitedHistoryOpen, setIsVisitedHistoryOpen] = useState(false);

  useEffect(() => {
    document.title = uni
      ? `${Universities[uni]} | Admin Panel`
      : 'Polish University Users Admin Panel';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('/admins/refresh/wstijo/', {});
          setAuthToken(res.data.newToken);
          setIsUserAdmin(isAdmin => (isAdmin = true));
        }
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();

    const getUsers = async () => {
      try {
        if (isUserAdmin) {
          const response = await axios.get(
            `/uniusers/admin/${uni ? uni.toLowerCase() : ''}`
          );

          setUsers(
            users =>
              (users = [
                ...response.data
                  .reverse()
                  .sort((a, b) => a.name.localeCompare(b.name)),
              ])
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, [isUserAdmin, uni]);

  const initialLoginValues = {
    login: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    login: yup.string().required(translations[lang]?.loginRequired),
    password: yup.string().required(translations[lang]?.passwordRequired),
  });

  const changeDateFormat = dateString => {
    if (dateString) {
      const dateArray = dateString.split('.');
      return dateArray.length > 2
        ? Date.parse([dateArray[1], dateArray[0], dateArray[2]].join('/'))
        : Date.parse(dateString);
    }
    return;
  };

  const handleLoginSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));
    try {
      const response = await axios.post('/admins/login/wstijo', values);
      setAuthToken(response.data.token);
      setIsUserAdmin(isAdmin => (isAdmin = true));
      localStorage.setItem('isAdmin', true);
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const handleVisitedView = async id => {
    setIsVisitedHistoryOpen(true);
    setUserToView(
      userToView => (userToView = users.find(user => user._id === id))
    );
  };

  const closeHistory = e => {
    setIsVisitedHistoryOpen(false);
  };

  const closeHistoryOnClick = e => {
    if (e.target.id === 'close-on-click') {
      setIsVisitedHistoryOpen(false);
    }
  };

  const sortByGroup = () => {
    setUsers(users => [
      ...users.sort((a, b) => {
        if (!a.group) return 1;
        if (!b.group) return -1;
        return a.group.localeCompare(b.group);
      }),
    ]);
  };

  return (
    <>
      <AdminPanelSection>
        {!isUserAdmin && (
          <Formik
            initialValues={initialLoginValues}
            onSubmit={handleLoginSubmit}
            validationSchema={loginSchema}
          >
            <LoginForm>
              <LoginLogo />
              <Label>
                <AdminInput
                  type="text"
                  name="login"
                  placeholder={translations[lang]?.loginPlaceholder}
                  onBlur={() => setIsUserInfoIncorrect(false)}
                />
                <AdminInputNote component="p" name="login" />
              </Label>
              <Label>
                <AdminInput
                  type="password"
                  name="password"
                  placeholder={translations[lang]?.passwordPlaceholder}
                  onBlur={() => setIsUserInfoIncorrect(false)}
                />
                <AdminInputNote component="p" name="password" />
              </Label>
              <AdminFormBtn type="submit">
                <FormBtnText>{translations[lang]?.loginButton}</FormBtnText>
              </AdminFormBtn>
              <LoginErrorNote
                style={
                  isUserInfoIncorrect ? { opacity: '1' } : { opacity: '0' }
                }
              >
                Password or email is incorrect!
              </LoginErrorNote>
            </LoginForm>
          </Formik>
        )}

        {isUserAdmin && users && (
          <UserDBTable>
            <UserDBCaption>{translations[lang]?.userListCaption}</UserDBCaption>
            <thead>
              <UserDBRow>
                <UserHeadCell>№</UserHeadCell>
                {!uni && (
                  <UserHeadCell>
                    {translations[lang]?.crmLeadContact}
                  </UserHeadCell>
                )}
                <UserHeadCell>{translations[lang]?.name}</UserHeadCell>
                <UserHeadCell>{translations[lang]?.email}</UserHeadCell>
                {!uni && (
                  <UserHeadCell>{translations[lang]?.password}</UserHeadCell>
                )}
                {!uni && (
                  <UserHeadCell>{translations[lang]?.university}</UserHeadCell>
                )}
                <UserHeadCell style={{ whiteSpace: 'nowrap' }}>
                  {translations[lang]?.group}
                  <button
                    style={{
                      padding: '0',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      marginLeft: '4px',
                    }}
                    onClick={sortByGroup}
                  >
                    <ArrowDownIcon />
                  </button>
                </UserHeadCell>
                <UserHeadCell>{translations[lang]?.points}</UserHeadCell>
                <UserHeadCell>{translations[lang]?.platformId}</UserHeadCell>
                <UserHeadCell>{translations[lang]?.attendance}</UserHeadCell>
                <UserHeadCell>{translations[lang]?.percentage}</UserHeadCell>
                {!uni && (
                  <UserHeadCell>
                    {translations[lang]?.visitsWithTime}
                  </UserHeadCell>
                )}
              </UserDBRow>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <UserDBRow key={user._id}>
                  <UserCell>{index + 1}</UserCell>
                  {!uni && (
                    <UserCell>
                      <a
                        href={`https://apeducation.kommo.com/leads/detail/${user.crmId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {user.crmId}
                      </a>{' '}
                      <a
                        href={`https://apeducation.kommo.com/contacts/detail/${user.contactId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {user.contactId}
                      </a>
                    </UserCell>
                  )}
                  <UserCell>{user.name}</UserCell>
                  <UserCell>{user.mail}</UserCell>
                  {!uni && <UserCell>{user.password}</UserCell>}
                  {!uni && (
                    <UserCell className="last-name">{user.university}</UserCell>
                  )}
                  <UserCell>{user.group ? user.group : '1'}</UserCell>
                  <UserCell>{user.points ? user.points : '0'}</UserCell>
                  <UserCell>{user.pupilId}</UserCell>
                  <UserCell
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => handleVisitedView(user._id)}
                    className={
                      Math.floor(
                        (Date.now() -
                          changeDateFormat(
                            user.visited[user.visited.length - 1]?.replace(
                              ' lesson',
                              ''
                            )
                          )) /
                          86400000
                      ) > daysAfterLastLogin
                        ? 'attention'
                        : ''
                    }
                  >
                    {user.visited[user.visited.length - 1]?.replace(
                      ' lesson',
                      ''
                    )}
                  </UserCell>
                  <UserCell
                    className={
                      getAttendancePercentage(
                        [
                          ...new Set(
                            user.visited.map(visit =>
                              visit.replace(' lesson', '')
                            )
                          ),
                        ],
                        user.group
                      )
                        .replace('%', '')
                        .split(' = ')[1] < 50
                        ? 'attention'
                        : ''
                    }
                  >
                    {getAttendancePercentage(
                      [
                        ...new Set(
                          user.visited.map(visit =>
                            visit.replace(' lesson', '')
                          )
                        ),
                      ],
                      user.group
                    )}
                  </UserCell>
                  {!uni && (
                    <UserCell>
                      {!user.visitedTime[user.visitedTime.length - 1]
                        ? ''
                        : user.visitedTime[user.visitedTime.length - 1].match(
                            '^202'
                          )
                        ? new Date(
                            user.visitedTime[user.visitedTime.length - 1]
                          ).toLocaleString('uk-UA')
                        : new Date(
                            changeDateFormat(
                              user.visitedTime[user.visitedTime.length - 1]
                            )
                          ).toLocaleString('uk-UA', { timeZone: '+06:00' })}
                    </UserCell>
                  )}
                </UserDBRow>
              ))}
            </tbody>
          </UserDBTable>
        )}
        {isVisitedHistoryOpen && (
          <Backdrop onMouseDown={closeHistoryOnClick} id="close-on-click">
            <UserVisitedEditForm
              userToView={userToView}
              closeHistory={closeHistory}
            />
          </Backdrop>
        )}
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default UniUserAdminPanel;
