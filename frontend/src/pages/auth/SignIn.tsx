import Authenticator from "@/components/auth/Authenticator.tsx";

const SignIn = () => {
    return (
        <div>
            <Authenticator register={false}/>
        </div>
    );
};

export default SignIn;
