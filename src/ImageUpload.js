import React, { useRef, useState } from "react";
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
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Grid } from "@mui/material";

const ImageUpload = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [uploadedData, setUploadedData] = useState([]);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setOpenDialog(!!file);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleFormSubmit = () => {
    setOpenDialog(false);

    const newData = {
      id: Date.now(),
      img: URL.createObjectURL(selectedFile),
      label: textValue,
      description: textareaValue,
    };
    setUploadedData([...uploadedData, newData]);
    setSelectedFile(null);
    setTextValue("");
    setTextareaValue("");
    setOpenDialog(false);
  };

  const renderSelectedImage = () => {
    return (
      selectedFile && (
        <div>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected File"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        </div>
      )
    );
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleUploadClick}
          >
            Upload
          </Button>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
        </Toolbar>
      </AppBar>
      <Container maxWidth="100" sx={{ pt: 2 }}>
        <div>
          <Typography>Retrieved Data</Typography>

          <Grid container columns={{ xs: 4, md: 8 }} spacing={5}>
            {uploadedData.map((item) => (
              <Grid item xs={2} key={item.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.img}
                    alt="img"
                  />
                  <CardContent sx={{ height: "25px" }}>
                    <Typography variant="body1">{item.label}</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="description"
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Selected Image</DialogTitle>
        <DialogContent>
          {renderSelectedImage()}
          <TextField
            label="Label"
            fullWidth
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            margin="normal"
          />
          <TextareaAutosize
            placeholder="Description"
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
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
