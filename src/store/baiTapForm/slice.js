import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productList: [],
    productEdit: undefined,
    productSearch: undefined
}

const baiTapFormSlice = createSlice({
    name: 'baiTapForm',
    initialState,
    reducers: {
        addProduct: (state, { payload }) => {
            state.productList.push(payload)
        },
        deleteProduct: (state, { payload }) => {
            state.productList = state.productList.filter((prd) => prd.id !== payload)
        },
        editProduct: (state, { payload }) => {
            state.productEdit = payload
        },
        updateProduct: (state, { payload }) => {
            state.productList = state.productList.map((prd) => {
                if (prd.id === payload.id) {
                    return payload
                }
                return prd
            })

            state.productEdit = undefined
        },
        searchProduct: (state,{payload}) => {
            state.productSearch = state.productList.filter((prd)=>prd.name.toLowerCase().includes(payload.toLowerCase()))
        }
    },
    extraReducers: () => {},
})

export const { reducer: baiTapFormReducer, actions: baiTapFormActions } = baiTapFormSlice
