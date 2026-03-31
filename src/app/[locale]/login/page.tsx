import LoginComponent from "./login-component";
import { GlobalWrapper } from "@/ui/global-wrapper/global-wrapper";

export default async function Login() {
    return (
        <GlobalWrapper 
            bodyWrapped={
                <LoginComponent />
            }
        />
    )
}