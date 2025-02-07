import SearchUsers from "@/features/admin/users/SearchUsers"

export const metadata = {
    title: 'Panel de administración',
    description: "Componente Para ver los usuarios.",
}

export default function Users() {
    return (
        <SearchUsers />
    )
}