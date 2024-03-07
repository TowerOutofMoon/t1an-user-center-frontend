import { GithubOutlined, HomeOutlined, LikeOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = 2024;
  const defaultMessage = ' created by t1an';
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'community',
          title: (
            <>
              <HomeOutlined /> 交流社区{' '}
            </>
          ),
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> github{' '}
            </>
          ),
          href: 'https://github.com/TowerOutofMoon',
          blankTarget: true,
        },
        {
          key: 'service',
          title: (
            <>
              <LikeOutlined /> 给个好评{' '}
            </>
          ),
          href: 'https://docs.qq.com/doc/DS2l2ZlJ1eVJ6dElV',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
