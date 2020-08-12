import axios from '../axiosUrl';

export const signup = (param) => {
    return dispatch => {
        return axios.post(`signup/`, param,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then(res => {
            return res.data;
        }).catch(err => {
            console.log(err);
            return err.response;
        });
    }
}
