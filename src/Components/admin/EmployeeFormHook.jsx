// EmployeeFormHook.js
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import TableUi from '../shared/TableUi';
import Input from '../shared/Input';
import { getData } from '../../firebase/firebaseSevice';
import { DevTool } from '@hookform/devtools';

const EmployeeFormHook = ({ handleForm, input }) => {
    const INITIAL_INPUT = {
        empId: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        dob: '',
        doj: '',
        country: '',
        state: '',
        city: '',
        address: '',
        department: ''
    };
    const [departments, setDepartments] = useState([]);
    const formMethods = useForm({ defaultValues: INITIAL_INPUT });
    const { register, control } = formMethods

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setDepartments(await getData('departments'));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target
        formMethods.setValue(name, value.trim());
    };

    const handleSubmit = (data) => {
        console.log('submitted', data)
        // const department = departments.find((e) => e.id === data.department);
        // handleForm({ ...data, department });
    };

    return (
        <TableUi title={'Add Employee'}>
            {/* <FormProvider {...formMethods}> */}
            <form onSubmit={formMethods.handleSubmit(handleSubmit)} className='text-gray-700' noValidate>
                <Input register={() => register('empId', { required: true })} name='empId' label='Emp ID' type="text" placeholder="Enter emp id" validate={(value) => value.trim().length > 0} error='Input cannot be empty' />
                {/* ... Other input fields ... */}
                <Input register={() => register('department', { required: true })}
                    name='department'
                    label='Department'
                    type="text"
                    placeholder="Enter department"
                    validate={(value) => value.trim().length > 0}
                    error='Input cannot be empty'
                />
                {/* {formMethods.errors.department && <p className="text-red-500">Input cannot be empty</p>} */}
                {/* ... Other form fields ... */}
                <button className='bg-primary text-white mt-3 px-5 py-1 rounded'>Submit</button>
            </form>
            <DevTool control={control} />
            {/* </FormProvider> */}
        </TableUi>
    );
};

export default EmployeeFormHook;
