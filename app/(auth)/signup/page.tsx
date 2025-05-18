import handleSignup from "./actions"
const signup = () => {
    return (
        <div className=" h-screen w-full flex justify-center items-center">
            <form action={handleSignup} className="flex flex-col gap-3 w-md ">
                <input type='text' name='name' placeholder="Enter name" />
                <input type='text' name='email' placeholder="Enter Email" />
                <input type='password' name='password' placeholder="Enter Password" />
                <button type='submit'>SignUp</button>
            </form>
        </div>
    )
}

export default signup;