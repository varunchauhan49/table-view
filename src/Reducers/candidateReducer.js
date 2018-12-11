export default function reducer(state={
  candidateInfoData: [],
  candidateInfoFetching: false,
  candidateInfoFetched: false,
  candidateInfoError: null,
}, action) {

  switch (action.type) {
    case "FETCH_CANDIDATE_INFO": {
      return {...state, candidateInfoFetching: true,candidateInfoFetched:false}
    }
    case "FETCH_CANDIDATE_INFO_REJECTED": {
      return {...state, 
        candidateInfoFetching: false,
        candidateInfoFetched: true,
        candidateInfoError: action.payload
      }
    }
    case "FETCH_CANDIDATE_INFO_FULFILLED": {
      return {
        ...state,
        candidateInfoFetching: false,
        candidateInfoFetched: true,
        candidateInfoData: action.payload,
      }
    }
    default:{
      return state
    }
  }
}