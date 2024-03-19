import { Button } from "antd";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Login = ({ onLogin }:any) => {
    const handleLogin = () => {
        onLogin();
    };

    return (
        <div>
            <h1>Login Page</h1>
            <Button type="primary" onClick={handleLogin}>Login</Button>
        </div>
    );
};