
import { Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children, ...rest }) => {
  const { users } = useSelector(state => state.app)
  return (
    <Route {...rest}>{!users ? <Navigate to="/login" /> : children}</Route>
  )
}

export default PrivateRoute;
