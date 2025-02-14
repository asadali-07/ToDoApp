
function Navbar() {
  

    return (
      <>
      <nav className="flex bg-violet-600 justify-between  ">
        <h1 className="mx-3 p-3  text-white font-bold text-xl">iTASK</h1>
        <ul className="flex gap-5 mx-3 p-3 ">
          <li className=" text-white text-md hover:font-bold transition-all "><a href="#">Home</a></li>
          <li className=" text-white text-md hover:font-bold transition-all "><a href="#">Your Task</a></li>
        </ul>
      </nav>
      </>
    )
  }
  
  export default Navbar