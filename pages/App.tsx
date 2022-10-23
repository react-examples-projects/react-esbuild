import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Container,
  Input,
  Dropdown,
  FormElement,
} from "@nextui-org/react";
import useImages from "hooks/useImages";
import ImageList from "components/ImageList";

interface User {
  id: string | number;
  fullName: string;
  password?: string | number;
  rank?: number;
  roles?: number[];
}

export default function App() {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<Selection>();

  const [user, setUser] = useState<User>();
  const { images, error } = useImages();

  const setAdminUser = () => {
    setUser({
      id: Date.now(),
      fullName: "Libardo Rengifooo",
      roles: [3004, 2001],
    });
  };

  const onChangeSearch = (e: ChangeEvent<FormElement>) => {
    setSearch(e.target.value);
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
      {user && (
        <code>
          <pre>{JSON.stringify(user, null, 3)}</pre>
        </code>
      )}
      <img />
      <div className="d-flex align-items-center gap-2 mt-4">
        <Input
          onChange={onChangeSearch}
          placeholder="Buscar imágenes"
          type="search"
          width="100%"
          bordered
        />

        <Dropdown>
          <Dropdown.Button size="lg" auto ghost>
            Categoría
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="categorias"
            //onSelectionChange={setCategory}
          >
            <Dropdown.Item key="husbando">husbando</Dropdown.Item>
            <Dropdown.Item key="kitsune">kitsune</Dropdown.Item>
            <Dropdown.Item key="neko">neko</Dropdown.Item>
            <Dropdown.Item key="waifu">waifu</Dropdown.Item>
            <Dropdown.Item key="baka">baka</Dropdown.Item>
            <Dropdown.Item key="blush">blush</Dropdown.Item>
            <Dropdown.Item key="bored">bored</Dropdown.Item>
            <Dropdown.Item key="cry">cry</Dropdown.Item>
            <Dropdown.Item key="cuddle">cuddle</Dropdown.Item>
            <Dropdown.Item key="hug">hug</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {images.length && <ImageList images={images} />}
    </Container>
  );
}
