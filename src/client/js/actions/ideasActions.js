import axios from "axios";

export function fetchIdeas() {
  return function(dispatch) {
    axios
      .get("/api/ideas")
      .then((response) => {
        dispatch({type: "FETCH_IDEAS_FULFILLED", payload: response.data})
      }).catch((err) => {
       dispatch({type: "FETCH_IDEAS_REJECTED", payload: err})
      })
  }
}

export function addIdea(data) {
  return function(dispatch) {
    axios
      .post("/api/ideas", data)
      .then((response) => {
        dispatch({type: "ADD_IDEA_FULFILLED", payload: response.data})
      }).catch((err) => {
        dispatch({type: "ADD_IDEA_REJECTED", payload: err})
      })
  }
}

export function updateIdea(data) {
  return function(dispatch, info) {
    console.log(data);
    axios
      .put("/api/ideas/"+data._id, data)
      .then((response) => {
        debugger
        dispatch({type: "UPDATE_IDEA_FULFILLED", payload: response.data})
      }).catch((err) => {
        dispatch({type: "UPDATE_IDEA_REJECTED", payload: err})
      })
  }
}