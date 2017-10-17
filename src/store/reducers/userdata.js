const UserData = (state = null  , action) => {
    switch (action.type) {
        case 'UserDetails' : 
            return state = action.data ;
        default: 
        return state
    }
}
export default UserData;
