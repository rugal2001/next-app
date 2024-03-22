import Header from './header'

const MainL = ({children})=>{
    return (
        <>
        <Header/>
        <div className="w-full">{children}</div>
        </>
        
    );
}

export default MainL