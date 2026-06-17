import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
    IconButton,
    InputAdornment,
    TextField,
    type TextFieldProps,
} from '@mui/material';
import { useState } from 'react';

type PasswordTextFieldProps = Omit<TextFieldProps, 'type'>;

export default function PasswordTextField(props: PasswordTextFieldProps) {
    const [visible, setVisible] = useState(false);

    return (
        <TextField
            {...props}
            type={visible ? 'text' : 'password'}
            slotProps={{
                ...props.slotProps,
                input: {
                    ...props.slotProps?.input,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={visible ? 'Hide password' : 'Show password'}
                                edge="end"
                                onClick={() => setVisible((current) => !current)}
                                onMouseDown={(event) => event.preventDefault()}
                            >
                                {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
}
