import { MENU_ITEMS } from "@/constants";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { menuItemClick, actionItemClick } from "@/slice/menuSlice";

import { socket } from "@/socket";

const Board = () => {
    const canvasRef = useRef(null);
    const dispatch = useDispatch(); // for changing the actionmenuitem to null to use download button again and again
    const shouldDraw = useRef(false);
    const drawHistory = useRef([]);
    const historyPointer = useRef(0);
    const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
    const { color, size } = useSelector((state) => state.toolbox[activeMenuItem])

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
            const URL = canvas.toDataURL();
            const anchor = document.createElement('a') // anchor tag for download option
            anchor.href = URL
            anchor.download = 'sketch.jpg'
            anchor.click();
        } else if (actionMenuItem === MENU_ITEMS.UNDO || actionMenuItem === MENU_ITEMS.REDO) {
            if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) {
                historyPointer.current -= 1;
            }
            if (historyPointer.current < drawHistory.current.length - 1 && actionMenuItem === MENU_ITEMS.REDO) {
                historyPointer.current += 1;
            }
            const imageData = drawHistory.current[historyPointer.current]
            context.putImageData(imageData, 0, 0)

        }
        dispatch(actionItemClick(null)) // changes the actionmenuItem from "DOWNLOAD" to NULL, so that useEffect can rerender the component

    }, [actionMenuItem, dispatch])

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const changeConfig = (color, size) => {
            context.strokeStyle = color;
            context.lineWidth = size;
        }
        const handleChangeConfig = (config) => {
            changeConfig(config.color, config.size);
        }
        changeConfig(color, size)
        socket.on('changeConfig', handleChangeConfig)

        return () => {
            socket.off('changeConfig', handleChangeConfig)
        }
    }, [color, size])

    // while mounting
    useLayoutEffect(() => {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const beginPath = (x, y) => {
                context.beginPath();
                context.moveTo(x, y);
            }

            const drawLine = (x, y) => {
                context.lineTo(x, y);
                context.stroke();
            }

            const handleMouseDown = (e) => {
                shouldDraw.current = true;
                beginPath(e.clientX, e.clientY)
                socket.emit('beginPath', { x: e.clientX, y: e.clientY })

            }
            const handleMouseMove = (e) => {
                if (!shouldDraw.current) return;
                drawLine(e.clientX, e.clientY)
                socket.emit('drawLine', { x: e.clientX, y: e.clientY })

            }
            const handleMouseUp = (e) => {
                shouldDraw.current = false;
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
                drawHistory.current.push(imageData)
                historyPointer.current = drawHistory.current.length - 1;
            }
            const handleBeginPath = (path) => {
                beginPath(path.x, path.y)
            }
            const handleDrawLine = (path) => {
                drawLine(path.x, path.y)
            }

            canvas.addEventListener('mousedown', handleMouseDown);
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('mouseup', handleMouseUp);

            socket.on('beginPath', handleBeginPath)
            socket.on('drawLine', handleDrawLine)



            return () => {
                //cleanup functions
                canvas.removeEventListener('mousedown', handleMouseDown);
                canvas.removeEventListener('mousemove', handleMouseMove);
                canvas.removeEventListener('mouseup', handleMouseUp);

                socket.off('beginPath', handleBeginPath)
                socket.off('drawLine', handleDrawLine)

            }


        }, [])
        // console.log(color,size)

    return ( < canvas ref = { canvasRef } >
        <
        /canvas>
    )
}

export default Board;