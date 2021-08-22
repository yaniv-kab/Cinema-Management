import react, { createContext, useState } from 'react';

// creating context
export const SubscriptionsContext = createContext()


// creating provider component
export const SubscriptionsContextProvider = (props) => {
    const [Subscriptions, setSubscriptions] = useState([])



    return (
        <SubscriptionsContext.Provider value={[Subscriptions, setSubscriptions]}>
            {props.children}
        </SubscriptionsContext.Provider>
    )
}
