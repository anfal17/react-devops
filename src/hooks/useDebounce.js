
function useDebounce(cb, delay = 20){
    let timerid;

    return(...args)=>{
        clearTimeout(timerid)
        timerid = setTimeout(()=>{
            cb(...args)
        },delay)
    }
}

export default useDebounce