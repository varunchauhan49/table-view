import React from 'react'
import {render, fireEvent, cleanup, waitForElement} from 'react-testing-library'
import TableView from '../Table/TableView';

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
  test('it renders table data', () => {
    // Arrange
    const props = {
      data: candidateData
    }
 
    const { getByText } = render(<TableView {...props} />)

    // Checking whether all the nodes of the data has been defined.
    for(let i=0;i<props.data.length;i++){
      // Assert
      const name = getByText(props.data[i].name)
      const email = getByText(props.data[i].email)
      const birth_date = getByText(props.data[i].birth_date)
      const position_applied = getByText(props.data[i].position_applied)
      const application_date = getByText(props.data[i].application_date)
      const status = getByText(props.data[i].status)

      // Act
      expect(name).toBeDefined()
      expect(email).toBeDefined()
      expect(birth_date).toBeDefined()
      expect(position_applied).toBeDefined()
      expect(application_date).toBeDefined()
      expect(status).toBeDefined()
    }
  })

  test('it renders table header', () => {
    // Arrange
    const props = {
      data: candidateData
    }
 
    const { getByText } = render(<TableView {...props} />)

    // Check whether header nodes has been render properly.
    const headerName = getByText('Name');
    expect(headerName).toBeDefined();

    const headerEmail = getByText('Email');
    expect(headerEmail).toBeDefined();

    const headerAge = getByText('Email');
    expect(headerAge).toBeDefined();
  })

  test('it changes table data on filter', () => {
    // Arrange
    const props = {
      data: candidateData
    }
 
    const { getByText, getByPlaceholderText,queryAllByText } = render(<TableView {...props} />)

    // Check whether header nodes has been render properly.
    const filterName = getByPlaceholderText('Name');
    fireEvent.change(filterName, { target: { value: 'Cyrstal Kunze' } })
    const names = queryAllByText('Colette Morar');
    expect(names).toHaveLength(0);
    fireEvent.change(filterName, { target: { value: '' } })

    const filterStatus = getByPlaceholderText('Status of the application');
    fireEvent.change(filterStatus, { target: { value: 'rejected' } })
    const status = queryAllByText('rejected');
    expect(status).toHaveLength(2);
    fireEvent.change(filterStatus, { target: { value: '' } })

    const filterPostion = getByPlaceholderText('Position applied');
    fireEvent.change(filterPostion, { target: { value: 'Designer' } })
    expect(getByText('Designer')).toBeInTheDocument()
    const positions = queryAllByText('Designer');
    expect(positions).toHaveLength(2);
  })
})
