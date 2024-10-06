const Shimmer=()=>{
    const block=()=>{
        return<>
        <div className="mt-5 border-solid border-black bg-black border-4 h-44 w-80 flex" />        
        <div className="mt-5 border-solid border-black bg-black border-4 h-44 w-80 flex" />        
        <div className="mt-5 border-solid border-black bg-black border-4 h-44 w-80 flex" />        
        <div className="mt-5 border-solid border-black bg-black border-4 h-44 w-80 flex" />        
        </>
    
    }
    return (
    <div className="flex justify-evenly mt-10 flex-wrap opacity-50">
    {block()}
    {block()}
    {block()}
    {block()}
    {block()}
    {block()}
    </div>
    );
};
export default Shimmer;