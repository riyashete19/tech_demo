import {useEffect} from "react";
import {auth} from "../../firebase/firebaseConfig"
const AuthContext=React.createContext();
export function AuthProvider({children}){
const [currentUser, setCurrentUser] = useState(null);
const [userLoggedIn, setUserLoggedIn]=useState(false);
const [loading, setLoading]=useState(true);

useEffect(()=>{

},[]
 )
}