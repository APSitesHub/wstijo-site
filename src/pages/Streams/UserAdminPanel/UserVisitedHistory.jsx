import axios from 'axios';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { useEffect, useState } from 'react';
import { DatesEditBlock } from './UserAdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const UserVisitedEditForm = ({ userToView }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editedVisited, setEditedVisited] = useState([]);

  useEffect(() => {
    const reversedVisited = [...userToView.visited]
      .filter(
        visit =>
          visit !== '21.04.2025' &&
          new Date(visit.split('.').reverse().join('-')).getDay() > 0 &&
          new Date(visit.split('.').reverse().join('-')).getDay() < 6
      )
      .reverse();
    setEditedVisited(reversedVisited);
  }, [userToView]);

  useEffect(() => {
    setIsLoading(!editedVisited);
  }, [editedVisited]);

  return (
    <>
      <DatesEditBlock>
        <div
          style={{
            maxHeight: '70dvh',
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px',
          }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {[
                ...new Set(
                  editedVisited.map(date => date.replace(' lesson', ''))
                ),
              ].map((visit, index) => (
                <div
                  style={{
                    padding: '10px',
                    border: '1px solid black',
                    borderRadius: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                  key={index}
                >
                  <div
                    id={`date-${index}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>{visit}</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </DatesEditBlock>
      {isLoading && <Loader />}
    </>
  );
};
