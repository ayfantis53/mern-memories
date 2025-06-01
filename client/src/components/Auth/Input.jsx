// npm installs
import Visibility    from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, Grid, InputAdornment, TextField } from "@mui/material";


/** ----------------------------------------------------------------------------------------
 * 
 * @returns 
 * ----------------------------------------------------------------------------------------*/
export default function Input({ name, handleChange, label, autoFocus, type, handleShowPassword }) {

  return (
    <Grid>
        <TextField 
            name     = { name         } 
            onChange = { handleChange }
            variant  ='outlined'
            required
            fullWidth
            autoFocus = { autoFocus   }
            type      = { type        } 
            label     = { label       }  
            slotProps = { name==='password' ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={ handleShowPassword }>
                            { type === 'password' ? <Visibility /> : <VisibilityOff /> }
                        </IconButton>
                    </InputAdornment>
                )
            }: null }
        />
    </Grid>
  );
};