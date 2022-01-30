export const GET_USER = "GET_USER";
export const SET_USER = "SET_USER";
export const SAVE_USER = "SAVE_USER";

export const DELETE_USER = "DELETE_USER";

export const deleteUser = (deleteUser) => ({
  type: DELETE_USER,
  deleteUser,
});

export const getUser = () => ({
  type: GET_USER,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const saveUser = (newUser) => ({
  type: SAVE_USER,
  newUser,
});

const inittialState = {
  user: undefined,
};

export default (state = inittialState, action) => {
  switch (action.type) {
    case SET_USER:
      const { user } = action;
      return { ...state, user };
    case SAVE_USER:
      const { newUser } = action;

      state.user = state.user.map((u) => {
        if (newUser.id === u.id) {
          return newUser;
        } else {
          return u;
        }
      });
      return { ...state, user: state.user };

    case DELETE_USER:
      const { deleteUser } = action;

      state.user = state.user.filter((u) => {
        if (deleteUser.id === u.id) {
          return false;
        } else {
          return true;
        }
      });
      return { ...state, user: state.user };
    default:
      return state;
  }
};
