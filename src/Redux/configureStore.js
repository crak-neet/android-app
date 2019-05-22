import { createStore, applyMiddleware, thunk } from './../Asset/Libraries/NpmList'
import auth from './Reducers'

export default function configureStore() {
  let store = createStore(auth, applyMiddleware(thunk))
  return store
}