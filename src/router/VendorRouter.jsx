import { Navigate } from 'react-router'
import useRole from '../hooks/useRole'
import LoadingSpinner from '../Component/Shared Comonent/LoadingSpinner/LoadingSpinner'


const VendorRouter = ({ children }) => {
  const [role, isRoleLoading] = useRole()

  if (isRoleLoading) return <LoadingSpinner />
  if (role === 'vendor') return children
  return <Navigate to='/' replace='true' />
}

export default VendorRouter
