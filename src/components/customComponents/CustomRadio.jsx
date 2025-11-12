import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box } from '@mui/material';

export default function RadioButton({
    disabled = false,
    label,
    data = [],
    onChange,
    register,
    name,
    error,
    value,
    checked,
    ...rest
}) {

    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
            <RadioGroup
                row
                value={value}
                checked={checked}
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={onChange}
                register={register?.(name)}
                {...rest}
            >
                {data?.length > 0 && data.map((item) => {
                    return (
                        <FormControlLabel
                            value={item?.value}
                            disabled={disabled}
                            control={<Radio />}
                            label={item?.label}
                        />
                    )
                })}

            </RadioGroup>
            {error && <Box sx={{
                fontSize: "12px",
                color: "red",
                margintTop: "7px",
                paddingTop: "5px"
            }} >{error}</Box>}
        </FormControl>
    );
}
