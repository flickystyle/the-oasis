import { useState } from 'react';
import { useLogin } from './useLogin';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical';
import SpinnerMini from '../../ui/SpinnerMini';

function LoginForm() {
    const [email, setEmail] = useState('dmitry@example.com');
    const [password, setPassword] = useState('pass1234');
    const { login, isPending } = useLogin();

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) return;
        login({ email, password });
    }
    console.log(isPending);
    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    autoComplete="username"
                    value={email}
                    disabled={isPending}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormRowVertical>
            <FormRowVertical label="Password">
                <Input
                    type="password"
                    id="password"
                    disabled={isPending}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button size="large" variation="primary" disabled={isPending}>
                    {!isPending ? 'Log in' : <SpinnerMini />}
                </Button>
            </FormRowVertical>
        </Form>
    );
}

export default LoginForm;
