import { BallTriangle } from 'react-loader-spinner'
;
const Loader=()=>{

    return(
        <div className='flex justify-center align-middle mt-40 my-20'>
        <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="blue"
        ariaLabel="ball-triangle-loading"
        wrapperStyle
        wrapperClass/>

      </div>
)
}
export default Loader;