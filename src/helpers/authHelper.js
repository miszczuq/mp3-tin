import React from "react"

export function getCurrentUser()
{
    return JSON.parse(localStorage.getItem("user"))
}

export function isAuthenticated()
{
    console.log("isAuthenticated")
    const user=getCurrentUser()
    return !!user;
}

export function isAdmin()
{
    const user=getCurrentUser()
    if(user && user.isAdmin===true)
    {
        console.log(user.isAdmin)
        return true;
    }
    return false
}