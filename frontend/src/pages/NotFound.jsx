import React from 'react'
import Image from "../assets/images/page_not_found.png"

const NotFound = () => {
    return (
        <div className="error">
            <img src={Image} alt="404" className='w-1/2' />
            <div>Halaman Tidak Ditemukan</div>
        </div>
    )
}

export default NotFound
