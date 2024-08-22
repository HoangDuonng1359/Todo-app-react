import React, { useState } from 'react';
import { ContactsOutlined, HomeOutlined,  UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: (<a href='/'>Home</a>),
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label:(<a href='/qlsv'>Quản lý sinh viên</a>),
        key:'qlsv',
        icon:<ContactsOutlined />
    },
    {
        label:(<a href='/timekeeping'>Chấm công</a>),
        key:'timekeeping',
        icon:<ContactsOutlined />
    },
    {
        label: 'Admin',
        key: 'admin',
        icon: <UserOutlined />,
        children: [
            {
                type: 'group',
                label: 'Builder',
                children: [
                    {
                        label: (
                            <a href='/form-builder'>
                                Form Builder</a>)
                        , key: 'form-builder'
                    },
                    { label: 'Page Builder', key: 'page-builder' },
                ],
            },
        ],
    },
];

const NavigationBar: React.FC = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default NavigationBar;