

export const onLogin = (UserDetails) => (dispatch) => {

    dispatch({
        type: 'LOGIN_USER',
        payload: UserDetails
    });
}