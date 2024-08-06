import { FaPencilAlt,FaUndo,FaRedo,FaEraser } from "react-icons/fa";
import { FaFileArrowDown } from "react-icons/fa6";

import styles from './index.module.css'
import { useDispatch, useSelector } from "react-redux";
import { MENU_ITEMS } from "@/constants";
import { menuItemClick,actionItemClick } from "@/slice/menuSlice";

const Menu = () =>{
    const dispatch = useDispatch();
    const activeMenuItem = useSelector((state)=>state.menu.activeMenuItem)
    const handleMenuClick = (itemName) =>{
        dispatch(menuItemClick(itemName))
    }

    const handleActionItemClick = (itemName) =>{
        dispatch(actionItemClick(itemName))
    }

    return (
            <div className={styles.menuContainer} >
            <div className={`${styles.iconsWrapper} ${activeMenuItem === MENU_ITEMS.PENCIL ? styles.active : ''}`} onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)}>
            <FaPencilAlt className={styles.icon} />
            </div>
            <div className={`${styles.iconsWrapper} ${activeMenuItem === MENU_ITEMS.ERASER ? styles.active : ''}`} onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}>
            <FaEraser className={styles.icon} />
            </div>
            <div className={styles.iconsWrapper} onClick={()=>handleActionItemClick(MENU_ITEMS.UNDO)}>
                <FaUndo className={styles.icon} />
            </div>
            <div className={styles.iconsWrapper} onClick={()=>handleActionItemClick(MENU_ITEMS.REDO)}>
                <FaRedo className={styles.icon} />
            </div>
            <div className={styles.iconsWrapper} onClick={()=>handleActionItemClick(MENU_ITEMS.DOWNLOAD)}>
                <FaFileArrowDown className={styles.icon} />
            </div>
        </div>
    )
}

export default Menu;