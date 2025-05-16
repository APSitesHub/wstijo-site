import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import { WindowedChat } from 'utils/Chat/ChatWindowed/WindowedChat';
import { Loader } from './SharedLayout/Loaders/Loader';
import UniUserAdminPanel from 'pages/Streams/UserAdminPanel/UniUserAdminPanel';

const Streams = lazy(() =>
  import(/* webpackChunkName: "Streams page" */ '../pages/Streams/Streams')
);

const Stream = lazy(() =>
  import(/* webpackChunkName: "Stream page" */ '../pages/Streams/Stream/Stream')
);

const MyWSTIJO = lazy(() =>
  import(/* webpackChunkName: "My WSTIJO Page" */ '../pages/MyWSTIJO/MyWSTIJO')
);

const NotFound = lazy(() =>
  import(/* webpackChunkName: "Not Found" */ '../pages/NotFound/NotFound')
);

export const App = () => {
  return (
    <>
      <Toaster
        containerStyle={{
          top: '10%',
        }}
      />
      <Suspense fallback={Loader} noindex={true}>
        <Routes noindex={true}>
          <Route path="/" element={<MyWSTIJO />} noindex={true}></Route>
          <Route
            path="admin"
            element={<UniUserAdminPanel uni={'WSTIJO'} lang={'pl'} />}
            noindex={true}
          />
          <Route path="*" element={<NotFound />} noindex={true} />
          <Route path="lesson" element={<Streams />} noindex={true}>
            <Route path="logistics" element={<Stream />} noindex={true} />
            <Route
              path="logistics-chat"
              element={<WindowedChat />}
              noindex={true}
            />
            {/* <Route path="prep" element={<Stream />} noindex={true} />
            <Route path="prep-chat" element={<WindowedChat />} noindex={true} /> */}
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
