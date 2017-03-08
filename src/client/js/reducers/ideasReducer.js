
export default function reducer(state={
    ideas: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_IDEAS": {
        return {...state, fetching: true}
      }
      case "FETCH_IDEAS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_IDEAS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          ideas: (action.payload.sort((a, b) => b.amountOfVotes - a.amountOfVotes)),
        }
      }
      case "ADD_IDEA_FULFILLED": {
        return {
          ...state,
          ideas: [...state.ideas, action.payload],
        }
      }
      case "UPDATE_IDEA_FULFILLED": {
        debugger
        const newIdeas = [...state.ideas]
        const ideaToUpdate = newIdeas.findIndex(idea => idea._id === action.payload._id)
        newIdeas[ideaToUpdate] = action.payload;
        newIdeas.sort((a, b) => b.amountOfVotes - a.amountOfVotes)

        return {
          ...state,
          ideas: newIdeas,
        }
      }
      case "DELETE_IDEA": {
        return {
          ...state,
          ideas: state.ideas.filter(idea => idea.id !== action.payload),
        }
      }
    }

    return state
}