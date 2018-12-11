import React from 'react'
import {render, fireEvent, cleanup, waitForElement} from 'react-testing-library'
import TableView from '../Table/TableView';
import TableElement from '../Table/TableElement';

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

const headers = [
  { id: 'name', label:'Name', type: 'string', filter:true, sort:false},
  { id: 'email', label:'Email', type: 'string', filter:false, sort:false},
  { id: 'birth_date', label:'Age', type: 'string', filter:false, sort:false},
  { id: 'year_of_experience', label:'Years of experience', type: 'number', filter:false, sort:true},
  { id: 'position_applied', label:'Position applied', type: 'string', filter:true, sort:true},
  { id: 'application_date', label:'Date of application', type: 'date', filter:false, sort:true},
  { id: 'status', label:'Status of the application', type: 'string', filter:true, sort:false}
]

describe('Table Element', () => {
  test('it renders table data', () => {
    // Arrange
    const props = {
      asc: true,
      filter: {},
      handleChange: jest.fn(),
      sortData: jest.fn(),
      sortElement: "",
      tableData: candidateData,
      tableHeader: headers
    }
 
    const { getByText } = render(<TableElement {...props} />)

    // Checking whether all the nodes of the data has been defined.
    for(let i=0;i<props.tableData.length;i++){
      // Assert
      const name = getByText(props.tableData[i].name)
      const email = getByText(props.tableData[i].email)
      const birth_date = getByText(props.tableData[i].birth_date)
      const position_applied = getByText(props.tableData[i].position_applied)
      const application_date = getByText(props.tableData[i].application_date)
      const status = getByText(props.tableData[i].status)

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
      asc: true,
      filter: {},
      handleChange: jest.fn(),
      sortData: jest.fn(),
      sortElement: "",
      tableData: candidateData,
      tableHeader: headers
    }
 
    const { getByText } = render(<TableElement {...props} />)

    // Check whether header nodes has been render properly.
    const headerName = getByText('Name');
    expect(headerName).toBeDefined();

    const headerEmail = getByText('Email');
    expect(headerEmail).toBeDefined();

    const headerAge = getByText('Age');
    expect(headerAge).toBeDefined();
  })

  test('test sort feature', () => {
    // Arrange
    const mockChange = jest.fn();
    const mockSort = jest.fn()
    const props = {
      asc: true,
      filter: {},
      handleChange: mockChange,
      sortData: mockSort,
      sortElement: "",
      tableData: candidateData,
      tableHeader: headers
    }
 
    const { getByText } = render(<TableElement {...props} />);

    fireEvent.click(getByText('Position applied'))

    expect(mockSort).toHaveBeenCalledTimes(1)
  })

})
