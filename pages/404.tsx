import Link from 'next/link'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';

const NotFound = () => {
    const router = useRouter();
    // useEffect(() => {
    //     setTimeout(() => {
    //         // Click back button
    //         //router.go(-1)
    //         router.push('/');
    //     }, 3000)
    // }, [])
    return (
        <div className="not-found">
            <Head>
                <title>MarxDB | Page Not Found</title>
            </Head>
            <h1>Oops...</h1>
            <h2>That page cannot be found.</h2>
            <p>Go back to the <Link href="/">Homepage</Link></p>
        </div>
    )
}

export default NotFound;
