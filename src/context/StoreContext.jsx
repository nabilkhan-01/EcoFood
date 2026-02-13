import { createContext, useCallback, useMemo, useState } from 'react';
import { food_list } from '../assets/assets';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    const [toasts, setToasts] = useState([]);

    const foodById = useMemo(() => {
        const map = new Map();
        for (const item of food_list) map.set(item._id, item);
        return map;
    }, []);

    const getItemName = useCallback(
        (itemId) => foodById.get(itemId)?.name || 'Item',
        [foodById]
    );

    const pushToast = useCallback((message, type = 'info') => {
        const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        const toast = { id, message, type };
        setToasts((prev) => [toast, ...prev].slice(0, 3));
        window.setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 2500);
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
        pushToast(`${getItemName(itemId)} added to cart`, 'success');
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            if (!prev[itemId] || prev[itemId] <= 1) {
                const { [itemId]: _, ...rest } = prev; 
                return rest;
            }
            return { ...prev, [itemId]: prev[itemId] - 1 };
        });
        pushToast(`${getItemName(itemId)} removed from cart`, 'info');
    };

    const deleteFromCart = (itemId) => {
        setCartItems((prev) => {
            if (!prev[itemId]) return prev;
            const { [itemId]: _, ...rest } = prev;
            return rest;
        });
        pushToast(`${getItemName(itemId)} removed from cart`, 'info');
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = food_list.find((product) => product._id === itemId);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[itemId];
                } else {
                    console.warn(`Item with ID ${itemId} not found in food_list.`);
                }
            }
        }
        return totalAmount;
    };

    // New: Clear the cart
    const clearCart = () => {
        setCartItems({});
        pushToast('Cart cleared', 'info');
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        getTotalCartAmount,
        clearCart,
        toasts,
        pushToast
    };

    return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};

export default StoreContextProvider;
