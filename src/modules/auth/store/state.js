import JwtService from '@/services/jwt.service'

export default {
  errors: null,
  user: {},
  isAdmin: false,
  isAuthenticated: !!JwtService.getAccessToken()
}
