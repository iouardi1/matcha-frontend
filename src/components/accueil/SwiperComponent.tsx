import React, { useEffect, useRef, useState } from 'react'
import Swipeable from 'react-swipy'
import Swiper from './utils/Swiper' // Adjust the path as needed
import Card from './Card'
import Button from './Button'
import { IconHeartFilled, IconX } from '@tabler/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import {
    createNotification,
    getListOfMatches,
} from '@/redux/features/sideBarSlice'
import { getImage } from '@/utils/helpers/functions'
import { blockUser, swipeLeft, swipeRight } from '@/redux/features/swipeSlice'
import { useSocket } from '@/redux/context/SocketContext'

const SwiperComponent = () => {
    const [cards, setCards] = useState<any>([])
    const [centerX, setCenterX] = useState<any>()
    const [swipeDirection, setSwipeDirection] = useState<any>(null)
    const [hoverLike, setHoverLike] = useState(false)
    const [hoverDislike, setHoverDislike] = useState(false)
    const cardRef = useRef(null)
    const dispatch = useDispatch()
    const matches = useSelector((state: any) => state.sideBar.potentialMatch)
    const socket = useSocket()
    
    useEffect(() => {
        setCards([...matches])
    }, [matches, dispatch])

    const remove = () => {
        setCards(cards.slice(1))
    }
    const handleSwipe = (direction: any) => {
        if (direction === 'right') {
            
            dispatch(swipeRight(cards[0]))
            socket?.emit('send notif', {
                notifType: 'like',
                user: cards[0].email,
            })
            dispatch(
                createNotification({ notifType: 'like', user: cards[0].email })
            )
        } else if (direction === 'left') {
            dispatch(swipeLeft(cards[0]))
            socket?.emit('send notif', {
                notifType: 'dislike',
                user: cards[0].email,
            })
            dispatch(
                createNotification({
                    notifType: 'dislike',
                    user: cards[0].email,
                })
            )
        }
    }

    const handleBlock = () => {
        dispatch(blockUser(cards[0])) // Dispatch the block action
        remove() // Remove the blocked user from the list
    }

    const handlemouse = (e: any) => {
        setCenterX(e.clientX)
    }
    const handlemousemove = (e: any) => {
        if (centerX) {
            if (e.clientX > centerX && swipeDirection != 'right') {
                setSwipeDirection('right')
            } else if (e.clientX < centerX && swipeDirection != 'left') {
                setSwipeDirection('left')
            }
        }
    }
    const handlemouseup = () => {
        setCenterX(null)
        setSwipeDirection(null)
    }
    return (
        <div className="h-full relative flex justify-center items-center w-full overflow-hidden">
            <div className="relative w-[250px] h-[400px]">
                {cards.length > 0 && (
                    <div
                        ref={cardRef}
                        className="relative w-[250px] h-[400px]"
                        onMouseDown={handlemouse}
                        onMouseMove={handlemousemove}
                        onMouseUp={handlemouseup}
                    >
                        <Swipeable
                            onSwipe={handleSwipe}
                            onAfterSwipe={remove}
                            buttons={({ right, left }: any) => {
                                const swipeFunction = { right, left }
                                Swiper.initializeSwiper(swipeFunction)
                                return (
                                    <div className="flex justify-between mt-2">
                                        <Button
                                            name={'dislike'}
                                            className={`${
                                                swipeDirection === 'left'
                                                    ? 'bg-[#f59796]'
                                                    : ''
                                            } w-[50px] h-[50px] rounded-full bg-transparent border-[2px] border-[#f59796] hover:bg-[#f59796] flex items-center justify-center cursor-pointer`}
                                            onClick={Swiper.swipeLeft}
                                            callbacks={{
                                                setHoverDislike,
                                            }}
                                        >
                                            {swipeDirection === 'left' ? (
                                                <IconX color="white" />
                                            ) : (
                                                <IconX
                                                    color={
                                                        hoverDislike == true
                                                            ? 'white'
                                                            : '#f59796'
                                                    }
                                                />
                                            )}
                                        </Button>
                                        <Button
                                            name={'like'}
                                            className={`${
                                                swipeDirection === 'right'
                                                    ? 'bg-[#20dab5]'
                                                    : ''
                                            } w-[50px] h-[50px] rounded-full bg-transparent border-[2px] border-[#20dab5] hover:bg-[#20dab5] flex items-center justify-center cursor-pointer`}
                                            onClick={Swiper.swipeRight}
                                            callbacks={{
                                                setHoverLike,
                                            }}
                                        >
                                            {swipeDirection === 'right' ? (
                                                <IconHeartFilled color="white" />
                                            ) : (
                                                <IconHeartFilled
                                                    color={
                                                        hoverLike == true
                                                            ? 'white'
                                                            : '#20dab5'
                                                    }
                                                />
                                            )}
                                        </Button>
                                        <Button
                                            name={'block'}
                                            className="bg-red-600 text-white w-[50px] h-[50px] rounded-full flex items-center justify-center cursor-pointer"
                                            onClick={handleBlock}
                                        >
                                            Block
                                        </Button>
                                    </div>
                                )
                            }}
                        >
                            <Card>
                                <div
                                    className={`${
                                        swipeDirection == 'right'
                                            ? 'visible'
                                            : 'hidden'
                                    } bg-[#20dab5]  absolute left-[20px] top-[20px] z-10 w-[60px] h-[30px] text-center text-xl text-uppercase font-bold text-white rounded-[5px]`}
                                >
                                    like
                                </div>
                                <div
                                    className={`${
                                        swipeDirection == 'left'
                                            ? 'visible'
                                            : 'hidden'
                                    } bg-[#f59796] absolute right-[20px] top-[20px] z-10 w-[80px] h-[30px] text-center text-xl text-uppercase font-bold text-white rounded-[5px] `}
                                >
                                    dislike
                                </div>

                                <div className="w-full h-[20%] items-start text-white font-bold capitalize p-2 text-center z-10 flex flex-col-reverse bg-black bg-opacity-10">
                                    <div className="flex font-extrabold text-base ">
                                        <p>Famerate</p>
                                        <span>&nbsp;&nbsp;</span>
                                        <p>10</p>
                                    </div>
                                    <div className="flex font-extrabold text-2xl">
                                        <p className="">{cards[0].username}</p>
                                        <span>&nbsp;&nbsp;</span>
                                        <p>{cards[0].age}</p>{' '}
                                        {/* replace id with age */}
                                    </div>
                                </div>

                                <img
                                    onDragStart={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                    }}
                                    src={getImage(cards[0].profile_picture)}
                                    alt="userprofile"
                                    className="object-cover w-full h-full rounded-[15px] absolute"
                                />
                            </Card>
                        </Swipeable>

                        {cards.length > 1 && (
                            <Card zIndex={-1}>
                                <div className="w-full h-[20%] items-start text-white font-bold capitalize p-2 text-center z-10 flex flex-col-reverse bg-black bg-opacity-10">
                                    <div className="flex font-extrabold text-2xl">
                                        <p className="">{cards[1].username}</p>
                                        <span>&nbsp;&nbsp;</span>
                                        <p>{cards[1].age}</p>{' '}
                                        {/* replace id with age */}
                                    </div>
                                </div>
                                <img
                                    onDragStart={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                    }}
                                    src={getImage(cards[1].profile_picture)}
                                    alt="userprofile"
                                    className="object-cover w-full h-full rounded-[15px] absolute"
                                />
                            </Card>
                        )}
                    </div>
                )}
                {cards.length <= 1 && (
                    <Card zIndex={-2}>No more suggestions</Card>
                )}
            </div>
        </div>
    )
}

export default SwiperComponent
