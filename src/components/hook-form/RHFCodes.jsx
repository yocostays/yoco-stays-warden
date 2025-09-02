import PropTypes from 'prop-types';
import { useRef } from 'react';
// @mui
import { Stack, TextField } from '@mui/material';
// hooks
import useEventListener from '@components/hooks/use-event-listener';

// ----------------------------------------------------------------------

RHFCodes.propTypes = {
  keyName: PropTypes.string,
  inputs: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.object,
  setValues: PropTypes.func,
};

export default function RHFCodes({ keyName = '', inputs = [], values, setValues, ...other }) {
  const codesRef = useRef(null);

  const handlePaste = (event) => {
    let data = event.clipboardData.getData('text');
    data = data.split('');
    inputs.forEach((input, index) => {
      // Set each input's value based on pasted data
      setValues((prevValues) => ({
        ...prevValues,
        [input]: data[index] || '',
      }));
    });
    event.preventDefault(); // Prevent default paste behavior
  };

  const handleChangeWithNextField = (event) => {
    const { value, name, maxLength } = event.target;
    const fieldIndex = Number(name.replace(keyName, '')); // Extract numeric index from field name

    // Update the state with the new value
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Only move focus if we are not in the last field
    if (value.length >= maxLength && fieldIndex < inputs.length) {
      // Focus on next input field
      const nextField = document.querySelector(`[name="${keyName}${fieldIndex + 1}"]`);
      if (nextField) {
        nextField.focus();
      }
    }
  };

  useEventListener('paste', handlePaste, codesRef);

  return (
    <Stack direction="row" spacing={2} justifyContent="center" ref={codesRef}>
      {inputs.map((inputName, index) => (
        <TextField
          key={inputName}
          name={`${keyName}${index + 1}`}  // Dynamic input names based on keyName and index
          value={values[inputName] || ''} // Set value from state
          onChange={handleChangeWithNextField} // Handle onChange for next field focus
          autoFocus={index === 0} // Auto-focus the first field
          placeholder="-"
          onFocus={(event) => event.currentTarget.select()} // Select text on focus
          InputProps={{
            sx: {
              width: { xs: 36, sm: 56 },
              height: { xs: 36, sm: 56 },
              '& input': { p: 0, textAlign: 'center' },
            },
          }}
          inputProps={{
            maxLength: 1, // Limit input to 1 character
          }}
          {...other}
        />
      ))}
    </Stack>
  );
}
