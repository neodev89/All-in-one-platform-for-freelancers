import { GlobalWrapper } from "@/ui/global-wrapper/global-wrapper";
import dynamic from "next/dynamic";

const LazyLoginComponent = dynamic(() => import("./login-component"), {
    ssr: true,
});

export default async function Login() {
    return (
        <GlobalWrapper 
            bodyWrapped={
                <LazyLoginComponent />
            }
        />
    )
}