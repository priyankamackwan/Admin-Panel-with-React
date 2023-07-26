import { PAGE_LIMIT, paginate } from "../../components/Home"
import { deleteUserRequest, getAllUsers, searchHanlder } from "../../Service/api"
import { LOADING, SUCCESS,ERROR, DELETE_USER, SEARCH_USER, PAGINATION} from "./AllUserConstant"

const initialState={
    loading:false,
    error:false,
    allUsers:[],
    paginatedData:[],
    searchData:[]
}

export const AllUserReducer=(store=initialState,{type,payload})=>{
    switch(type){
        case LOADING: return {...store,loading:true}
        case ERROR: return {...store,loading:false,error:true}
        case SUCCESS: return {...store,loading:false,error:false,allUsers:[...payload],paginatedData:[...paginate(payload,PAGE_LIMIT,1)]}
        case SEARCH_USER: return {...store,searchData:[...payload],paginatedData:[...paginate(payload,PAGE_LIMIT,1)]}
        case PAGINATION: return {...store,paginatedData:[...payload]}
        case DELETE_USER : return store
        default: return store
    }

}





