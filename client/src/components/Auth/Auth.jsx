// npm installs
import { useState    }  from "react";
import { useDispatch }  from 'react-redux';
import { useNavigate }  from 'react-router';
import { Typography, Button, Grid } from "@mui/material";
import { GoogleLogin              } from '@react-oauth/google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// project imports
import * as Styled from './Auth.styles';
import Icon               from "./Icon";
import Input              from "./Input";
import { signIn, signUp } from '../../actions/auth';


/** ----------------------------------------------------------------------------------------
 * 
 * @returns a form of adding a memory post to the database
 * ----------------------------------------------------------------------------------------*/
export default function Auth() {
    
    const dispatch                        = useDispatch();
    const navigate                        = useNavigate();
    const [isSignup, setIsSignUp]         = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData]         = useState({ firstName:       '', 
                                                       lastName:        '', 
                                                       email:           '', 
                                                       password:        '', 
                                                       confirmPassword: '' });

    // Sign in button functionality.
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData);
        if (isSignup) { 
            dispatch(signUp(formData, navigate)); 
        }
        else { 
            dispatch(signIn(formData, navigate)); 
        }
    };

    // Inputs being entered in.
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : [e.target.value] });
    };

    // Show password input.
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Decides whether sign in or signup is displayed.
    const switchMode = () => {
        setIsSignUp(!isSignup);
        setShowPassword(false);
    };

    /** Google auth */
    // Success.
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token}});
            navigate('/');
        }
        catch(error) {
            console.log(error)
        }
    };
    // Failure.
    const googleFailure = (error) => {
        console.log("Google Sign in was unsuccessful");
        console.log(error);
    };

    return (
        <Styled.Root component="main" maxWidth="xs">
            <Styled.PostPaper elevation={6}>
                {/* PROFILE SYMBOL */}
                <Styled.LockIcon>
                    <LockOutlinedIcon />
                </Styled.LockIcon>
                {/* BUTTON TO SIGNIN OR SIGNUP */}
                <Typography variant='h5'> { isSignup? 'Sign Up' : 'Sign In' } </Typography>
                {/* FORM TO SIGNIN */}  
                <Styled.Form onSubmit={handleSubmit}>
                    <Grid spacing={2}>
                        {
                            isSignup && (
                                <Grid sx={{ display:'flex', flexDirection: 'row'}} spacing={2}>
                                    {/** FIRST-NAME INPUT */}
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus />
                                    {/** LAST-NAME INPUT */}
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} />
                                </Grid>
                            )
                        }
                        
                        {/** EMAIL INPUT */}
                        <Input name='email' label='Email Address' handleChange={handleChange} type="email" />
                        {/** PASSWORD INPUT */}
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                    </Grid>
                    {/** SUBMIT BUTTON */}
                    <Styled.SubmitBtn type='submit' fullWidth variant='contained' color='primary'>
                        { isSignup ? 'Sign Up' : 'Sign In' } 
                    </Styled.SubmitBtn>
                    {/** GOOGLE AUTH LOGIN BUTTON */}
                    <GoogleLogin 
                        onSuccess = {googleSuccess}
                        onFailure = {googleFailure}
                        render    = {(renderProps) => (
                            <Styled.GoogleBtn color='success' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant='contained'>
                                Google Sign In
                            </Styled.GoogleBtn>
                        )}
                        cookiePolicy='single_host_origin'
                    />
                    {/** SIGN IN OR SIGN UP LINK */}
                    <Grid container justify='flex-end'>
                        <Grid>
                            <Button onClick={switchMode} color='secondary'>
                                {isSignup ? 'Already Have an account? Sign In' : 'Dont have an account? Sign Up' }
                            </Button>
                        </Grid>
                    </Grid>
                </Styled.Form>  
                {/* FORM TO SIGNIN */}  
            </Styled.PostPaper>
        </Styled.Root>
    );
};