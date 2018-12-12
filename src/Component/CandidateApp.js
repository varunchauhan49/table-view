import React, {Component} from 'react';
import TableView from './Table/TableView';
import Loader from 'react-loader-spinner';
import { Row } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { fetchCandidateInfo } from "../Actions/candidateDetails";

import "./CandidateApp.css";

// Mapping redux state with porps.
const mapStateToProps = state => {
  return {
    candidateInfoData:state.candidateReducer.candidateInfoData,
    candidateInfoFetching:state.candidateReducer.candidateInfoFetching,
    candidateInfoFetched:state.candidateReducer.candidateInfoFetched,
    candidateInfoError:state.candidateReducer.candidateInfoError
  }
}

// To dispatch actions from container component CandidateApp 
const mapDispatchToProps = dispatch => {
  return {
    candidateInfoAction: bindActionCreators(fetchCandidateInfo, dispatch)
  }
}

class CandidateApp extends Component{
  constructor(props){
    super(props);
    this.state = {
      candidateList: props.candidateInfoData || [],
      loader: false,
      fetched: props.candidateInfoFetched,
      error:props.candidateInfoError || "",
      modal:false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.candidateInfoFetched !== prevState.fetched && nextProps.candidateInfoFetched === true) {
      return {
        modal: (nextProps.candidateInfoError !== prevState.error && nextProps.candidateInfoData.length === 0)?true:false,
        loader: false,
        error: nextProps.candidateInfoError || "",
        candidateList: nextProps.candidateInfoData || []
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  componentDidMount(){
    this.props.candidateInfoAction();
    this.setState({loader:true});
  }

  render(){
    const {loader, candidateList, error} = this.state;
    return(
      <div className="Candidate-app">
        <Row>
          <header className="Table-header">
            <i className="fa fa-user" aria-hidden="true"></i>
            <span className="Table-title">Applications</span>
          </header>
        </Row>
        {
          (loader)?
            <div className="Loader-div">
              <Loader 
                type="ThreeDots"
                color="#00BFFF"
                height="100"	
                width="100"
              />
            </div>: 
            (candidateList.length !== 0)?
            <TableView data={candidateList} />:
            <div>
              No data to render the table
            </div>
        }
        {
          <Modal isOpen={this.state.modal} contentClassName="bg-light">
            <ModalHeader >Error</ModalHeader>
            <ModalBody>
              {error}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={()=> this.setState({modal:false})}>Close</Button>
            </ModalFooter>
          </Modal>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CandidateApp);