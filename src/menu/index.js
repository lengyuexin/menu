import React, { useState } from 'react';
import SecondMenu from './secondMenu'
import cls from 'classnames'
export default function (props) {


    const { list = [] } = props

    //控制高亮状态
    const [selectId, setSelectId] = useState('')







    return (

        <div className='menu-container'>

            <div onClick={() => { setSelectId("") }}
                style={{
                    position: "fixed",
                    width: "100%",
                    height: "1080px",
                    left: 0,
                    top: "60px",
                }}


            />

            <ul className='menu-content'>

                {
                    list.length > 0 && list.map(item => {

                        const { id, nodes, label, href } = item;

                        return (
                            <li

                                key={id}
                                className={cls('menu-item', {
                                    active: selectId === id
                                })}
                                onMouseOver={() => {

                                    setSelectId(id)
                                }}




                            >
                                <a className='menu-label' href={href} target='_black'>
                                    {label}
                                </a>

                                <SecondMenu
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