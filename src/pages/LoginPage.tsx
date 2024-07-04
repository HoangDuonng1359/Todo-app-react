import { Button, Input } from "antd"
import { Helmet } from "react-helmet"

export const LoginPage = () => {
    return (
        <div >
            <Helmet>
                <title>login</title>
            </Helmet>
            <div>
                <Input placeholder="user name"></Input>
                <Input placeholder="password"></Input>
            </div>
            <div>
                <Button>Login</Button>
            </div>
        </div>
    )
}