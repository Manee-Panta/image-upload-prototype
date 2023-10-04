import React, { useRef, useState } from "react";
import { AppBar, Box } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Button } from "@mui/material";
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
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ImageUpload = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [uploadedData, setUploadedData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const drawerWidth = 450;

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
  const handleCardClick = (item) => {
    setSelectedCard(item);
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
      <AppBar position="sticky" color="default">
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
      <Box
        maxWidth={selectedCard ? `calc(100% - ${drawerWidth + 37}px)` : "100%"}
        sx={{p:2, height:'100%',}}
      >
        <Typography>Retrieved Data</Typography>
        <Grid
          container
          columns={selectedCard ? { xs: 4, md: 8 } : { xs: 8, md: 12 }}
          spacing={5}
        >
          {uploadedData.map((item) => (
            <Grid item xs={2} key={item.id}>
              <Card
                sx={{ maxWidth: 345,}}
                onClick={() => handleCardClick(item)}
              >
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

        <Drawer
        anchor="right"
        open={Boolean(selectedCard)}
        onClose={() => setSelectedCard(null)}
        sx={{
          width: drawerWidth,
          height:'100%',
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            height:'100%',
            mt:'70px'
          },
        }}
        variant="persistent"
      >
        <div>
          <IconButton
            onClick={() => setSelectedCard(null)}
            style={{ marginLeft: "auto" }}
          >
            <CloseIcon />
          </IconButton>
          <CardContent>
            {selectedCard && (
              <div>
                <img
                  src={selectedCard.img}
                  alt="img"
                  style={{
                    width: "100%",
                    height: "280px",
                    objectFit: "contain",
                  }}
                />
                <Typography
                  variant="subtitle1"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  {selectedCard.label}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ textAlign: "justify", display: "inline-block" }}
                >
                  {selectedCard.description}
                </Typography>
              </div>
            )}
          </CardContent>
        </div>
      </Drawer>
      </Box>
      
    </div>
  );
};

export default ImageUpload;
