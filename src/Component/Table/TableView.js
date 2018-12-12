import React, {Component} from 'react';
import TableElement from './TableElement';
import propTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink,Row } from 'reactstrap';

import './TableView.css'

// Temp header data. When making this class modular this parameter can be passed to TableView Class
let headers = [
  { id: 'name', label:'Name', type: 'string', filter:true, sort:false},
  { id: 'email', label:'Email', type: 'string', filter:false, sort:false},
  { id: 'birth_date', label:'Age', type: 'string', filter:false, sort:false},
  { id: 'year_of_experience', label:'Years of experience', type: 'number', filter:false, sort:true},
  { id: 'position_applied', label:'Position applied', type: 'string', filter:true, sort:true},
  { id: 'application_date', label:'Date of application', type: 'date', filter:false, sort:true},
  { id: 'status', label:'Status of the application', type: 'string', filter:true, sort:false}
]


class TableView extends Component{
  constructor(props){
    super(props);
    this.state = {
      filter: {},
      data: props.data || [],
      sort: "",
      sortState:true,
      page:0,
      step:0
    }
    this.sortTableData = this.sortTableData.bind(this);
    this.updateTableData = this.updateTableData.bind(this);
    this.updateStepCount = this.updateStepCount.bind(this);
    this.textChange = this.textChange.bind(this);
  }

  // Function to send first x entries to Table Element module
  updateTableData(json,index){
    if(json.length === 0){
      return [];
    }
    let min = Math.min(index * 10 + 10,json.length);
    let indexedData = [];
    for(let i = index * 10; i< min;i++){
      indexedData.push(json[i]);
    } 
    return indexedData;
  }

  // Function to do sorting and it currently support data types string and date.
  sortByKey(array, key, order=true , type='string') {
    if(type === 'string'){
      return array.sort((a, b) => {
          let x = a[key]; var y = b[key];
          if(order===true){
            return ((x < y) ? -1 : ((x > y) ? 1 : 0)); 
          } else{
            return ((x > y) ? -1 : ((x < y) ? 1 : 1));
          }
      });
    }
    if(type === 'date'){
      return array.sort((a,b) => {
        if(order===true){
          return new Date(a[key]) - new Date(b[key]);
        } else{
          return new Date(b[key]) - new Date(a[key]);
        }
      });
    }
  }

  // Function to receive request for sorting data based on prop passed
  sortTableData(element){
    const {data,sort,sortState} = this.state;
    if(sort === element.id){
      let sortedData = this.sortByKey(data, element.id,!sortState,element.type);
      this.setState({
        data:sortedData,
        sortState:!sortState
      });
    } else{
      let sortedData = this.sortByKey(data, element.id,true,element.type);
      this.setState({
        data:sortedData,
        sort:element.id,
        sortState:true});
    }
  }

  // Function to update step count used by pagination
  updateStepCount(flag){
    const { data,step } = this.state;
    let pageCount = Math.ceil(data.length/10);
    let stepCount = Math.ceil(pageCount/5);

    if(flag){
      if(step < stepCount - 1){
        this.setState({
          step : step + 1
        })
      }
    } else{
      if(step > 0){
        this.setState({
          step : step - 1
        })
      }
    }
  }

  // Function to filter data based on user input on filters
  textChange(element, text){
    const {data} = this.props;
    let {filter} = this.state;
    filter[element] = text;
    let filterData = data.filter((item) => {
      let flag = true;
      [...Object.keys(filter)].forEach((key)=>{
        if(item[key].toLowerCase().indexOf(filter[key].toLowerCase())===-1 && filter[key] !== ""){
          flag = false;
        }
      });
      return flag
    });
    this.setState({filter:filter,
      data:filterData});
  }

  render(){
    const { data,sort,step,page,filter,sortState } = this.state;
    let pageCount = 0;
    let stepCount = 0;
    let pageElements = [];
    if(data.length > 0){
      pageCount = Math.ceil(data.length/10);
      stepCount = Math.ceil(pageCount/5);
      let pageStart = step * 5 + 1;
      let pageEnd = Math.min(step * 5 + 6,pageCount);
      if(pageCount<10){
        pageStart = 1;
        pageEnd= pageCount + 1;
      }
      for(let i = pageStart;i< pageEnd; i++){
        pageElements.push(
          <PaginationItem key={"page-" + i} active ={page === i - 1} onClick={()=> this.setState({page:i - 1})}>
            <PaginationLink>
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    }
  
    return(
      <div id="Table-view">
        <Row>
          <TableElement 
          sortData={this.sortTableData} 
          sortElement={sort} 
          asc={sortState}
          filter={filter}
          tableData={this.updateTableData(data || [],page)} 
          handleChange={(element, text) => this.textChange(element, text)}
          tableHeader={headers} />
        </Row>
        <Row>
          <Pagination aria-label="Page navigation example">
            <PaginationItem 
              className={(step === 0 )?'Disabled-Mouse':'No-focus'}
              disabled={step === 0}>
              <PaginationLink previous onClick={() => this.updateStepCount(false)} />
            </PaginationItem>
            {pageElements}
            <PaginationItem 
              className={(step===stepCount - 1)?'Disabled-Mouse':'No-focus'}
              disabled={step===stepCount - 1}>
              <PaginationLink next onClick={() => this.updateStepCount(true)} />
            </PaginationItem>
          </Pagination>
        </Row>
      </div>
    )
  }
}

TableView.propTypes = {
  data: propTypes.array
}

export default TableView;