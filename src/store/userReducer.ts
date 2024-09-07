import { createSlice } from '@reduxjs/toolkit'
import { DataType } from '../module/formAndTable/TableListScreen'
const items = JSON.parse(localStorage.getItem("userList") as string);

const initialState = {
    userList: items || [],
    userById: {}
}

const userReducer: any = createSlice({
    name: "userList",
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.userList = action.payload
        },
        getUserById: (state, action) => {
            state.userById = action.payload
        },
        addUser: (state, action) => {
            state.userList.push(action.payload as never)
            localStorage.setItem('userList', JSON.stringify(state.userList));
        },
        updateUser: (state, action) => { 
           const { 
            id, 
            title, 
            firstName, 
            lastName, 
            birthday, 
            national,
            gender,
            cityzenId,
            prefix,
            phone,
            passportNo,
            expectedSalary
            } = action.payload
            console.log('updateUser id', id)
            console.log('state.userList', state.userList)
           const uu = state.userList.find((user: DataType) => user.id === id)
           console.log('uu', uu)
           if(uu) {
            console.log('uu', uu)
                uu.title = title
                uu.firstName = firstName
                uu.lastName = lastName
                uu.birthday = birthday
                uu.national = national
                uu.gender = gender
                uu.cityzenId = cityzenId
                uu.prefix = prefix
                uu.phone = phone
                uu.passportNo = passportNo
                uu.expectedSalary = expectedSalary
                localStorage.removeItem("userList")
                localStorage.setItem('userList', JSON.stringify(state.userList));
           }
        },
        deleteUser:(state, action): any => {
            const { id } = action.payload
            const uu = state.userList?.find((user: DataType) => user?.id === id)
            if (uu) { 
               const newUserList = state.userList?.filter((f: DataType)=> f?.id !== id)
               localStorage.removeItem("userList")
               localStorage.setItem('userList', JSON.stringify(newUserList));
               return state.userList?.filter((f: DataType)=> f?.id !== id)
            }
        },
        deleteAllUser:(state, action): any => {
            const idUserArr = action.payload
            if( idUserArr?.length > 0) {
                const idUserArrFind = state.userList?.filter((item: DataType) => !idUserArr?.includes(item?.id))
                console.log('idUserArrFind', idUserArrFind)
                localStorage.removeItem("userList")
                localStorage.setItem('userList', JSON.stringify(idUserArrFind));
               return state.userList.filter((item: DataType) => !idUserArr?.includes(item?.id)) || []
            }
        
        }
        
    } 
})

export const { addUser, getUser, deleteUser, deleteAllUser, updateUser, getUserById } = userReducer.actions

export default userReducer.reducer