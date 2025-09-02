import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';

CustomFileUpload.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  accept: PropTypes.string.isRequired,
};

export default function CustomFileUpload({ onFileSelect, accept }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (onFileSelect) {
      onFileSelect(file); 
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    if (onFileSelect) {
      onFileSelect(file); // Send the file data back to the parent
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <Box
      sx={{
        border: isDragOver ? '2px dashed #3f51b5' : '2px dashed #ccc',
        padding: 2,
        textAlign: 'center',
        borderRadius: 4,
        cursor: 'pointer',
        width: '100%',
        maxWidth: 400,
        margin: 'auto',
        backgroundColor: isDragOver ? '#f0f0f0' : 'transparent',
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        accept={accept}
        style={{ display: 'none' }}
        id="file-input"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="file-input">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 48, color: '#888' }} />
          <Typography variant="body1" color="textSecondary">
            {selectedFile ? selectedFile.name : 'Select or Drag & Drop File'}
          </Typography>
          <Button size="small" variant="outlined" color="primary" component="span">
            Choose File
          </Button>
        </Box>
      </label>
    </Box>
  );
}
