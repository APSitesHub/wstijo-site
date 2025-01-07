import axios from 'axios';
import { Consent } from 'components/Consent/Consent';
import { LeadForm } from 'components/LeadForm/LeadForm';
import { MainFooterNew } from 'components/MainFooter/MainFooterNew';
import { MenuNew } from 'components/Menu/MenuNew';
import { MenuSchool } from 'components/Menu/MenuSchool';
import { MenuUniversity } from 'components/Menu/MenuUniversity';
import { UpButton } from 'components/UpButton/UpButton';
import { Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { OffsetLoader } from './Loaders/OffsetLoader';
import { SuspenseBox, SuspenseTitle } from './SharedLayout.styled';
import { MainFooterUniversity } from 'components/MainFooter/MainFooterUniversity';
import { MainFooterSchool } from 'components/MainFooter/MainFooterSchool';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const SharedLayout = ({ utms }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const location = useLocation();

  if (
    window.location.protocol === 'http:' &&
    window.location.hostname.includes('ap.education')
  ) {
    window.location.protocol = 'https:';
  }

  const toggleModal = () => {
    setIsOpenModal(isOpen => !isOpen);
    console.log('fire');
    document.body.style.overflowY = 'hidden';
    console.log(document.body.style.overflowY);
  };

  const closeModal = () => {
    setIsOpenModal(isOpen => (isOpen = false));
    !document.body.style.overflowY && isOpenModal
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = '');
  };

  const wakeupRequest = async () => {
    try {
      const wake = await axios.get('/');
      console.log(wake.data);
    } catch (error) {
      console.log(error);
    }
  };

  const authRequest = async () => {
    try {
      await axios.post('/tokens');
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    wakeupRequest();
    authRequest();
  }, []);

  useEffect(() => {
    const onEscapeClose = event => {
      if (event.code === 'Escape' && isOpenModal) {
        closeModal();
      }
    };

    window.addEventListener('keydown', onEscapeClose);

    return () => {
      window.removeEventListener('keydown', onEscapeClose);
    };
  });

  return (
    <>
      {location.pathname === '/school' ? (
        <MenuSchool toggleModal={toggleModal} />
      ) : location.pathname === '/university' ? (
        <MenuUniversity toggleModal={toggleModal} />
      ) : (
        <MenuNew toggleModal={toggleModal} />
      )}

      <Suspense
        fallback={
          <SuspenseBox>
            <SuspenseTitle as={'h2'}>Loading</SuspenseTitle>
            <OffsetLoader />
          </SuspenseBox>
        }
      >
        <Outlet />
      </Suspense>

      {location.pathname === '/school' ? (
        <MainFooterSchool toggleModal={toggleModal} />
      ) : location.pathname === '/university' ? (
        <MainFooterUniversity toggleModal={toggleModal} />
      ) : (
        <MainFooterNew toggleModal={toggleModal} />
      )}
      <Consent />
      <UpButton />

      {isOpenModal && <LeadForm closeModal={closeModal} utms={utms} />}
    </>
  );
};
