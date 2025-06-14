import React from 'react'
import {
    RingLoader
} from "react-spinners";



const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};
export default function Loader() {
    return (
       <div className='flex justify-center items-center h-screen'>
         <RingLoader

            color={'green'}
            loading={true}

            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
       </div>
    )
}
