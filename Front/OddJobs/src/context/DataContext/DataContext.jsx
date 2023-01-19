import { createContext, useState, useEffect } from "react";
import { users, contracts as contractsData } from "../../data/data";
import { GiCloakDagger } from "react-icons/gi";

export const DataContext = createContext();

export function DataContextProvider(props) {
  const [contracts, setContracts] = useState(null);
  const [data, setData] = useState(users);
  const [actualUser, setActualUser] = useState(null);

  useEffect(() => {
    setData(users);
    setContracts(contractsData);
  }, []);

  const addUser = (newUser) => {
    setActualUser({
      ...newUser,
      photo: `https://robohash.org/${newUser.email}?set=set4`,
    });
    setData({ ...data, newUser });
  };

  const deleteUser = (user) => {
    setData(
      data.filter((element) => {
        return element.email != user.email;
      })
    );
  };

  const updateUser = (user, typeData, updatedData) => {
    setData(
      data.map((element) => {
        if (element.email != user.email) {
          return element;
        }
        switch (typeData) {
          case "name":
            element.name = updatedData;
            return elemet;
          case "lastname":
            element.lastname = updatedData;
            return elemet;
          case "email":
            element.email = updatedData;
            return elemet;
          case "password":
            element.password = updatedData;
            return elemet;
          case "address":
            element.address = updatedData;
            return element;
        }
      })
    );
  };

  function getUser(email) {
    let temp = data.find((element) => {
      return element.email == email;
    });
    setActualUser(temp != undefined ? { ...temp } : null);
    return temp;
  }

  function getWorkersByCategory(category) {
    let workers = [];
    data.forEach((element) => {
      Object.entries(element).forEach((entry) => {
        const [key, value] = entry;
        if (key == "category") {
          value.forEach((item) => {
            if (item[0] == category) {
              workers.push({ ...element });
            }
          });
        }
      });
    });
    return workers.length > 0 ? workers : null;
  }

  function addContract(contract) {
    setContracts([...contracts, contract]);
  }

  function deleteContract(contract) {
    setContracts(
      contracts.filter((element) => {
        return (
          element.emailEmployee == contract.emailEmployee &&
          element.emailClient == contract.emailClient
        );
      })
    );
  }

  function getContracts(email) {
    return contracts.filter((element) => {
      return element.emailEmployee == email || element.emailClient == email;
    });
  }

  return (
    <DataContext.Provider
      value={{
        addUser,
        deleteUser,
        updateUser,
        getUser,
        getWorkersByCategory,
        actualUser,
        addContract,
        deleteContract,
        getContracts,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
