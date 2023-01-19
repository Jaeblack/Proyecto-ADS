import { useContext } from "react";
import { DataContext } from "../../context/DataContext/DataContext";

export function Worker() {
    const {actualUser,updateUser} = useContext(DataContext);

    console.log(actualUser);

    return (
        <>
            <h1>Pagina de Trabajador: </h1>
            <h2>Datos trabajador: </h2>
            <p>{JSON.stringify(actualUser)}</p>
        </>
    );
}