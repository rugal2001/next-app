import Header from './header'

// interface Types {
//     setIsOpen:any;
//     children:any;

//   }

const MainL = ({children} )=>{
    return (
        <>
        <Header/>
        <div className="w-full">{children}</div>
        </>
        
    );
}

export default MainL