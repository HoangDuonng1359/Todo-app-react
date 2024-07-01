import { Button } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function Test() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log(data);
//   console.log(errors);
  
  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="hello" {...register("hello", {})} />
      <input type="text" placeholder="hduo" {...register("hduo" , {})} />
      <select {...register("kk")}>
        <option value="none ">none </option>
        <option value=" hello "> hello </option>
        <option value=" 1 "> 1 </option>
        <option value=" 2"> 2</option>
      </select>
      <button type="submit">submit</button>
    </form>
  );
}