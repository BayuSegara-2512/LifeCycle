import { createContext, useState, useEffect, useContext } from "react";

const JadwalContext = createContext();

export const JadwalGlobal = ({ children }) => {
  const [jadwal, setJadwal] = useState([]);

  useEffect(() => {
    const simpanJadwal = JSON.parse(localStorage.getItem("jadwal"));
    if (simpanJadwal) {
      setJadwal(simpanJadwal);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jadwal", JSON.stringify(jadwal));
  }, [jadwal]);

  const tambahJadwal = (tugas) => {
    if (!tugas || typeof tugas !== "string") return;
    setJadwal([...jadwal, { id: Date.now(), tugas: tugas.trim() }]);
  };

  const hapusJadwal = (id) => {
    setJadwal(jadwal.filter((jdwl) => jdwl.id !== id));
  };

  const editJadwal = (id, tugasBaru) => {
    setJadwal(jadwal.map((jdwl) => (jdwl.id === id ? { ...jdwl, tugas: tugasBaru } : jdwl)));
  };

  return (
    <JadwalContext.Provider value={{ jadwal, tambahJadwal, hapusJadwal, editJadwal }}>
      {children}
    </JadwalContext.Provider>
  );
};

export const useJadwal = () => useContext(JadwalContext);
