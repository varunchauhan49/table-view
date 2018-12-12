import Config from '../config.js';
var config = new Config();

export function fetchCandidateInfo() {
  return function(dispatch) {
    dispatch({type: "FETCH_CANDIDATE_INFO"});
    let url = config.apiURL + "/candidates";
    fetch(url)
      .then((resp) => (resp.json()))
      .then((response) => {
        if(response.error){
          throw 'Unable to fetch data from web services';
        }
        dispatch({type: "FETCH_CANDIDATE_INFO_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_CANDIDATE_INFO_REJECTED", payload: err})
      })
  }
}