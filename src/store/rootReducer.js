import { combineReducers } from 'redux'
import { baiTapFormReducer } from './baiTapForm/slice'

export const rootReducer = combineReducers({

    baiTapForm: baiTapFormReducer,
})
