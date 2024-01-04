import RegisterForm from "@/app/(main)/users/register/components/RegisterForm"


const page = () => {
    return (
        <section className="container  h-[100%] w-[100%] flex items-start flex-col">
            <div className='text-center text-2xl font-bold mb-10 mt-4'>
                <h2>Register</h2>
            </div>
            <div className="w-[50%] h-[100%] ">
                <RegisterForm />
            </div>
        </section>
    )
}

export default page

