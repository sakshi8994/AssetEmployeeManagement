import { Navigate } from "react-router-dom";
import { isAuthenticated , getRole} from "../utils/auth";

export default function RoleRoute({children,allowedRoles})
{
    if(!isAuthenticated()){
        return <Navigate to="/login" replace/>
    }

    if(!allowedRoles.includes(getRole())){
        return <Navigate to="/unauthorized" replace/>;
    }

    return children;
}