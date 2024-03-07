// @ts-ignore
/* eslint-disable */

declare namespace API {
  type BaseResponse<T> = {
    code: number;
    data: T;
    message: string;
    description: string;
  };

  type CurrentUser = {
    id?: number /*用户编号*/;
    communityCode?: string /*社区编号*/;
    username?: string /*用户名*/;
    gender?: number /*性别*/;
    userAccount?: string /*用户账号*/;
    userPassword?: string /*密码*/;
    avatarUrl?: string /*用户头像*/;
    email?: string /*邮箱*/;
    phone?: string /*手机号码*/;
    userStatus?: number /*账号状态，0为正常*/;
    userRole?: number /*用户身份，0为普通用户*/;
    createTime?: Date /*创建时间*/;
  };

  type LoginResult = CurrentUser;

  type LoginState = {
    state?: string;
    msg?: string;
  };

  type RegisterResult = CurrentUser;

  type RegisterState = {
    state?: string;
    msg?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type RegisterParams = {
    userAccount?: string;
    communityCode?: string;
    userPassword?: string;
    checkPassword?: string;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
