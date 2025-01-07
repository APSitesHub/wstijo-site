import axios from 'axios';
import { StreamsBackgroundWrapper } from 'components/BackgroundWrapper/BackgroundWrappers';
import { FormBtnText, Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { LoaderWrapper } from 'components/SharedLayout/Loaders/Loader.styled';
import { Formik } from 'formik';
import { nanoid } from 'nanoid';
import { LoginErrorNote } from 'pages/MyPedagogium/MyPedagogiumPanel/MyPedagogiumPanel.styled';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import {
  LoginFormText,
  LoginLogo,
  StreamAuthTextHello,
} from '../../components/Stream/Stream.styled';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  LoginForm,
} from './AdminPanel/AdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const Streams = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [links, setLinks] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isUserInfoIncorrect, setIsUserInfoIncorrect] = useState(false);
  const location = useLocation();

  console.log(location);

  const wakeupRequest = async () => {
    try {
      const wake = await axios.get('/');
      console.log(wake.data);
    } catch (error) {
      console.log(error);
    }
  };

  const detectUser = async () => {
    try {
      let ip;
      try {
        ip = (await axios.get('https://jsonip.com/')).data.ip;
        console.log(ip);
      } catch (error) {
        console.log(error);
      }
      const id = localStorage.getItem('userID');
      const user = await axios.get(
        `https://ap-chat-server.onrender.com/users/${id}`
      );
      console.log(user.data, 'detect');
      setCurrentUser(
        currentUser =>
          (currentUser = user.data || {
            username: 'User Is Not Logged In',
            isBanned: false,
            userIP: ip || 'user has disabled ip tracker',
          })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const initialLoginValues = {
    mail: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    mail: yup.string().required('Enter your email!'),
    password: yup.string().required('Enter your password!'),
  });

  const handleLoginSubmit = async (values, { resetForm }) => {
    values.mail = values.mail.toLowerCase().trim().trimStart();
    values.password = values.password.trim().trimStart();
    try {
      const response = await axios.post('/uniusers/login', values);
      console.log(values);
      console.log(response);
      setAuthToken(response.data.token);
      setIsUserLogged(isLogged => (isLogged = true));
      setCurrentUser(currentUser => (currentUser = response.data.user));
      localStorage.setItem('userID', nanoid(8));
      localStorage.setItem('mail', values.mail);
      localStorage.setItem('userName', response.data.user.name);
      setIsUserInfoIncorrect(false);
      resetForm();
    } catch (error) {
      error.response.status === 401 && setIsUserInfoIncorrect(true);
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    wakeupRequest();

    const getLinksRequest = async () => {
      try {
        setIsLoading(isLoading => (isLoading = true));
        setLinks((await axios.get('/unilinks')).data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    };
    getLinksRequest();

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        const res = await axios.post(
          'https://ap-server-8qi1.onrender.com/uniusers/refresh',
          { mail: localStorage.getItem('mail') }
        );
        setIsUserLogged(isLogged => (isLogged = true));
        const id = nanoid(8);
        if (!localStorage.getItem('userID')) {
          localStorage.setItem('userID', id);
        }
        localStorage.setItem('userName', res.data.user.name);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();
  }, []);

  useEffect(() => {
    detectUser();
  }, [isLoading]);

  return (
    <>
      <StreamsBackgroundWrapper>
        {!isUserLogged && !location.pathname.includes('-chat') ? (
          <Formik
            initialValues={initialLoginValues}
            onSubmit={handleLoginSubmit}
            validationSchema={loginSchema}
          >
            <LoginForm>
              <LoginLogo />
              <LoginFormText>
                <StreamAuthTextHello>Hello!</StreamAuthTextHello>
                Our website is not available without authorization. Please enter
                your email and password.
              </LoginFormText>
              <Label>
                <AdminInput
                  type="text"
                  name="mail"
                  placeholder="Email"
                  onBlur={() => setIsUserInfoIncorrect(false)}
                />
                <AdminInputNote component="p" name="mail" type="email" />
              </Label>
              <Label>
                <AdminInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onBlur={() => setIsUserInfoIncorrect(false)}
                />
                <AdminInputNote component="p" name="password" />
              </Label>
              <AdminFormBtn type="submit">
                <FormBtnText>Log In</FormBtnText>
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
        ) : (
          <Outlet context={[links, isLoading, currentUser]} />
        )}

        {isLoading && (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )}
      </StreamsBackgroundWrapper>
    </>
  );
};

export default Streams;
