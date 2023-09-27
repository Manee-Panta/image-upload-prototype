import React, {useRef, useState} from "react";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Button } from "@mui/material";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/material";

const ImageUpload = () => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile]= useState(null)
    const [openDialog, setOpenDialog] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [textareaValue, setTextareaValue] = useState("");
  
    const handleUploadClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
  
    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      setSelectedFile(file)
      file ? setOpenDialog(true):  setOpenDialog(false)
      console.log('Selected file:', file);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
      };
      const handleTextChange = (e) => {
        setTextValue(e.target.value);
      };
    
      const handleTextareaChange = (e) => {
        setTextareaValue(e.target.value);
      };
    
      const handleFormSubmit = () => {
        console.log('Selected File:',selectedFile)
        console.log("Text Value:", textValue);
        console.log("Textarea Value:", textareaValue);
        setOpenDialog(false);
      };

      const renderSelectedImage = () => {
        return (
          selectedFile && (
            <div>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected File"
                style={{ maxWidth: '100%', maxHeight: '400px' }}
              />
            </div>
          )
        );
      };

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Button variant="contained" color="secondary" onClick={handleUploadClick}>
            Upload
          </Button>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ pt: 2 }}>
        <Typography variant="body1">
          This is the main content area of the UploadComponent.
        </Typography>
       
      </Container>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Selected Image</DialogTitle>
        <DialogContent>
        {renderSelectedImage()}
          <TextField
            label="Label"
            fullWidth
            value={textValue}
            onChange={handleTextChange}
            margin="normal"
          />
          <TextareaAutosize
            placeholder="Description"
            value={textareaValue}
            onChange={handleTextareaChange}
            className="fullWidthTextarea"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageUpload;
