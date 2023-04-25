import Link from 'next/link'

export default function About() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <h1 className='text-6xl font-bold text-center'>
                About
            </h1>
            <p className="text-xl text-center">
                Go back to home page{' '}
                <Link href="/" className='text-blue-600 hover:underline'>
                    here
                </Link>

            </p>
        </main>
    )
} 