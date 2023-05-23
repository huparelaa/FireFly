import  axiosInstance from '../../apiConnection.js'

class UserApi {

    saveGames(data){
        return axiosInstance.post("/api/games_selected/", data, { headers: { 
                'Authorization': `JWT ${localStorage.getItem('access')}`
                }
        })
    }
    validateGameInDB(data) {
        return axiosInstance.get("/api/findGame/", data)
    }
    saveGame(data){
        return axiosInstance.get("api/saveGame/", data)
    }
}

export default new UserApi();