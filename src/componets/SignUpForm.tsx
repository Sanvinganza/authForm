import { FC } from 'react';
import { Button, Container } from '@material-ui/core';
import { useCookies } from 'react-cookie';
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    }
});

export interface IAuthData {
    clientId?: number;
    email?: string;
    password?: string;
};

const SignupSchema = Yup.object().shape({
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
});

export const SignupForm: FC<IAuthData> = (props) => {
    const classes = useStyles();
    const [, setCookie] = useCookies(['data']);

    const POST = async (values: IAuthData) => {
        console.log('post')
        try {
            const response = await fetch('https://tager.dev.ozitag.com/api/auth/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then(resp => resp.json());
            setCookie('data', response.data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Container maxWidth="sm">
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={POST}>
                {({ errors, touched }) => (
                    <Container className={classes.form}>
                        <Form>
                            <Field
                                label='Email'
                                component={TextField}
                                id="email"
                                name="email"
                                type="email" />
                        </Form>
                        <Form>
                            <Field
                                label='password'
                                component={TextField}
                                id="password"
                                name="password"
                                type="password"/>
                        </Form>
                        <Button size='small' color="primary" type="submit">Submit</Button>
                    </Container>
                )}
            </Formik>
        </Container>
    );
};