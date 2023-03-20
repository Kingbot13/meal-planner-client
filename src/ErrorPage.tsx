import React from 'react';
import {useRouteError} from 'react-router-dom';

export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);

    return(
        <div id='error-page'>
            <h1>Oops!</h1>
            <p>An error occurred! We'll look into this right away!</p>
            <p>
                <i>{error.statusText || error.message }</i>
            </p>
        </div>
    )
}