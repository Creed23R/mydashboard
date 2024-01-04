import CardInfo from '@/components/CardInfo';
import nextauth from '@/../public/nextauth.png'
import mysql from '@/../public/mysql.png'
import nextui from '@/../public/nextui.png'
import { title, subtitle } from "@/components/primitives";

export default function Home() {
	return (
		<section className=' flex flex-col items-center justify-center gap-4 py-16 md:py-10 w-[100%] md:bg-inherit'>
			<section className='inline-block max-w-lg text-center justify-center'>
				<h1 className={title()}>Make&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
				<br />
				<h1 className={title({ fullWidth: false })}>
					websites regardless of your design experience.
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Beautiful, fast and modern React UI library.
				</h2>
			</section>
			<section className='md:px-32 sm:px-16 py-5 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 w-[100%]'>
				<CardInfo image={nextauth} title='Authentication by NextAuth.js' description='The Credentials provider allows you to handle signing in with arbitrary credentials, such as a username and password' />
				<CardInfo image={mysql} title=' MySQL Database' description='Implementing MySQL database integration for seamless data management in your project.' />
				<CardInfo image={nextui} title='Components with NextUI' description='UI components built using NextUI and styled with Tailwind CSS.' />
				<CardInfo image={nextauth} title='Authentication by NextAuth.js' description='The Credentials provider allows you to handle signing in with arbitrary credentials, such as a username and password' />
				<CardInfo image={nextauth} title='Authentication by NextAuth.js' description='The Credentials provider allows you to handle signing in with arbitrary credentials, such as a username and password' />
				<CardInfo image={nextauth} title='Authentication by NextAuth.js' description='The Credentials provider allows you to handle signing in with arbitrary credentials, such as a username and password' />
			</section>
		</section>
	)
}
