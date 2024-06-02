import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Paper } from "@mui/material"; 
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getFromAPI, postToAPI } from "../apiCall/ApiCall.js";
import Swal from "sweetalert2";

export default function Jobassign(props) {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [getLabel, setLabel] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const fieldsResponse = await getFromAPI(`/get_fields?data=${JSON.stringify(props.data)}`);
        setFields(fieldsResponse.fields);
        setLabel(fieldsResponse.taskname);
        const initialFormData = {};
        fieldsResponse.fields.forEach((field) => {
          initialFormData[field.id_name] = "";
        });
        setFormData(initialFormData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [props]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedFormData = { ...formData, ...props.data };
    const result = await postToAPI("/insert_task", updatedFormData);
    if (result.rval > 0) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: result.message,
      }).then(() => {
        // Refresh form data after successful submission
        setFormData({});
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.message,
      });
    }
  };

  const renderInputField = (field) => {
    switch (field.input_type) {
      case "text":
        return (
          <Grid key={field.id_name} item xs={12} sm={6} md={4}>
            <TextField
              name={field.id_name}
              label={field.input_fields}
              variant="outlined"
              value={formData[field.id_name] || ""}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
        );
      case "date":
        return (
          <Grid key={field.id_name} item xs={12} sm={6} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={field.input_fields}
                value={formData[field.id_name] || null}
                onChange={(date) => handleDateChange(date, field.id_name)}
                fullWidth
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                required
              />
            </LocalizationProvider>
          </Grid>
        );
      case "dropdown":
        const options = field.dp || [];
        return (
          <Grid key={field.id_name} item xs={12} sm={6} md={4}>
            <Autocomplete
              options={options}
              value={options.find((option) => option === formData[field.id_name]) || null}
              onChange={(event, value) => handleChange({ target: { name: field.id_name, value: value ? value : "" } })}
              getOptionLabel={(option) => option.emp_details || option.repeat} 
              renderInput={(params) => <TextField {...params} label={field.input_fields} variant="outlined" />}
            />
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <h5 style={{ textAlign: "left", padding: 4 }} className="mb-2 text-muted">
        {getLabel}
      </h5>
      <Paper elevation={3} style={{ padding: 20 }}>
        <form onSubmit={handleSubmit}>
          <br />
          <Grid container spacing={2}>
            {fields.map((field) => renderInputField(field))}
          </Grid>
          <br />
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </form>
      </Paper>
    </>
  );
}
