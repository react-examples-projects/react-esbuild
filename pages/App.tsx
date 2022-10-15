import React, { useState } from "react";
import useImages from "hooks/useImages";
import { Button, Container } from "@nextui-org/react";
import ImageList from "components/ImageList";

interface User {
  id: string | number;
  fullName: string;
  password?: string | number;
  rank?: number;
  roles?: number[];
}

export default function App() {
  const [user, setUser] = useState<User>();
  const { images, error } = useImages();

  const setAdminUser = () => {
    setUser({
      id: Date.now(),
      fullName: "Libardo Rengifooo",
      roles: [3004, 2001],
    }); 
  };

  if (error) {
    return <h1>Ocurrió un error al solicitar las imagenes</h1>;
  }

  if (!images) {
    return <h1>Cargando...</h1>;
  }

  return (
    <Container className="container">
      <p className="mb-3">Presiona el boton de abajo para consultar la api</p>
      <Button onClick={setAdminUser}>Set admin user</Button>
      <code>
        <pre>{JSON.stringify(user, null, 3)}</pre>
      </code>

      {images.length && <ImageList images={images} />}
    </Container>
  );
}
