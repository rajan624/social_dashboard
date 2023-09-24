
import React from "react";
import { Autocomplete, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,  TextField, createFilterOptions } from "@mui/material";
import classes from "./AddBlogForm.module.css";
import { Button } from "bootstrap";
const filter = createFilterOptions();
const AddBlogForm = ({ register, errors, setFileUrl, value  , setValues ,  setImage, url, image }) => {
   const [open, toggleOpen] = React.useState(false);
   const handleClose = () => {
     setDialogValue({
       title: "",
       year: "",
     });
     toggleOpen(false);
   };

   const [dialogValue, setDialogValue] = React.useState({
     title: "",
     year: "",
   });

   const handleSubmit = (event) => {
     event.preventDefault();
     setValues({
       title: dialogValue.title,
       year: parseInt(dialogValue.year, 10),
     });
     handleClose();
   };
  const handleFileChange = (e) => {
     
  const file = e.target.files[0];
  const imageUrl = URL.createObjectURL(file);
    setFileUrl(file);
    setImage(imageUrl);
  }
  

  return (
    <>
      <Box
        sx={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        <h2 className={"Heading2"}>
          Add Blog<span>Share Your thoughts</span>
        </h2>
        <label htmlFor="thumbnail-image" className={classes.container}>
          {url || image ? (
            <img alt="" className={classes.imageAddBlogForm} src={image}></img>
          ) : (
            <label className={classes.card}>
              <div className={classes.drop_box}>
                <header>
                  <h4>Upload Thumbnail</h4>
                </header>
                <p>Files Supported: img , jpeg</p>
                <button
                  type="button"
                  className={"Black-button"}
                  onClick={() => {
                    const fileInput =
                      document.getElementById("thumbnail-image");
                    fileInput.click();
                  }}
                >
                  Choose Image
                </button>
              </div>
            </label>
          )}
          <input
            accept="image/*"
            type="file"
            onChange={(e) => {
              console.log(e.target.files[0]);
              handleFileChange(e);
            }}
            id="thumbnail-image"
            style={{ display: "none" }}
          />
        </label>
        <Box className={classes.formBox}>
          <TextField
            variant="filled"
            multiline
            id="filled-textarea"
            label="Heading"
            className={classes.inputField}
            {...register("name", { required: "Heading is required" })}
            error={Boolean(errors.name)}
            helperText={errors.name && errors.name.message}
          />
          <Autocomplete
            multiple
            className={classes.inputField}
            id="tags-outlined"
            size="medium"
            options={top100Films}
            defaultValue={[top100Films[13]]}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                placeholder=""
              />
            )}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                // timeout to avoid instant validation of the dialog's form.
                setTimeout(() => {
                  toggleOpen(true);
                  setDialogValue({
                    title: newValue,
                    year: "",
                  });
                });
              } else if (newValue && newValue.inputValue) {
                toggleOpen(true);
                setDialogValue({
                  title: newValue.inputValue
                });
              } else {
                setValues(newValue);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              if (params.inputValue !== "") {
                filtered.push({
                  inputValue: params.inputValue,
                  title: `Add "${params.inputValue}"`,
                });
              }

              return filtered;
            }}
            getOptionLabel={(option) => {
              // e.g value selected with enter, right from the input
              if (typeof option === "string") {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.title;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            freeSolo
          />
          <TextField
            variant="filled"
            multiline
            id="filled-textarea"
            label="Description"
            className={classes.inputField}
            {...register("description", {
              required: "Description is required",
            })}
            error={Boolean(errors.description)}
            helperText={errors.description && errors.description.message}
          />
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={handleSubmit}>
            <DialogTitle>Add a new film</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Did you miss any film in our list? Please, add it!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={dialogValue.title}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    title: event.target.value,
                  })
                }
                label="title"
                type="text"
                variant="standard"
              />
              <TextField
                margin="dense"
                id="name"
                value={dialogValue.year}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    year: event.target.value,
                  })
                }
                label="year"
                type="number"
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add</Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </>
  );
};
const top100Films = [
  { title: "Technology" },
  { title: "Travel" },
  { title: "Food" },
  { title: "Health" },
  { title: "Fashion" },
  { title: "Sports" },
  { title: "Music" },
  { title: "Art" },
  { title: "Books" },
  { title: "Movies" },
  { title: "Fitness" },
  { title: "Photography" },
  { title: "Nature" },
  { title: "Science" },
  { title: "Business" },
  { title: "Finance" },
  { title: "Education" },
  { title: "Cooking" },
  { title: "Gardening" },
  { title: "DIY" },
  { title: "Parenting" },
  { title: "Pets" },
  { title: "Self-improvement" },
  { title: "Motivation" },
  { title: "Design" },
  { title: "Technology trends" },
  { title: "Cryptocurrency" },
  { title: "Productivity" },
  { title: "Career" },
  { title: "Startups" },
  { title: "Entrepreneurship" },
  { title: "Marketing" },
  { title: "Social media" },
  { title: "Travel tips" },
  { title: "Adventure" },
  { title: "Culture" },
  { title: "Food recipes" },
  { title: "Restaurant reviews" },
  { title: "Healthy living" },
  { title: "Mental health" },
  { title: "Fashion trends" },
  { title: "Beauty tips" },
  { title: "Sports news" },
  { title: "Fitness workouts" },
  { title: "Musical instruments" },
  { title: "Music festivals" },
  { title: "Art techniques" },
  { title: "Book reviews" },
  { title: "Movie reviews" },
  { title: "Literature" },
  { title: "Science fiction" },
  { title: "Economics" },
  { title: "Investing" },
  { title: "Personal finance" },
  { title: "Online learning" },
  { title: "Study tips" },
  { title: "Recipe ideas" },
  { title: "Gardening tips" },
  { title: "Home improvement" },
  { title: "Parenting advice" },
  { title: "Pet care" },
  { title: "Life hacks" },
  { title: "Goal setting" },
  { title: "Leadership" },
  { title: "Web design" },
  { title: "Software development" },
  { title: "Mobile apps" },
  { title: "Data science" },
  { title: "AI and machine learning" },
  { title: "Blockchain" },
  { title: "Digital marketing" },
  { title: "Influencer marketing" },
  { title: "Social media strategy" },
  { title: "Travel destinations" },
  { title: "Adventure travel" },
  { title: "Cultural experiences" },
  { title: "Healthy recipes" },
  { title: "Vegan cooking" },
  { title: "Fitness tips" },
  { title: "Yoga and meditation" },
  { title: "Musical genres" },
  { title: "Concert reviews" },
  { title: "Painting techniques" },
  { title: "Classic literature" },
  { title: "Thriller movies" },
  { title: "Environmental science" },
  { title: "Sustainable living" },
  { title: "Business strategies" },
  { title: "Startup funding" },
  { title: "Digital entrepreneurship" },
  { title: "Content marketing" },
  { title: "Travel photography" },
  { title: "Outdoor adventures" },
  { title: "Art exhibitions" },
  { title: "Historical books" },
  { title: "Documentary films" },
];

export default AddBlogForm;