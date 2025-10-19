// npm installs
import Visibility    from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, Grid, InputAdornment, TextField } from "@mui/material";


/** ----------------------------------------------------------------------------------------
 * 
 * @param {*} name               Name of text field.
 * @param {*} handleChange       Function that will set the new value.
 * @param {*} label              Name of text Field as label.
 * @param {*} autoFocus          Autofocus boolean.
 * @param {*} type               Type of text field.
 * @param {*} handleShowPassword Boolean that shows password characters.
 * @returns Custom text field components for text input on form
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