import { Button } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { form } from './Builder';
import {GenerateForm } from './genereate';
const FormJson = '{"title":"Form title","url":"/hello","widgets":[{"name":"text1","type":"text"},{"name":"text2","type":"select","options":"one;two"},{"name":"text3","type":"select","options":"one;two"},{"name":"text4","type":"text","placeholder":"test"},{"name":"text5","type":"text","placeholder":""},{"name":"text6","type":"select","options":"one","placeholder":""}]}'
const Form : form = JSON.parse(FormJson);
export default function Test() {
    return(
        <div>
            <GenerateForm title={Form.title} url={Form.url} widgets={Form.widgets}></GenerateForm>
        </div>
    )
}