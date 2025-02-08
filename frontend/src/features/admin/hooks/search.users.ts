import { ChangeEvent, useState, useEffect } from "react"
import { userData } from "@/types/userTypes";
import { getUsers } from "../services/get.users";
import { updateRole } from "../services/update.role";


export const useSearchUsers = () => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState<userData[]>([])
    const [userDetail, setUserDetail] = useState<userData | null>(null);
    const [newRole, setNewRole] = useState('');
    const [tempRole, setTempRole] = useState(userDetail?.role || "cliente");
    
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {

        setSearch(e.target.value);
        console.log(search)
    };

    useEffect(() => {
        getUsers()
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error obteniendo usuarios:", error));
    }, []);

    const handleNewRole = async (newRole: string) => {
        if (!userDetail || !newRole) return;
      
        try {
          await updateRole(userDetail.uid, newRole);
          alert("Rol actualizado correctamente");
          setUserDetail({ ...userDetail, role: newRole });
          setNewRole(""); // Esto limpia el estado de nuevo rol si es necesario
        } catch (error) {
          console.error("Error al actualizar el rol:", error);
        }
      };
    
    return {
        search,
        users,
        userDetail,
        newRole,
        tempRole,
        handleOnChange,
        setUserDetail,
        handleNewRole,
        setTempRole
    }
}