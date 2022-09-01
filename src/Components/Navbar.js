import React from 'react'
// eslint-disable-next-line no-unused-vars
import SearchBar from './Search'
import { NavLink } from 'react-router-dom'
export default function Navbar () {
  /* const { user } = useAuthState(auth)
  if (user) { */
  return (
        <nav className="nav">
            <a href="/" className="my-reads">
                Mid-Reads
            </a>
            {/* import search bar! */}
            {/* <SearchBar /> */}
            <ul>
                <li>
                    {/* NavLink helps user to navigate which bar is active */}
                    <NavLink
                      to="/home"
                    className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                      to="/mybooks"
                    className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        My Books
                    </NavLink>
                </li>
                <li>
                    <NavLink
                      to="/friends"
                    className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Friends
                    </NavLink>
                </li>
                <li>
                    <NavLink
                      to="/profile"
                    className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Profile
                    </NavLink>
                </li>
            </ul>
        </nav>
  )
}
