import React, {Component} from 'react';
import propTypes from 'prop-types';
import { Table } from 'reactstrap';
import './TableElement.css';


class TableElement extends Component {
  constructor(props){
    super(props);
    this.state = {
      sortSelected: props.sortElement || "",
      filter:props.filter || {}
    }
  }

  // React life cycle method to capture change in nextProps and prevState, this helps in setting new state.
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.sortElement !== prevState.sortSelected) {
      return {
        sortSelected: nextProps.sortElement
      };
    }

    if(nextProps.filter !== prevState.filter){
      return{
        filter: nextProps.filter
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  render(){
    const { tableData,tableHeader, sortData, handleChange,asc } = this.props;
    const {filter,sortSelected} = this.state;
    return(
      <Table id="Custom-table" bordered striped>
        <thead>
          <tr>
            {
              tableHeader.map((ele, idx) => {
                if(ele.sort){
                  let sortClass = (sortSelected === ele.id)?(asc)?'fa fa-sort-asc marginL'
                    :'fa fa-sort-desc marginL':'fa fa-sort marginL';
                  return (
                    <th className="Sort-header" onClick={ () => sortData(ele) } key={"table-header-" + idx}>
                      <i className={sortClass} aria-hidden="true"></i>
                      {ele.label}
                    </th>
                  )
                } else{
                  return (
                    <th key={"table-header-" + idx}>
                      {ele.label}
                    </th>
                  )
                }
              })
            }
          </tr>
        </thead>
        <tbody>
          <tr>
          {
            tableHeader.map((ele, idx) => {
              if(ele.filter){
                return (
                  <td className="Sort-header" 
                    key={"table-data-filter-" + idx}>
                    <input type="text" 
                      className="Filter-input" 
                      placeholder={ele.label}
                      value={filter[ele.id] || ''} 
                      onChange={(event)=> handleChange(ele.id, event.target.value)} 
                      />
                  </td>
                )
              } else{
                return(<td key={"table-data-filter-" + idx}> </td>)
              }
            }) 
          }
          </tr>
          {
            tableData.map((item,i) => {
              return(
              <tr key={"Table-Row-" + i}>
                {
                  tableHeader.map((value,i) => {
                    return(
                    <td key={"Table-Element-" + i}>{item[value.id]}</td>
                    )
                  })
                }
              </tr>
              )
            })
          }
        </tbody>
      </Table>
    )
  }
}

TableElement.propTypes = {
  sortElement: propTypes.string,
  sortData: propTypes.func,
  asc: propTypes.bool,
  filter: propTypes.object,
  tableHeader: propTypes.array,
  tableData: propTypes.array,
  handleChange: propTypes.func
}

export default TableElement;