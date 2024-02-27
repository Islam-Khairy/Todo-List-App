import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import { useTodosDispatch } from '../contexts/TodosContext';
import { useToast } from '../contexts/ToastContext';

export default function Todo({ todo, showDelete, showUpdate }) {
  const dispatch = useTodosDispatch();
  const { showHideToast } = useToast();

  function handleCheckClick() {
    dispatch({ type: 'check', payload: todo });
    showHideToast(todo.isCompleted ? 'مهمة غير مكتملة' : 'مهمة مكتملة');
  }

  function handleUpdateClick() {
    showUpdate(todo);
  }

  function handleDeleteClick() {
    showDelete(todo);
  }

  const isMediumScreen = useMediaQuery('(max-width:676px)');
  const isSmallScreen = useMediaQuery('(max-width:360px)');
  const isExtraSmallScreen = useMediaQuery('(max-width:320px)');

  const [isContentExceedingMaxHeight, setIsContentExceedingMaxHeight] = useState(false);

  useEffect(() => {
    const cardContent = document.querySelector('.todoCard .MuiCardContent-root');
    const cardMaxHeight = 110;

    if (cardContent && cardContent.clientHeight > cardMaxHeight) {
      setIsContentExceedingMaxHeight(true);
    } else {
      setIsContentExceedingMaxHeight(false);
    }
  }, [todo]);

  return (
    <Card
      className='todoCard'
      sx={{
        minWidth: 275,
        background: '#283593',
        color: 'white',
        marginTop: 5,
        position: 'relative',
        maxHeight: isContentExceedingMaxHeight ? '100px' : 'unset',
        overflowY: isContentExceedingMaxHeight ? 'auto' : 'unset',
        padding: '.01px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
      style={{
        paddingBottom: '.01in !important',
      }}
    >
      <CardContent className='cardContent'>
        <div>
          <Grid
            container
            spacing={2}
            justifyContent='spaceBetween'
            alignItems='center'
          >
            <Grid
              item
              xs={8}
            >
              <Typography
                className='todoTitle'
                Baseline
                variant='h5'
                sx={{
                  textAlign: 'right',
                  textDecoration: todo.isCompleted ? 'line-through' : 'none',
                }}
              >
                {todo.title}
              </Typography>

              <Typography
                className='todoDetails'
                Baseline
                variant='h6'
                sx={{
                  textAlign: 'right',
                  textDecoration: todo.isCompleted ? 'line-through' : 'none',
                  marginTop: '10px',
                }}
              >
                {todo.details}
              </Typography>
            </Grid>
          </Grid>
          {/* ACTION BUTTONS */}
          <div
            className='iconButtonsGroup'
            style={{
              position: 'sticky',
              bottom: 0,
              top: isExtraSmallScreen ? '' : '50%',
              transform: isExtraSmallScreen ? '' : 'translateY(-50%)',
              display: 'flex',
              flexDirection: isExtraSmallScreen ? 'column' : 'row',
              alignItems: isExtraSmallScreen ? 'end' : 'center',
              paddingLeft: isExtraSmallScreen ? '30px' : '0',
              justifyContent: isExtraSmallScreen ? 'start' : 'end',
              zIndex: 1,
              width: isMediumScreen ? '105%' : '100%',
            }}
          >
            <IconButton
              onClick={() => handleCheckClick()}
              className='iconButton'
              aria-label='check'
              style={{
                color: todo.isCompleted ? 'white' : '#8bc34a',
                background: todo.isCompleted ? '#8bc34a' : 'white',
                border: 'solid #8bc34a 3px',
                width: 'fit-content',
              }}
            >
              <CheckIcon fontSize={isMediumScreen ? 'small' : 'default'} />
            </IconButton>

            <IconButton
              className='editButton iconButton'
              onClick={handleUpdateClick}
              aria-label='edit'
              style={{
                color: '#1769aa',
                background: 'white',
                border: 'solid #1769aa 3px',
                margin: isSmallScreen ? '6px 0' : '0 6px',
                width: 'fit-content',
              }}
            >
              <ModeEditOutlineOutlinedIcon fontSize={isMediumScreen ? 'small' : 'default'} />
            </IconButton>

            <IconButton
              onClick={() => handleDeleteClick()}
              className='iconButton'
              aria-label='delete'
              style={{
                color: '#b23c17',
                background: 'white',
                border: 'solid #b23c17 3px',
                width: 'fit-content',
              }}
            >
              <DeleteOutlineOutlinedIcon fontSize={isMediumScreen ? 'small' : 'default'} />
            </IconButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
