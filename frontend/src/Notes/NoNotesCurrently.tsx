import {Link} from 'react-router-dom'

import Logo from "../Resources/aikos-logo.png";

// interface NoNotesCurrentlyProps {
// }

const NoNotesCurrently = () => {
  return (
    <div className="flex items-center justify-center p-2 flex-col">
      <div className="w-5/12 h-5/12">
        <img src={Logo} alt="Logo" />
      </div>
      <h1 className="text-4xl my-4">There are no Notes to display currently display</h1>
      <Link className="btn" to={'compose'}>Add New Note</Link>
    </div>
  
  );
}

export default NoNotesCurrently