import React from 'react'
import {render, cleanup} from 'react-testing-library'
import CandidateApp from '../CandidateApp';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import reducer from '../../Reducers'
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

afterEach(cleanup);


const candidateData = [
  {
  "id": 1,
  "name": "Alvin Satterfield",
  "email": "cornellbartell@connellyleannon.biz",
  "birth_date": "1997-09-07",
  "year_of_experience": 5,
  "position_applied": "Technician",
  "application_date": "2018-07-02",
  "status": "rejected"
  },
  {
  "id": 2,
  "name": "Colette Morar",
  "email": "corinnestark@pacocha.co",
  "birth_date": "1998-08-03",
  "year_of_experience": 3,
  "position_applied": "Designer",
  "application_date": "2017-11-18",
  "status": "waiting"
  },
  {
    "id": 3,
    "name": "Rosalind Rath DDS",
    "email": "sandyankunding@marks.io",
    "birth_date": "1980-03-28",
    "year_of_experience": 15,
    "position_applied": "Designer",
    "application_date": "2018-01-31",
    "status": "approved"
  },
  {
    "id": 4,
    "name": "Cyrstal Kunze",
    "email": "lavernokon@stroman.name",
    "birth_date": "1997-10-30",
    "year_of_experience": 8,
    "position_applied": "Analyst",
    "application_date": "2018-09-12",
    "status": "rejected"
  }
];

describe('Table Element', () => {
  test('it renders table data', async () => {

    const mockCandidateFn = jest.fn();
    const props = {
      candidateInfoAction: mockCandidateFn,
      candidateInfoData: candidateData,
      candidateInfoError: null,
      candidateInfoFetched: true,
      candidateInfoFetching: false
    }

    const middleware = applyMiddleware(  promise(),  thunk);
    const store = createStore(reducer, middleware)
    const { getByText } = render(
      <Provider store={store}>
       <CandidateApp {...props} />
      </Provider>
    )
    const appNode = getByText('Applications');

    expect(appNode).toBeDefined();

  })
})
