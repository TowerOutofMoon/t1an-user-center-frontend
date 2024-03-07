import { ADMIN_ROLE } from '@/constants';

/**
 * 判断是否有权限访问该页面
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.userRole === ADMIN_ROLE,
  };
}
