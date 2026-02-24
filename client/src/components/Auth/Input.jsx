// npm installs
import Visibility    from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, Grid, InputAdornment, TextField } from "@mui/material";


/** ----------------------------------------------------------------------------------------
 * 
 * @param {string}   name               Name of text field.
 * @param {function} handleChange       Function that will set the new value.
 * @param {string}   label              Name of text Field as label.
 * @param {boolean}  autoFocus          Autofocus boolean.
 * @param {string}   type               Type of text field.
 * @param {boolean}  handleShowPassword determines if we should show password characters.
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