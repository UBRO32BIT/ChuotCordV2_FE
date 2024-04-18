import React from "react";
import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material"
import { useSnackbar } from "notistack";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginWithCredentials } from "../../services/auth.service";
import { LoginData } from "../../shared/auth.interface";
import { User } from "../../shared/user.interface";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_USER } from "../../actions/user";
import { RootState } from "../../reducers/user";
import { REFRESH_TOKEN } from "../../actions/token";
import { useNavigate } from "react-router-dom";

const loginSchema = yup.object().shape({
    username: yup.string()
        .required("Username is required!"),
    password: yup.string()
        .required("Password is required!")
})

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user.user);
    const { enqueueSnackbar } = useSnackbar();
    const [errorResponse, setErrorResponse] = React.useState<string>("");
    const [uploading, setUploading] = React.useState(false);
    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors }
    } = useForm({
        resolver: yupResolver(loginSchema),
    })
    const onLoginSubmit = async (event: any) => {
        try {
            setUploading(true);
            const data : LoginData = {
                username: event.username,
                password: event.password,
            }
            const result = await LoginWithCredentials(data);
            const userData : User = {
                _id: result.user._id,
                username: result.user.username,
                email: result.user.email,
                phoneNumber: result.user.phone_number,
                profilePicture: result.user.profilePicture,
                isEmailVerified: result.user.is_email_verified,
            }
            dispatch({
                type: LOGIN_USER, 
                payload: userData
            })
            dispatch({
                type: REFRESH_TOKEN, 
                payload: {
                    token: result.tokens.accessToken.token,
                    expire: result.tokens.accessToken.exp,
                }
            })
            navigate('/chat');
        }
        catch (error: any) {
            if (error && error.message) {
                setErrorResponse(error.message);
            }
            else setErrorResponse(error);
        }
    }
    const paperStyle = { padding: 20, height: '55vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    React.useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <Grid sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://upload.wikimedia.org/wikipedia/commons/c/c1/Rat_agouti.jpg)',
            backgroundSize: 'cover',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            height: '100dvh'
        }}>
            <Paper elevation={10} style={paperStyle}>
                <Grid alignItems='center' justifyContent={'center'}>
                    {/* <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar> */}
                    <Typography variant="h2" gutterBottom>Login</Typography>
                    <Typography variant="body2" color={'red'}>{errorResponse}</Typography>
                </Grid>
                <form onSubmit={handleLoginSubmit(onLoginSubmit)}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="username"
                        label="Username"
                        autoComplete="email"
                        autoFocus
                        error={!!loginErrors.username}
                        helperText={loginErrors.username?.message}
                        {...registerLogin("username")}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={!!loginErrors.password}
                        helperText={loginErrors.password?.message}
                        {...registerLogin("password")}
                    />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                </form>
                <Typography >
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                </Typography>
                <Typography variant="body2"> Do you have an account?</Typography>
                <Link href="#" variant="body2">
                    Register now
                </Link>
            </Paper>
        </Grid>
    )
}