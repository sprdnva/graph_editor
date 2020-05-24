// import React from 'react';
// import { Button, Snackbar, Slide } from '@material-ui/core';
// import { useState } from 'react';

// const CustomSnackbar = (props) => {
//   const { vertical, horizontal, message, severity } = props;
//   const [open, setOpen] = useState(true);

//   // const SlideTransition = (props) => {
//   //   return <Slide {...props} direction="up" />;
//   // };

//   // const Alert = (props) => {
//   //   return <MuiAlert elevation={6} variant="filled" {...props} />;
//   // };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpen(false);
//   };

//   return (
//     <Snackbar
//       anchorOrigin={{ vertical, horizontal }}
//       key={`${vertical},${horizontal}`}
//       open={open}
//       // TransitionComponent={SlideTransition}
//       onClose={handleClose}
//     >
//       <Alert onClose={handleClose} severity={severity}>
//         {message}
//       </Alert>
//     </Snackbar>
//   );
// };

// export default CustomSnackbar;
