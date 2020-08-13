import React, { useState, useEffect, } from 'react';
import cls from 'classnames'
import ThirdMenu from './thirdMenu'



export default function (props) {

    const { list, open, } = props
    const [selectId, setSelectId] = useState('')
    const [height, setHeight] = useState(410)

    const computed = (list = []) => {
        /**
         * * 菜单子项<10,默认高度410
         * * 菜单子项>=10&&<=20，扩充余项，高度：410+rest*40+补充空间16px(padding)
         * * 菜单子项>20,出滚动条
         */

        let len = list.length;//二级菜单的列表长度
        let h = 0;//二级菜单的高度
        let condition = len / 10;//高度计算关键判断条件

        if (condition < 1) {
            h = 410;
        } else {

            if (condition <= 2) {
                h = 410 + (len - 10) * 40 + 16
            } else {
                h = 'auto'
            }
        }
        setHeight(h)
    }

    useEffect(() => {
        computed(list)
    }, [open, list])



    return (


        <div className='menu-second' style={{
            display: open ? 'block' : 'none',
            height: `${typeof (height) === 'number' ? height + 'px' : '410px'}`,

        }}>


            <span className='widget' />
            <ul className='menu-second-content'

                style={{
                    height: `${typeof (height) === 'number' ? height + 'px' : '410px'}`,
                    overflowY: `${typeof (height) === 'string' ? 'auto' : 'visible'}`,
                }}

            >

                {
                    list.length > 0 && list.map(item => {
                        const { id, nodes, label, href } = item;

                        return (

                            <li
                                key={id}
                                className={cls('second-item', {
                                    active: selectId === id
                                })}
                                onMouseOver={() => {

                                    window.timer = setTimeout(() => {
                                        setSelectId(id)
                                    }, 50)
                                }}

                                onMouseOut={() => {
                                    clearTimeout(window.timer)
                                }}
                            >
                                <a className='menu-second-label'
                                    href={href}
                                    target='_black'
                                >
                                    {label}
                                </a>
                                <ThirdMenu
                                    list={nodes}
                                    open={selectId === id && nodes.length > 0}
                                />
                            </li>

                        )


                    })
                }

            </ul>
        </div>

    )
}