import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';

// Components
import Todo from './Todo';

// DIALOG IMPORTS
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useTodos, useTodosDispatch } from '../contexts/TodosContext';
import { useToast } from '../contexts/ToastContext';
import { useState, useEffect, useMemo } from 'react';

export default function TodoList() {
  const todos = useTodos();
  const dispatch = useTodosDispatch();
  const { showHideToast } = useToast();

  const [dialog, setDialog] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [inputDetails, setInputDetails] = useState('');
  const [CompletedIncompletedTodo, setCompletedIncompletedTodo] = useState('all');

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const inCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToBeRendered = todos;

  if (CompletedIncompletedTodo == 'completed') {
    todosToBeRendered = completedTodos;
  } else if (CompletedIncompletedTodo == 'non-completed') {
    todosToBeRendered = inCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  useEffect(() => {
    dispatch({ type: 'reload' });
  }, []);

  function checkTodoStatus(e) {
    setCompletedIncompletedTodo(e.target.value);
  }

  function handleAddClick() {
    dispatch({ type: 'add', payload: { title: inputTitle, details: inputDetails } });
    setInputTitle('');
    setInputDetails('');
    showHideToast('تمت إضافة مهمة جديدة بنجاح');
  }

  function openDeleteDialog(todo) {
    setDialog(todo);
    setShowDeleteDialog(true);
  }

  function openUpdateDialog(todo) {
    setDialog(todo);
    setShowUpdateDialog(true);
  }

  function handleDeleteClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    dispatch({ type: 'delete', payload: dialog });
    setShowDeleteDialog(false);
    showHideToast('تم حذف المهمة بنجاح');
  }

  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  function handleUpdateConfirm() {
    dispatch({ type: 'update', payload: dialog });
    setShowUpdateDialog(false);
    showHideToast('تم تعديل المهمة بنجاح');
  }

  const renderedTodos = todosToBeRendered.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={openDeleteDialog}
        showUpdate={openUpdateDialog}
      />
    );
  });

  return (
    <>
      {/* UPDATE DIALOG */}
      <Dialog
        style={{ direction: 'rtl' }}
        onClose={handleUpdateClose}
        open={showUpdateDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle
          className='updateDialogTitle'
          id='alert-dialog-title'
          style={{ fontWeight: '700', fontSize: '18px' }}
        >
          تعديل مهمة
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='عنوان المهمة'
            fullWidth
            variant='standard'
            value={dialog?.title}
            onChange={(e) => {
              setDialog({
                ...dialog,
                title: e.target.value,
              });
            }}
          />

          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='تفاصيل المهمة'
            fullWidth
            variant='standard'
            value={dialog?.details}
            onChange={(e) => {
              setDialog({
                ...dialog,
                details: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>إلغاء</Button>
          <Button
            autoFocus
            onClick={handleUpdateConfirm}
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE DIALOG */}
      <Dialog
        style={{ direction: 'rtl' }}
        onClose={handleDeleteClose}
        open={showDeleteDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle
          className='deleteDialogTitle'
          id='alert-dialog-title'
          style={{ fontWeight: '600' }}
        >
          هل أنت متأكد من رغبتك في حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            className='deleteDialogContentText'
            id='alert-dialog-description'
            style={{ fontWeight: '500', fontSize: '14px' }}
          >
            سيتم حذف المهمة المحددة بشكل نهائي
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>إلغاء</Button>
          <Button onClick={handleDeleteConfirm}>نعم، قم بالحذف</Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth='sm'>
        <Card
          className='todoListCard'
          sx={{ minWidth: 275 }}
          style={{
            maxHeight: '80vh',
            maxWidth: '100%',
            overflowY: 'auto',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <CardContent>
            <Typography
              variant='h2'
              style={{ fontWeight: '800', textAlign: 'center' }}
            >
              مهامي
            </Typography>
            <Divider />

            {/* FILTER BUTTONS */}
            <ToggleButtonGroup
              style={{
                direction: 'ltr',
                marginTop: '30px',
                display: 'flex',
                justifyContent: 'center',
              }}
              value={CompletedIncompletedTodo}
              exclusive
              onChange={checkTodoStatus}
              aria-label='text alignment'
              color='primary'
            >
              <ToggleButton value='non-completed'>المهام غير المنجزة</ToggleButton>
              <ToggleButton value='completed'>المهام المنجزة</ToggleButton>
              <ToggleButton value='all'>الكل</ToggleButton>
            </ToggleButtonGroup>

            {renderedTodos}

            {/* INPUT + ADD BUTTON */}
            <Grid
              container
              style={{ marginTop: '20px' }}
              spacing={2}
            >
              <Grid
                xs={8}
                display='flex'
                justifyContent='space-around'
                alignItems='center'
              >
                <TextField
                  style={{ width: '100%' }}
                  id='outlined-basic'
                  label='عنوان المهمة'
                  variant='outlined'
                  value={inputTitle}
                  onChange={(e) => {
                    setInputTitle(e.target.value);
                  }}
                />
              </Grid>

              <Grid
                xs={8}
                display='flex'
                justifyContent='space-around'
                alignItems='center'
              >
                <TextField
                  style={{ width: '100%' }}
                  id='outlined-basic'
                  label='تفاصيل المهمة'
                  variant='outlined'
                  value={inputDetails}
                  onChange={(e) => {
                    setInputDetails(e.target.value);
                  }}
                />
              </Grid>

              <Grid
                xs={4}
                display='flex'
                justifyContent='space-around'
                alignItems='center'
              >
                <Button
                  style={{ width: '100%', height: '100%' }}
                  variant='contained'
                  onClick={() => {
                    handleAddClick();
                  }}
                  disabled={inputTitle.length === 0 || inputDetails.length === 0}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
