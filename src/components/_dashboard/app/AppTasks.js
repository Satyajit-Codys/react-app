import PropTypes from 'prop-types';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Card,
  Checkbox,
  CardHeader,
  Typography,
  FormControlLabel,
  Stack
} from '@mui/material';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

TaskItem.propTypes = {
  task: PropTypes.string,
  checked: PropTypes.bool,
  formik: PropTypes.object
};

function TaskItem({ task, checked, formik, ...other }) {
  const { getFieldProps } = formik;

  return (
    <Stack direction="row" justifyContent="space-between" sx={{ py: 0.75 }}>
      <FormControlLabel
        control={
          <Checkbox {...getFieldProps('checked')} value={task} checked={checked} {...other} />
        }
        label={
          <Typography
            variant="body2"
            sx={{
              ...(checked && {
                color: 'text.disabled',
                textDecoration: 'line-through'
              })
            }}
          >
            {task}
          </Typography>
        }
      />
    </Stack>
  );
}



export default function AppTasks() {
  const [todoValue, settodoValue] = useState("");
  const [tasks, setTasks] = useState([
    'Create FireStone Logo',
    'Add SCSS and JS files if required',
    'Stakeholder Meeting',
    'Scoping & Estimations',
    'Sprint Showcase'
  ]);

  function addTasks(){
    if(todoValue.length === 0) return
    const newTasks = [...tasks];
    newTasks.push(todoValue);
    setTasks(newTasks);
    settodoValue("");
  }
  
  function handleChange(event){
    settodoValue(event.target.value);
  }
  const formik = useFormik({
    initialValues: {
      checked: [tasks[2]]
    },
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const { values, handleSubmit } = formik;

  return (
    <>
    <Card>
      <CardHeader title="Tasks" />
      <Box sx={{ px: 3, py: 1 }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {tasks.map((task,id) => (
              <TaskItem
                key = {id}
                task={task}
                formik={formik}
                checked={values.checked.includes(task)}
              />
            ))}
          </Form>
        </FormikProvider>
      </Box>
    </Card>
    <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
          onChange = {handleChange}
          // onChange={() => console.log('helo')}
          value = {todoValue}
        />
    <Button variant="contained" onClick={addTasks}> Add tasks </Button>
    </div>
    </>
  );
}
