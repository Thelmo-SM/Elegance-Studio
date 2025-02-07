'use client';

import { useSearchUsers } from "../hooks/search.users";

export const SearchUsers = () => {
    const { search, users, handleOnChange } = useSearchUsers();


    const result = search
        ? users.filter((data) => data.email.toLowerCase().includes(search.toLowerCase()))
        : []; // 🔹 Se asigna correctamente el resultado de filter()

    return (
        <article>
            <div>
                <h3>Buscar usuarios</h3>
                <input
                    type="search"
                    value={search}
                    onChange={handleOnChange}
                    placeholder="Buscar usuarios"
                    className="bg-emerald-50"
                />
            </div>

            <div>
                {result.length > 0 ? (
                    result.map((user) => (
                        <div key={user.uid}>
                            <button>{user.name} - {user.email}</button>
                        </div>
                    ))
                ) : (
                    <p>{search ? "No se encontraron usuarios" : "Escribe para buscar usuarios"}</p>
                )}
            </div>
        </article>
    );
};

export default SearchUsers;
