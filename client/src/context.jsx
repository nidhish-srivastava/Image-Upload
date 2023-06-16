import React,{ useContext,useState } from "react"

const BlogContext = React.createContext()

export  const useBlogContextHook = () =>{
    return useContext(BlogContext)
}

export const BlogContextProvider = ({children}) =>{



const final = {
}

    return(
        <BlogContext.Provider value={final}>
            {children}
        </BlogContext.Provider>
    )
}