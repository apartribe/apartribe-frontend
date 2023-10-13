import { applyMiddleware, createStore } from 'redux'
import { rootReducer } from './rootReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from 'redux-logger'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger)),
)

export { store }

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
