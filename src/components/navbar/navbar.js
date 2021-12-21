import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import useStyles from './styles'
import forumIconImg from "../../images/krishi_forum_icon.jpg";
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

const Navbar = () => {
    const classes = useStyles()
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const logout = () => {
        dispatch({ type: 'LOGOUT'})
        history.push('/')

        setuser(null)
    }

    useEffect(() => {
        const token = user?.token

        if(token){
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

        setuser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
          <Typography
            component={Link}
            to="/"
            className={classes.heading}
            variant="h3"
            align="center"
          >
            ফোরাম
          </Typography>
          <img
            className={classes.image}
            src={forumIconImg}
            alt="forumIconImg"
            height="50"
          />
        </Link>
        <Toolbar className={classes.toolbar}>
          {user?.result ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user?.result.name}
                src={user?.result.imageUrl}
              >
                {user?.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user?.result?.name}
              </Typography>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={logout}
              >
                লগ আউট
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              প্রবেশ করুন
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
}

export default Navbar;