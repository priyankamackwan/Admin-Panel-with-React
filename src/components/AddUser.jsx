import {
  AppBar,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Box } from "@mui/system";
import { createUserHandler } from "../Service/api";
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ? validation schema 
const validationSchema = yup.object({
  firstName: yup
    .string()
    .matches(/^[a-zA-Z]/, { message: "First Name must be a alphabates" })
    .required("First Name must be a alphabates"),
  lastName: yup
    .string()
    .matches(/^[a-zA-Z]/, { message: "Last Name must be a alphabates" })
    .required("Last Name must be a alphabates"),
  email: yup
    .string()
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {
      message: "Please enter a valid email address",
    })
    .required("Please enter a valid email address"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, { message: "Phone number must be 10 digit" })
    .required("Phone number must be 10 digit"),
  gender: yup.string().required("Gender is required"),
  profile_pic: yup
    .mixed()
    .test("required", "You need to provide a file", (file) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      console.log("recieved file", file);
      if (file["0"]?.name === undefined) {
        return false;
      }
      return true;
    }),
});

export default function AddUser() {
  const [imageInput, setImageInput] = useState({});
  const [isImageSelected, setIsImageSelected] = useState(true);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const handleFormSubmit = async(values) => {
                 try {
                  let form = new FormData();
                  form = { ...values, profile_pic: values.profile_pic[0] };
              
                  let user = await createUserHandler(form);
                  Swal.fire("User Added!", "Operation Successfull", "success");
                   reset()
                
                 } catch (error) {
                  Swal.fire("Error", "User with email is already registered!!", "error");
                  console.log(error)
                 }
  };
  console.log("react hook form errors", errors);


  console.log("selected images", imageInput);


  return (
    <>
      {/*  **nav bar */}
      <AppBar>
        <Toolbar sx={{ backgroundColor: "black" }}>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Typography sx={{ color: "white" }}>Go Back</Typography>
          </Link>
        </Toolbar>
      </AppBar>

      <Paper
        elevation={3}
        sx={{
          maxWidth: "500px",
          maxHeight: "650px",
          margin: "auto",
          marginTop: "100px",
          padding: "15px",
        }}
      >
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          encType="multipart/form-data"
        >
          <Controller
            control={control}
            name="firstName"
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="First Name"
                value={field.firstName}
                error={Boolean(errors?.firstName?.message)}
                helperText={errors?.firstName ? errors?.firstName?.message : ""}
                sx={{ marginBottom: "15px" }}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Last Name"
                value={field.lastName}
                error={Boolean(errors?.lastName?.message)}
                helperText={errors?.lastName ? errors?.lastName?.message : ""}
                sx={{ marginBottom: "15px" }}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                value={field.email}
                error={Boolean(errors?.email?.message)}
                helperText={errors?.email ? errors?.email?.message : ""}
                sx={{ marginBottom: "15px" }}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Phone"
                value={field.phone}
                error={Boolean(errors?.phone?.message)}
                helperText={errors?.phone ? errors?.phone?.message : ""}
                sx={{ marginBottom: "15px" }}
              />
            )}
          />

          <div>
            <input
              {...register("profile_pic")}
              type="file"
              name="profile_pic"
              accept="image/*"
              onChange={(e) => {
                setImageInput(e.target.files[0]);
              }}
              className="chooseFileInput"
            />
            {/* <span>{imageInput?.name ? imageInput?.name : "Choose Photo"}</span>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                  
                    <PhotoCamera />
                  </IconButton> */}
          </div>
          {errors.profile_pic && (
            <p className="errorText">{errors.profile_pic?.message}</p>
          )}
          <Controller
            name="gender"
            control={control}
            defaultValue={'other'}
            render={({ field }) => (
              <Box>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="gender"
                    value={field.gender}
                    {...field}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
                {errors.gender?.message && (
                  <p className="errorText">{errors?.gender?.message}</p>
                )}
              </Box>
            )}
          />

          <Button variant="contained" type="submit" sx={{ marginTop: "20px" }}>
            Add
          </Button>
        </form>
      </Paper>
    </>
  );
}
