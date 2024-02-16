import React from 'react';
import { createStyleHook } from '../theme/styled';

const useSadFaceStyle = createStyleHook(() => {
  return {
    r: {
      height: '3rem'
    },
    a: {
      fill: '#f8de40'
    },
    b: {
      fill: '#e7c930'
    },
    c: {
      fill: '#864e20'
    },
    d: {
      fill: '#26a9e0'
    }
  };
});

export function ZSadFace() {
  const { classes } = useSadFaceStyle();

  return (
    <svg className={classes.r} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
      <rect className={classes.a} x='1' y='1' width='22' height='22' rx='7.656' />
      <path
        className={classes.b}
        d='M23,13.938a14.69,14.69,0,0,1-12.406,6.531c-5.542,0-6.563-1-9.142-2.529A7.66,7.66,0,0,0,8.656,23h6.688A7.656,7.656,0,0,0,23,15.344Z'
      />
      <path className={classes.c} d='M7.055,7.313A1.747,1.747,0,1,0,8.8,9.059,1.747,1.747,0,0,0,7.055,7.313Z' />
      <path className={classes.c} d='M16.958,7.313A1.747,1.747,0,1,0,18.7,9.059,1.747,1.747,0,0,0,16.958,7.313Z' />
      <path
        className={classes.d}
        d='M8.42,13.921A4.184,4.184,0,0,0,7.054,11.38a4.185,4.185,0,0,0-1.365,2.541c-.111,1.476.937,1.762,1.365,1.762S8.531,15.4,8.42,13.921Z'
      />
      <path
        className={classes.c}
        d='M14.512,13.366a5.943,5.943,0,0,0-5.024,0c-.592.369-.557-.694.753-.974A7.35,7.35,0,0,1,12,12.078a7.35,7.35,0,0,1,1.759.314C15.069,12.672,15.1,13.735,14.512,13.366Z'
      />
      <path
        className={classes.b}
        d='M13.074,14.269a2.542,2.542,0,0,0-2.148,0c-.253.158-.238-.3.322-.416A3.144,3.144,0,0,1,12,13.719a3.144,3.144,0,0,1,.752.134C13.312,13.973,13.327,14.427,13.074,14.269Z'
      />
    </svg>
  );
}
