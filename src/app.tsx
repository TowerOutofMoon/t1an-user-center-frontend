import { AvatarDropdown, AvatarName, Footer, Question } from '@/components';
import { DEFAULT_USERNAME, LOGIN_PATH, NOT_REQUIRE_LOGIN_WHITE_LIST } from '@/constants';
import { interceptorConfig } from '@/interceptorConfig';
import { getCurrentUser as queryCurrentUser } from '@/services/ant-design-pro/api';
import { LinkOutlined, UserOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import { Link, RunTimeLayoutConfig, history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';

const isDev = process.env.NODE_ENV === 'development';

alert(process.env.NODE_ENV);

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  // 定义了一个fetch方法
  const fetchUserInfo = async () => {
    try {
      const { data: currentUser } = await queryCurrentUser({
        skipErrorHandler: true,
      });
      console.log('currentUser', currentUser);
      return currentUser;
    } catch (error) {
      history.push(LOGIN_PATH);
      console.log(error);
    }
    return undefined;
  };
  // 如果不是登录页面，返回当前用户信息
  const { location } = history;
  if (!NOT_REQUIRE_LOGIN_WHITE_LIST.includes(location.pathname)) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  // 否则不返回当前用户信息
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    actionsRender: () => [<Question key="doc" />],
    avatarProps: {
      src: initialState?.currentUser?.avatarUrl || <UserOutlined />,
      title: <AvatarName />,
      style: { backgroundColor: '#87d068' },
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.username || DEFAULT_USERNAME,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      if (NOT_REQUIRE_LOGIN_WHITE_LIST.includes(location.pathname)) return;
      // 如果没有登陆，重定向到 login
      if (!initialState?.currentUser) {
        history.push(LOGIN_PATH);
      }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
  ...interceptorConfig,
  baseURL: isDev ? '/api' : 'http://47.115.223.58:8080',
  timeout: 10000,
};
