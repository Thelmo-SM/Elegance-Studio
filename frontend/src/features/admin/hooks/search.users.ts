import { ChangeEvent, useState, useEffect } from "react"
import { userData } from "@/types/userTypes";
import { getUsers } from "../services/get.users";


export const useSearchUsers = () => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState<userData[]>([])
    
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {

        setSearch(e.target.value);
        console.log(search)
    };

    useEffect(() => {
        getUsers()
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error obteniendo usuarios:", error));
    }, []);
    
    return {
        search,
        users,
        handleOnChange
    }
}