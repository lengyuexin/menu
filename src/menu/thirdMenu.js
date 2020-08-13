import React, { useEffect, useState } from 'react';

import cls from 'classnames'



export default function (props) {


    const { list, open, } = props
    const [selectId, setSelectId] = useState('')
    const [height, setHeight] = useState(410)
    const [width, setWeight] = useState(200)


    const computed = (list = []) => {

        /**  三级菜单项>10 参与计算
           * * len<=10 定宽定高显示 不进行计算
           * * len>10 开始计算
           *  *len/10>1 2列   高度不变 宽度*2
           *  *len/10>2 3列   高度不变 宽度*3
           *  *len/10>3 1列   出滚动条
           */



        let len = list.length;
        let condition = len / 10;
        let w = 0;
        let h = 0;


        if (len > 10) {

            if (condition > 1 && condition <= 2) {
                w = 200 * 2
            } else if (condition > 2 && condition <= 3) {
                w = 200 * 3
            } else if (condition > 3) {

                w = 200
                h = 'auto'
            }

        } else {

            w = 200
            h = 410
        }

        setWeight(w)
        setHeight(h)

    }


    useEffect(() => {
        computed(list)
    }, [open, list])

    return (

        <div className='menu-third'

            style={{
                display: open ? 'block' : 'none',
                top: `0`
            }}>

            <ul className='menu-third-content'
                style={{
                    width: `${width}px`,
                    height: `${typeof (height) === 'number' ? height + 'px' : '410px'}`,
                    overflowY: `${typeof (height) === 'string' ? 'auto' : 'visible'}`,
                }}

            >

                {
                    list.length > 0 && list.map(item => {
                        const { id, label, href } = item;

                        return (

                            <li
                                key={id}
                                className={cls('menu-third-item', {
                                    active: selectId === id
                                })}
                                onMouseOver={() => {
                                    setSelectId(id)
                                }}

                                onMouseOut={() => {
                                    setSelectId('')
                                }}

                            >
                                <a className='menu-third-label' href={href} target='_black'>
                                    {label}
                                </a>
                            </li>)
                    })

                }

            </ul>

        </div>

    )

}

