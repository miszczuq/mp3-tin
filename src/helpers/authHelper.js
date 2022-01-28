import React from "react"

export function getCurrentUser()
{
    return JSON.parse(localStorage.getItem("user"))
}

export function isAuthenticated()
{
    const user=getCurrentUser()
    return !!user;
}

export function isAdmin()
{
    const user = getCurrentUser()
    return user && user.role === 'Admin';
}